// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHsuufFbdVlXy0h5fQRFiKJ5GceyDHRrI",
  authDomain: "skpro-4d23c.firebaseapp.com",
  projectId: "skpro-4d23c",
  storageBucket: "skpro-4d23c.appspot.com",
  messagingSenderId: "108108417434",
  appId: "1:108108417434:web:a534824ec016279ade5223",
  measurementId: "G-JDS7VK6NL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);