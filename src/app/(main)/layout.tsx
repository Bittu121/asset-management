"use client";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (pathname === "/login") {
      setLoading(false);
      return;
    }

    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) return null;

  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        <Sidebar onCollapseChange={setSidebarCollapsed} />
      </aside>

      {/* Content area — offset to match sidebar width */}
      <div
        className={`flex flex-col flex-1 min-h-screen layout-scroll min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 z-30">
          <Header />
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto layout-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}




// /components/
//  ├── Table.tsx
//  ├── Modal.tsx
//  ├── Dropdown.tsx
//  ├── Pagination.tsx
//  ├── StatusBadge.tsx
//  ├── EmptyState.tsx
//  ├── Loader.tsx