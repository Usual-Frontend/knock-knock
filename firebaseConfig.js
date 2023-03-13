// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU98VHBDbAG9meQGFEP-GNyJCQ6KMIlSs",
  authDomain: "knock-knock-7e275.firebaseapp.com",
  projectId: "knock-knock-7e275",
  storageBucket: "knock-knock-7e275.appspot.com",
  messagingSenderId: "1013290181264",
  appId: "1:1013290181264:web:0a56a54d9182af5211ee15",
  measurementId: "G-Q3CGN4K079",
  databaseURL: "https://knock-knock-7e275-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getDatabase(app);

export {
  auth,
  database
}