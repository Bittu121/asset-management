"use client";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const verifySession = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.status === 401) {
        localStorage.removeItem("isLoggedIn");
        router.replace("/login");
        return false;
      }
      return res.ok;
    } catch {
      localStorage.removeItem("isLoggedIn");
      router.replace("/login");
      return false;
    }
  };

  useEffect(() => {
    // Verify on mount — catches expired tokens on page load / refresh
    verifySession().then((valid) => {
      if (valid) setLoading(false);
    });

    // Periodic check — catches token expiry during an active session
    const interval = setInterval(async () => {
      const valid = await verifySession();
      if (!valid) {
        toast401();
      }
    }, SESSION_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#EAEFF5]">
        <div className="w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside
        className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar onCollapseChange={setSidebarCollapsed} />
      </aside>

      <div
        className={`flex flex-col flex-1 min-h-screen layout-scroll min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <header className="sticky top-0 z-30">
          <Header />
        </header>

        <main className="flex-1 bg-[#EAEFF5] p-4 overflow-y-auto layout-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}

// Show a toast without importing react-toastify directly in the layout.
// Uses the existing toast container wired up in the root layout.
function toast401() {
  if (typeof window === "undefined") return;
  // Dynamically import so we don't bloat the layout bundle unnecessarily.
  import("react-toastify").then(({ toast }) => {
    toast.error("Your session has expired. Please log in again.");
  });
}
