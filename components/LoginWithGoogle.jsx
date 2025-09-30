"use client";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginWithGoogle()
{
  const handleLogin = async () =>
  {
    try
    {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in user:", user);
      // You can save user info to Firestore here if needed
    }
    catch (error)
    {
      console.error("Login error:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-gray-800 w-full p-2 mt-4 rounded text-white font-semibold cursor-pointer flex items-center justify-center"
    >
      <img
        src={"/google.svg"}
        alt="Google Logo"
        className="inline-block w-5 h-5 mr-2 -mt-1"
      />
      Login with Google
    </button>
  );
}
