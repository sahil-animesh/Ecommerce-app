import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";

export const enviroment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBWPw24qIHesx0J3N8UBR1E6c0JYY2dnko",
        authDomain: "stunner-s.firebaseapp.com",
        databaseURL: "https://stunner-s-default-rtdb.firebaseio.com",
        projectId: "stunner-s",
        storageBucket: "stunner-s.appspot.com",
        messagingSenderId: "720179187123",
        appId: "1:720179187123:web:f364535954002da5514fc6"
    }
};
const app = initializeApp( enviroment.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
