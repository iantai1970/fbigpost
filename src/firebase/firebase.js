// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALPBwibrKl5its0icJJXw7qNIOwWOQ6bg",
  authDomain: "fbigpost.firebaseapp.com",
  projectId: "fbigpost",
  storageBucket: "fbigpost.firebasestorage.app",
  messagingSenderId: "877223587807",
  appId: "1:877223587807:web:c867e9f0ef7f9b99375e6a",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const fireBaseAuth = getAuth(fireBaseApp);

export { fireBaseApp, fireBaseAuth };
