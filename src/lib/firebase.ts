import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMlKjBgtv_cMZbNRImELk8cjpIc1aKPMw",
  authDomain: "fastpage2-db56b.firebaseapp.com",
  projectId: "fastpage2-db56b",
  storageBucket: "fastpage2-db56b.firebasestorage.app",
  messagingSenderId: "966925222629",
  appId: "1:966925222629:web:07d4af0296310e9b270a0c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };