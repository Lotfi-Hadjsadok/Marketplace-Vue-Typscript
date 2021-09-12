// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxnWA-Mmrr6_YL1-zCPO_-lexZ3loVU2Y",
    authDomain: "raysel-shop.firebaseapp.com",
    projectId: "raysel-shop",
    storageBucket: "raysel-shop.appspot.com",
    messagingSenderId: "427264157696",
    appId: "1:427264157696:web:7bde271188be9b55cc10e5",
    measurementId: "G-KWJF8FXJ8X"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()
export default app

