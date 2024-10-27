import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe-8RUEJqjAepwsPqedGUyyn4dZ0tBBvA",
  authDomain: "versess-app-e8756.firebaseapp.com",
  projectId: "versess-app-e8756",
  storageBucket: "versess-app-e8756.appspot.com",
  messagingSenderId: "326234916796",
  appId: "1:326234916796:web:d8612d6d56599196a30db9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
const auth = getAuth();

export { auth };
