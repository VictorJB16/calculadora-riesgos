// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDHI1JV_gxUE0tqnaWF9bWJvCwTrhzdSMM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "risk-calculator-9251e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "risk-calculator-9251e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "risk-calculator-9251e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "657154942565",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:657154942565:web:85b75fe6769db548a0c88c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
