import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Colle ici les clés que tu viens de copier
  apiKey: "VOTRE_API_KEY",
  authDomain: "moviestep-5d58a.firebaseapp.com",
  projectId: "moviestep-5d58a",
  storageBucket: "moviestep-5d58a.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);