// "use client";
// import { useTheme } from "next-themes";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import { Bell, LogOut, User } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";

// function Header() {
//   const [open, setOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [showText, setShowText] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

 
//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     setShowText(true);
//   };



//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   return (
//     <div className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">
//       {/* LEFT */}
//       <h1 className="text-sm font-semibold text-gray-800 dark:text-white tracking-wide">
//         Asset Management
//       </h1>

//       {/* RIGHT */}
//       <div className="flex items-center gap-3">
//         <div className="relative flex items-center gap-2">
//           <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-18 text-right">
//             {darkMode ? "Dark Mode" : "Light Mode"}
//           </span>
//           <button
//             onClick={toggleTheme}
//             className="w-16 h-9 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 flex items-center transition-all duration-300"
//           >
//             <div
//               className={`w-7 h-7 rounded-full bg-white dark:bg-gray-950 shadow-sm flex items-center justify-center transition-all duration-300 ${
//                 darkMode ? "translate-x-7" : "translate-x-0"
//               }`}
//             >
//               {darkMode ? (
//                 <DarkModeIcon sx={{ fontSize: 16 }} />
//               ) : (
//                 <LightModeIcon sx={{ fontSize: 16 }} />
//               )}
//             </div>
//           </button>
//         </div>

//         {/* Notification */}
//         <div className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
//           <Bell size={18} className="text-gray-600 dark:text-gray-300" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </div>

//         {/* PROFILE */}
//         <div className="relative" ref={dropdownRef}>
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="profile"
//             onClick={() => setOpen(!open)}
//             className="w-9 h-9 rounded-full ring-2 ring-gray-200 hover:ring-gray-300 cursor-pointer transition"
//           />

//           {open && (
//             <div className="absolute right-0 top-12 z-50 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
//               <button
//                 onClick={() => {
//                   router.push("/profile");
//                   setOpen(false);
//                 }}
//                 className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
//               >
//                 <User size={16} />
//                 Profile
//               </button>

//               <div className="border-t border-gray-200 dark:border-gray-700" />

//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;

"use client";

import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Bell, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

   const darkMode = theme === "dark";

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

  const toggleTheme = () => {
    setTheme(darkMode ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!mounted) {
    return (
      <div className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between" />
    );
  }

  return (
    <div className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">
      {/* LEFT */}
      <h1 className="text-sm font-semibold text-gray-800 dark:text-white tracking-wide">
        Asset Management
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* THEME TOGGLE */}
        <div className="relative flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-18 text-right">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>

          <button
            onClick={toggleTheme}
            className="w-16 h-9 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 flex items-center transition-all duration-300"
          >
            <div
              className={`w-7 h-7 rounded-full bg-white dark:bg-gray-950 shadow-sm flex items-center justify-center transition-all duration-300 ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            >
              {darkMode ? (
                <DarkModeIcon sx={{ fontSize: 16 }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 16 }} />
              )}
            </div>
          </button>
        </div>

        {/* NOTIFICATION */}
        <div className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
          <Bell size={18} className="text-gray-600 dark:text-gray-300" />
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
            <div className="absolute right-0 top-12 z-50 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  router.push("/profile");
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <User size={16} />
                Profile
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
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