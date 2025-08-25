// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHI1JV_gxUE0tqnaWF9bWJvCwTrhzdSMM",
  authDomain: "risk-calculator-9251e.firebaseapp.com",
  projectId: "risk-calculator-9251e",
  storageBucket: "risk-calculator-9251e.firebasestorage.app",
  messagingSenderId: "657154942565",
  appId: "1:657154942565:web:85b75fe6769db548a0c88c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
