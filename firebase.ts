import { initializeApp } from "firebase/app";
import * as db from "firebase/firestore";
import * as auth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDD5LZ36Ara-cRzjzg76k4OBOy9IqkJcTY",
  authDomain: "recall-9c5f6.firebaseapp.com",
  projectId: "recall-9c5f6",
  storageBucket: "recall-9c5f6.appspot.com",
  messagingSenderId: "925911432560",
  appId: "1:925911432560:web:7173de25c006e89042e3b5",
  measurementId: "G-2X58Y7RPDG",
};

initializeApp(firebaseConfig);

export { db, auth };
