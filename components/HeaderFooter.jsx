'use client';
import { FiFileText } from "react-icons/fi";

export function Header() 
{
  return (
    <>
      <header className="bg-gray-900 text-white p-2 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
          <div className='flex items-center'>
            <FiFileText className="text-3xl text-white mr-2" />
            <h1 className="text-2xl font-bold">Notes To Mindmap</h1>
          </div>
        </div>
      </header>
    </>
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
