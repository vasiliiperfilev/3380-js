import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as firebase from "firebase-admin";

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;

  constructor(private configService: ConfigService) {
    const firebaseConfig = {
      clientEmail: this.configService.get<string>("FB_CLIENT_EMAIL"),
      projectId: this.configService.get<string>("FB_PROJECT_ID"),
      privateKey: this.configService.get<string>("FB_PRIVATE_KEY"),
      databaseUrl: this.configService.get<string>("FB_DATABASE_URL"),
    };
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({ ...firebaseConfig }),
      databaseURL: firebaseConfig.databaseUrl,
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };
}
