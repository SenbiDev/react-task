import { useState } from "react";
import { useAuth } from "../auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage({ onLogin, switchPage }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    
    // useEffect(() => {
    //   const token = localStorage.getItem("access");
    //   const savedRole = localStorage.getItem("role");
    //   if (token) {
    //     setIsLogin(true);
    //     if (savedRole)
    //     setRole(savedRole);
    //     loadData();
    //   }
    // }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
        setError("");

        const success = await login(username, password);

        if (success) {
          navigate('/artikel');
        } else {
          setError('Username atau password salah. Silahkan coba lagi');
        }
      //   try {
      //     const data = await login(username, password);
      //     alert("Login berhasil");

      //     if(data.access && data.refresh) {
      //       localStorage.setItem("access", data.access)
      //       localStorage.setItem("refresh", data.refresh)
      //     }

      //     if (data.user) {
      //       localStorage.setItem("user", JSON.stringify(data.user));
      //       localStorage.setItem("role", data.user.role);
      //       setRole(data.user.role || "user");
      //     }

      //     console.log("Access Token", data.access)
      //     console.log("Refresh Token", data.refresh)
      //     console.log("User", data.user)
          
      //     if (onLogin) onLogin();

      //     setIsLogin(true);
      //     navigate("/artikel");
      //   } catch  (err) {
      //     alert("Login gagal");
      //     console.error("Error saat login", err)
      //   }
    };

    return (
        <div className="flex justify-center items-center min-h-screen font-sans">
            <div className="w-80 p-6 border rounded-lg shadow-md">
                <h2 className="text-center text-xl font-semibold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <PasswordInput
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded hover:bg-blue-700 transition-colors mb-2"
                    >
                        Login
                    </button>
                    <Link
                      to="/register"
                      className="flex justify-center w-full py-2 hover:text-blue-600 transition-colors"
                    >
                      Belum punya Akun ?
                    </Link>
                </form>
            </div>
        </div>
    );
}