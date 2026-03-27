"use client";

import { Search, Bell, MessageCircle } from "lucide-react";

function Header() {
  return (
    <>
      <div className="w-full h-16 bg-white/70 backdrop-blur-md border-b border-gray-200/50 px-6 flex items-center justify-between shadow-sm">
        {/* Search */}
        <div className="flex items-center text-md">
          <p>Asset Management</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-9 h-9 rounded-full ring-2 ring-gray-200 hover:ring-gray-300 transition"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
