// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmKQjWFzBxW9Ubm3zA0iVNYlrgBXncJ5A",
  authDomain: "react-auth-tutorial-f15cf.firebaseapp.com",
  projectId: "react-auth-tutorial-f15cf",
  storageBucket: "react-auth-tutorial-f15cf.appspot.com",
  messagingSenderId: "259332916250",
  appId: "1:259332916250:web:8691a31f043bc3f4757da3",
  databaseURL: "https://react-auth-tutorial-f15cf-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app)
  export const db = getFirestore(app);
  const database = getDatabase(app);
