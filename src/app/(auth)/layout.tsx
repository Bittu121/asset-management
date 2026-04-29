"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");

  //   if (isLoggedIn) {
  //     // redirect based on role
  //     const role = localStorage.getItem("role");

  //     if (role === "admin" || role === "superadmin") {
  //       router.replace("/admin");
  //     } else if (role === "technician") {
  //       router.replace("/technician");
  //     } else {
  //       router.replace("/end-user");
  //     }
  //   } else {
  //     setLoading(false);
  //   }
  // }, [router]);

  // if (loading) return null;
  return <>{children}</>;
}
