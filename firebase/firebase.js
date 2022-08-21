import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDK8NOVukOvDqsto-Pi-aFelnapHMSnuJM",
    authDomain: "shocode-a9958.firebaseapp.com",
    projectId: "shocode-a9958",
    storageBucket: "shocode-a9958.appspot.com",
    messagingSenderId: "636017056330",
    appId: "1:636017056330:web:ff08112c428a887d4a64b3",
    measurementId: "G-2LSY46HLR8"
  };



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();


