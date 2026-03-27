"use client";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "admin");
    router.push("/admin");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-5 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
