import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { FirebaseService } from "../_services";

import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  private auth: firebase.auth.Auth;

  constructor(firebaseApp: FirebaseService, private reflector: Reflector) {
    this.auth = firebaseApp.getAuth();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (token != null && token != "") {
      try {
        const user = await this.auth.verifyIdToken(
          token.replace("Bearer ", ""),
          true
        );
        req["user"] = {
          email: user.email,
          roles: user.roles || [],
          type: user.type,
        };
      } catch {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
