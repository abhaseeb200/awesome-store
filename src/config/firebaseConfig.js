import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGHVw-g4QNyY83rHdEKQfggKu4wW-ZCiI",
  authDomain: "awesome-store-4fe81.firebaseapp.com",
  projectId: "awesome-store-4fe81",
  storageBucket: "awesome-store-4fe81.appspot.com",
  messagingSenderId: "322669101411",
  appId: "1:322669101411:web:381a3af0add62987745356",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider(); 