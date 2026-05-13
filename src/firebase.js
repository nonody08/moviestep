import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBWHK_JroPO-d_LsnmI86L84fbaxI7xhk",
  authDomain: "moviestep-5d58a.firebaseapp.com",
  projectId: "moviestep-5d58a",
  storageBucket: "moviestep-5d58a.firebasestorage.app",
  messagingSenderId: "759870471975",
  appId: "1:759870471975:web:09ce795d1f9a8f2f357302"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();