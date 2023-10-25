// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARKK2i5xBPFf3E-CY6vAgn7suAyZopi6A",
  authDomain: "crud-jode.firebaseapp.com",
  projectId: "crud-jode",
  storageBucket: "crud-jode.appspot.com",
  messagingSenderId: "592185820610",
  appId: "1:592185820610:web:eb0a1abf1d4e0fec4d025b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;