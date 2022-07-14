// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { firebaseConfig } from '../../../../libs/cmi/src/lib/config/firebase';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


