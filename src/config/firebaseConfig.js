import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANE5MIRILze75dBxLDi9K1DHtrF4bnB_g",
  authDomain: "react-test-eee9b.firebaseapp.com",
  databaseURL: "https://react-test-eee9b.firebaseio.com",
  projectId: "react-test-eee9b",
  storageBucket: "react-test-eee9b.appspot.com",
  messagingSenderId: "907746698143",
  appId: "1:907746698143:web:d90c97faf563e5f11793aa",
  measurementId: "G-8Q33Z94XWX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
