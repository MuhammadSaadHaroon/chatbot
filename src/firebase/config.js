import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARejpqxkZ93sHesMHa0UtS22ZfrwMtHeQ",
  authDomain: "chatbot-app-40e20.firebaseapp.com",
  projectId: "chatbot-app-40e20",
  storageBucket: "chatbot-app-40e20.appspot.com",
  messagingSenderId: "328659930938",
  appId: "1:328659930938:web:2372ae540b69222e314a03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
