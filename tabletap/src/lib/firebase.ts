// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3Mf3cIZ1nYr5NF0MrsZlQfnKOCTPmuVc",
  authDomain: "tabletap-63c5d.firebaseapp.com",
  projectId: "tabletap-63c5d",
  storageBucket: "tabletap-63c5d.firebasestorage.app",
  messagingSenderId: "111638931308",
  appId: "1:111638931308:web:40e29641d6852802c93549",
  measurementId: "G-ZZZ884YVCY"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };