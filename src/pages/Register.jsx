import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/authContext"; 
import PasswordInput from "../components/PasswordInput";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    try {
      await register(username, email, password, password2);
      alert("Register berhasil, silakan login");
      navigate("/login"); // pindah ke login
    } catch (err) {
      alert("Register gagal: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-80 p-6border border-gray-300 rounded shadow-sm">
        <h2 className="text-center mb-6 text-xl font-medium">
          Registrasi
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <PasswordInput
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded hover:bg-blue-700 transition-colors mb-2"
          >
            Registrasi
          </button>
        </form>
        <div className="text-center mt-3">
          <Link
            to="/login"
            className="flex justify-center w-full py-2 text-blue-400 hover:text-blue-600 transition-colors"
          >
            Sudah punya akun ?
          </Link>
        </div>
      </div>
    </div>
  );
}