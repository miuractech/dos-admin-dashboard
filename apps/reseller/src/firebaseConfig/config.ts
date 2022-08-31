// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const firebaseConfig = {
    apiKey: "AIzaSyDVvT190YHjnYh5LRobXI4cQf8F3_vuGOc",
    authDomain: "dropoutstore-8979d.firebaseapp.com",
    databaseURL: "https://dropoutstore-8979d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dropoutstore-8979d",
    storageBucket: "dropoutstore-8979d.appspot.com",
    messagingSenderId: "300563119027",
    appId: "1:300563119027:web:f3b9cf2fd496cebd4669c6",
    measurementId: "G-D8KJCKFCGH"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)


