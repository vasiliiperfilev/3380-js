// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtMf__saH-HMX1tJ8XTx7NENvf04FQ4z0",
  authDomain: "auth-de923.firebaseapp.com",
  projectId: "auth-de923",
  storageBucket: "auth-de923.appspot.com",
  messagingSenderId: "579921999830",
  appId: "1:579921999830:web:310a60c8171c1688ed9677",
  measurementId: "G-TC87YRJ7GG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
