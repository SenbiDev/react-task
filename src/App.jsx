import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const initAuth = useAuthStore((state) => state.init);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="flex flex-col min-h-screen transition-all duration-300"
    style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}