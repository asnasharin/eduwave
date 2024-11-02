// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC_r08lYr5YGeupRQZFx9vVzGjb3heivU",
  authDomain: "e-learn-d76d8.firebaseapp.com",
  projectId: "e-learn-d76d8",
  storageBucket: "e-learn-d76d8.firebasestorage.app",
  messagingSenderId: "763744728848",
  appId: "1:763744728848:web:22227c3fe72bf10a1b1795",
  measurementId: "G-SY9WSN4QSL"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebase)
export const storage = getStorage(firebase)
