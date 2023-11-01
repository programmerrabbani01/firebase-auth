import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

// import dotenv from "dotenv";

// dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyCMmrYXud2QvDW8XOiCovRj8o8_wdg3udc",
  authDomain: "mern-stack-apps-69cd4.firebaseapp.com",
  projectId: "mern-stack-apps-69cd4",
  storageBucket: "mern-stack-apps-69cd4.appspot.com",
  messagingSenderId: "858456487607",
  appId: "1:858456487607:web:a4fa3876e40d556e2f3f32",

  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);

// initialize storage
export const storage = getStorage(fireBaseApp);

// initialize firebase authentication
export const auth = getAuth(fireBaseApp);

// initialize google authentication provider
export const googleAuthProvider = new GoogleAuthProvider();

// initialize facebook authentication provider
export const facebookAuthProvider = new FacebookAuthProvider();
