// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVvT190YHjnYh5LRobXI4cQf8F3_vuGOc",
  authDomain: "dropoutstore-8979d.firebaseapp.com",
  databaseURL: "https://dropoutstore-8979d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dropoutstore-8979d",
  storageBucket: "dropoutstore-8979d.appspot.com",
  messagingSenderId: "300563119027",
  appId: "1:300563119027:web:fefd76170953e8b14669c6",
  measurementId: "G-RXD44LFG2Z"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);