// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAog0993GDdYBjun0GGXZdXo0yUdI33T2o",
    authDomain: "grocery-store-6c8e4.firebaseapp.com",
    projectId: "grocery-store-6c8e4",
    storageBucket: "grocery-store-6c8e4.appspot.com",
    messagingSenderId: "569972025200",
    appId: "1:569972025200:web:8ee85a7aa1ea1e84d3d1b5",
    measurementId: "G-8C9N9VPRRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
const ref = db.collection('Item');