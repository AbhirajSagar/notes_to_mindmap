import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = 
{
  apiKey: "AIzaSyDQgTuB8q43MK1ed8Rv1-9eQAympXn2d88",
  authDomain: "notestomindmap-862c1.firebaseapp.com",
  projectId: "notestomindmap-862c1",
  storageBucket: "notestomindmap-862c1.firebasestorage.app",
  messagingSenderId: "885996215722",
  appId: "1:885996215722:web:c9bf4047fd3242de0e1fd3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };