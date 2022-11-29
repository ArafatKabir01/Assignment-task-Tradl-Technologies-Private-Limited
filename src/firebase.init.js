// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClfE_UxDJOdFTK88IXMP3fat_K2mR_z8o",
    authDomain: "registration-badhaan.firebaseapp.com",
    projectId: "registration-badhaan",
    storageBucket: "registration-badhaan.appspot.com",
    messagingSenderId: "696469793127",
    appId: "1:696469793127:web:8bdb366776e4cf433267c2",
    measurementId: "G-8BLRN73ZB3"
  };
  

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth