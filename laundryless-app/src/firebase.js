// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu7651HDvg1x-GaKcAtLtw40b5U1xJyiA",
  authDomain: "laundrylessatx.firebaseapp.com",
  projectId: "laundrylessatx",
  storageBucket: "laundrylessatx.firebasestorage.app",
  messagingSenderId: "912030323920",
  appId: "1:912030323920:web:6329d6eb6d4f721b49fad5",
  measurementId: "G-9GPKJSDCX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();