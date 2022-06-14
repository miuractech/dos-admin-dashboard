// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVvT190YHjnYh5LRobXI4cQf8F3_vuGOc",
  authDomain: "dropoutstore-8979d.firebaseapp.com",
  databaseURL: "https://dropoutstore-8979d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dropoutstore-8979d",
  storageBucket: "dropoutstore-8979d.appspot.com",
  messagingSenderId: "300563119027",
  appId: "1:300563119027:web:6cfb788cff98f9804669c6",
  measurementId: "G-QE0T4B09JN"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)
export  const analytics = getAnalytics(app)