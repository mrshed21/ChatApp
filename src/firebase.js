import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABEslYEW92WedTYPU7zX6hGvLXVpH5Whs",
  authDomain: "chatapp-ff0a5.firebaseapp.com",
  projectId: "chatapp-ff0a5",
  storageBucket: "chatapp-ff0a5.firebasestorage.app",
  messagingSenderId: "287824635411",
  appId: "1:287824635411:web:5b429e2536294fd60d81e6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore(app);

export {auth,firestore};


