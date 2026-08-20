import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTTA23NmjlRBt7qFo7ot9tFABE8mpVEOg",
  authDomain: "smeargle-says.firebaseapp.com",
  projectId: "smeargle-says",
  storageBucket: "smeargle-says.firebasestorage.app",
  messagingSenderId: "362244468132",
  appId: "1:362244468132:web:0644c259a2461a30d36531",
  measurementId: "G-NZ05WCM6L8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
};
