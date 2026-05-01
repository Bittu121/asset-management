"use client";

import { Bell, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/auth/store";
import { logoutAction } from "../../../store/auth/authActions";

function Header() {
  // const { user } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleLogout = async () => {
    await dispatch(logoutAction(router));
  };

  if (!mounted) {
    return (
      <div className="w-full h-16 bg-gray border-b border-gray-200 px-6 flex items-center justify-between" />
    );
  }

  return (
    <div className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* LEFT */}
      <h1 className="text-sm font-semibold text-gray-800 dark:text-white tracking-wide">
        Asset Management
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* NOTIFICATION */}
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
            className="w-9 h-9 rounded-full ring-2 ring-gray-200 hover:ring-gray-300 cursor-pointer transition"
          />

          {open && (
            <div className="absolute right-0 top-12 z-50 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  router.push("/profile");
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700  hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <User size={16} />
                Profile
              </button>

              <div className="border-t border-gray-200 " />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50  transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
