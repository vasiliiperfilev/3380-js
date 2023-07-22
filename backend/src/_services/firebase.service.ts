import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as firebase from "firebase-admin";
import * as firebaseConfig from "../../firebase.config.json";

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;

  constructor(private configService: ConfigService) {
    const firebaseParams = {
      type: firebaseConfig.type,
      projectId: firebaseConfig.project_id,
      privateKeyId: firebaseConfig.private_key_id,
      privateKey: firebaseConfig.private_key,
      clientEmail: firebaseConfig.client_email,
      clientId: firebaseConfig.client_id,
      authUri: firebaseConfig.auth_uri,
      tokenUri: firebaseConfig.token_uri,
      authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
      clientC509CertUrl: firebaseConfig.client_x509_cert_url,
    };
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseParams),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };
}
