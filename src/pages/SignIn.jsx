import { useState } from "react";
import { loginUser } from "../api/auntApi";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({username, password});
      alert("login berhasil");

      // simpan token
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);

      // simpan data user & role
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("role", res.user.role);
      }

      setError("");
      if (res.user.role === "admin") {
        navigate("/artikel/");
      } else {
        navigate("/artikel/");
      }
      } catch (err) {
      console.error("Login gagal:", err);
      setError("Username atau password salah");
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Belum punya akun?{" "}
          <a href="/signup/" className="text-blue-600 hover:underline">
            Register di sini
          </a>
        </p>
      </div>
    </div>
  );
}
