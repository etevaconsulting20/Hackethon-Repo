import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDFM9PSOSbcwdiwEAJN93Rh4-QceFTTjnc",
  authDomain: "hackethon-repo.firebaseapp.com",
  projectId: "hackethon-repo",
  storageBucket: "hackethon-repo.appspot.com",
  messagingSenderId: "1004643639267",
  appId: "1:1004643639267:web:358cac3c53ac85184d8ad6",
  measurementId: "G-HEY5F5P8H8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
