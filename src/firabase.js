// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXY36xC0cYYCVSonjy3pLBCFsp_WfqPe8",
  authDomain: "netflix-clone-8a020.firebaseapp.com",
  projectId: "netflix-clone-8a020",
  storageBucket: "netflix-clone-8a020.appspot.com",
  messagingSenderId: "857215184315",
  appId: "1:857215184315:web:9be4d8abfa5e47ab59a89e",
  measurementId: "G-ZRNV92D4GY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//User signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

//User login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

//User logout function

const logout = async () => {
  signOut(auth);
};

export { auth, db, analytics, login, signup, logout };
