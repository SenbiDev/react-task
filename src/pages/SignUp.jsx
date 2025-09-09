import { useState } from "react";
import { registerUser } from "../api/auntApi";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }
    try {
      await registerUser({username, email, password, password2});
      setSuccess("Registrasi berhasil! Silakan login.");
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
      setPassword2("");
    } catch (err) {
      console.error("Register gagal:", err);
      setError("Registrasi gagal. Periksa data Anda.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        {success && <p className="text-green-600 mb-3">{success}</p>}
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
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div>
            <label className="block mb-1 font-medium">Konfirmasi Password</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Sudah punya akun?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
}
