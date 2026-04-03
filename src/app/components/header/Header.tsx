"use client";

import { Bell, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-full h-16 bg-white/70 backdrop-blur-md border-b border-gray-200/50 px-6 flex items-center justify-between shadow-sm">
      {/* LEFT */}
      <div className="text-md font-medium text-gray-800">Asset Management</div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="relative p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full ring-2 ring-gray-200 hover:ring-gray-300 transition"
          />

          {/* TOOLTIP DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-12 z-50">
              {/* Arrow */}
              <div className="absolute right-4 -top-1.5 w-2.5 h-2.5 bg-white rotate-45 border-t border-l border-gray-200"></div>

              {/* Dropdown */}
              <div className="w-44 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 cursor-pointer">
                <button
                  onClick={() => {
                    router.push("/profile");
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  <User size={16} />
                  Profile
                </button>

                <div className="h-px bg-gray-200" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
