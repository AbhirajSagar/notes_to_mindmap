import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = 
{
  apiKey: "AIzaSyCZQwhRMHqnPOoy2qsiTb39xdCshfuCZlY",
  authDomain: "notestomindmap.firebaseapp.com",
  projectId: "notestomindmap",
  storageBucket: "notestomindmap.firebasestorage.app",
  messagingSenderId: "67704818427",
  appId: "1:67704818427:web:bb1887526fb22bfc16be5e",
  measurementId: "G-0FN7LPT1FB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };