// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//import for firestore
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFPATgh3dqkLh5H1qmCHOGezBDPc_KXug",
  authDomain: "reactblog-6c49f.firebaseapp.com",
  projectId: "reactblog-6c49f",
  storageBucket: "reactblog-6c49f.appspot.com",
  messagingSenderId: "557576772825",
  appId: "1:557576772825:web:a40add573feeecc1a8b2c8",
  measurementId: "G-19J8H1QBY8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
