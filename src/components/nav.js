"use client";

import { FaHome, FaHistory, FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-16 h-screen flex flex-col items-center py-4 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] shadow-md border-r border-gray-700 z-50">

      <div className="flex flex-col items-center space-y-6">
        <Link href="./" className="relative group">
          <FaHome className="text-white text-3xl transition-transform transform group-hover:scale-125" />
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 text-white text-xs bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">Home</span>
        </Link>
        <Link href="/History" className="relative group">
          <FaHistory className="text-white text-3xl transition-transform transform group-hover:scale-125" />
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 text-white text-xs bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">History</span>
        </Link>
        <Link href="/LedControl" className="relative group">
          <FaTachometerAlt className="text-white text-3xl transition-transform transform group-hover:scale-125" />
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 text-white text-xs bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">LedControl</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
