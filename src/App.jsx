import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const initAuth = useAuthStore((state) => state.init);

  useEffect(() => {
    // Jalankan hanya sekali
    let mounted = true;
    if (mounted) initAuth();
    return () => {
      mounted = false;
    };
  }, [initAuth]);

  return (
    <div
      className="flex flex-col min-h-screen transition-all duration-300"
      style={{
        backgroundColor: "var(--bg-color, #ffffff)",
        color: "var(--text-color, #000000)",
      }}
    >
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}