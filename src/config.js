// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg8UBQJfg8LwMNSi_a14mf1FbtVUAEZ74",
  authDomain: "task-manager-f129d.firebaseapp.com",
  projectId: "task-manager-f129d",
  storageBucket: "task-manager-f129d.appspot.com",
  messagingSenderId: "413153353626",
  appId: "1:413153353626:web:2504c3f43d238d0e896423",
  measurementId: "G-L91C78NX17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
