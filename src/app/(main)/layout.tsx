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
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
