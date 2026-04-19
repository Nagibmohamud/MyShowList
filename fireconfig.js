// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWM4_QtUKfAUgcH4hijRyVJhS7srhmajQ",
    authDomain: "myshowlist-9917a.firebaseapp.com",
    databaseURL: "https://myshowlist-9917a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myshowlist-9917a",
    storageBucket: "myshowlist-9917a.firebasestorage.app",
    messagingSenderId: "1020730788541",
    appId: "1:1020730788541:web:934d8bfbb711a5e6cf05d4",
    measurementId: "G-PBYV2MHZF5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);