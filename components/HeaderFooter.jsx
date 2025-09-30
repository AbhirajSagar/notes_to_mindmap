"use client";
import { useState, useEffect } from "react";
import { FiFileText, FiLogOut, FiUser } from "react-icons/fi";
import Modal from "./Modal";
import { FiX } from "react-icons/fi";
import { FiMap } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import LoginWithGoogle from "./LoginWithGoogle";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export function Header() 
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser({ displayName: u.displayName || "User" });
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => 
  {
    await signOut(auth);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="bg-gray-900 text-white p-2 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
          <div className='flex items-center'>
            <FiFileText className="text-3xl text-white mr-2" />
            <h1 className="text-2xl font-bold">Notes To Mindmap</h1>
          </div>
          <div className='items-center hidden md:flex bg-gray-800 py-2 px-3 rounded-xl shadow-2xl drop-shadow-gray-800 cursor-pointer hover:bg-gray-700 transition-colors duration-300' onClick={() => setIsModalOpen(true)}>
            <FiUser className="text-3xl text-white mr-2" />
            <div className="text-lg font-medium">
              {user ? user.displayName : "Login"}
            </div>
          </div>
        </div>
      </header>
      {user ? <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onLogout={handleLogout} /> : <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

function UserModal({ isOpen, onClose, user, onLogout })
{
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-bold text-white h-full">Hey, {user?.displayName || 'User'}!</h2>
        <button className="h-full bg-gray-800 p-2 rounded text-white flex justify-center items-center gap-1 cursor-pointer hover:bg-gray-700 transition-colors duration-300" onClick={onClose}>
          <FiX className="text-2xl" />
        </button>
      </div>
      <div className="mt-4">
        <div className="bg-gray-800 w-full p-2 mt-1 rounded text-white font-semibold cursor-pointer flex items-center justify-start hover:bg-gray-950 transition-colors duration-300" onClick={onLogout}>
          <FiMap className="text-lg mr-2"/>
          <p>My Maps</p>
        </div>
        <div className="bg-gray-800 w-full p-2 mt-1 rounded text-white font-semibold cursor-pointer flex items-center justify-start hover:bg-gray-950 transition-colors duration-300" onClick={onLogout}>
          <FiDollarSign className="text-lg mr-2"/>
          <p>Credits</p>
        </div>
        <div className="bg-red-800 w-full p-2 mt-1 rounded text-white font-semibold cursor-pointer flex items-center justify-start hover:bg-red-950 transition-colors duration-300" onClick={onLogout}>
          <FiLogOut className="text-lg mr-2"/>
          <p>Logout</p>
        </div>
      </div>
    </Modal>
    );
}

function LoginModal({ isOpen, onClose }) 
{
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-bold text-white h-full">LOGIN</h2>
        <button className="h-full bg-gray-800 p-2 rounded text-white flex justify-center items-center gap-1 cursor-pointer hover:bg-gray-700 transition-colors duration-300" onClick={onClose}>
          <FiX className="text-2xl" />
        </button>
      </div>
      <LoginWithGoogle />
    </Modal>
  );
}

export function Footer() 
{
  return (
    <footer className="bg-gray-900 text-white p-6 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Notes To Mindmap. All rights reserved.
        </p>
        <nav className="mt-4 sm:mt-0 flex gap-6 text-sm sm:text-base font-medium">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
