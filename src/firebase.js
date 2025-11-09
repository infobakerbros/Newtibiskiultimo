import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPSwt8bCEdHT8929k4lIEuDnlbTVVlicA",
  authDomain: "tibiski-orders.firebaseapp.com",
  projectId: "tibiski-orders",
  storageBucket: "tibiski-orders.firebasestorage.app",
  messagingSenderId: "391295262611",
  appId: "1:391295262611:web:8d2a527953c757c0b8d266"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
