"use client";

import { Search, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TopNav() {
  return (
    <header className="w-full flex justify-between items-start z-10 sticky top-0 pt-2">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-[400px]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search or type a command"
          className="w-full pl-11 pr-12 py-3.5 bg-white border border-transparent rounded-full text-sm font-medium focus:outline-none placeholder:text-gray-400"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">⌘F</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500 hover:text-gray-800 transition-colors">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* User Avatar */}
        <Link href="/profile" className="w-12 h-12 rounded-full bg-blue-50 overflow-hidden shadow-sm border border-transparent hover:border-gray-200 transition-colors">
          <Image
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User avatar"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

    </header>
  );
}