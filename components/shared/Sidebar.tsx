"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, User, LogOut } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Manage Classes", href: "/manage", icon: Users },
  { name: "User Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-white rounded-xl flex flex-col py-8 px-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">R</span>
        </div>
        <span className="font-bold text-xl tracking-tight">Raft</span>
      </div>

      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
        Main
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all font-medium ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all font-medium text-gray-500 hover:bg-red-50 hover:text-red-600">
          <LogOut size={20} />
          Log out
        </button>
      </div>
    </div>
  );
}
