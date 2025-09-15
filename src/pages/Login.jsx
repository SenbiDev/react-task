import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loggedInUser = await login(username, password);
      if (loggedInUser) {
        resetForm();
        navigate("/app/artikel-api");
      }
    } catch (err) {
      setError(err.message || "Login gagal");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== password2) {
      setError("Password tidak sama");
      return;
    }
    try {
      const newUser = await register(username, email, password, password2);
      if (newUser) {
        resetForm();
        alert("Registrasi berhasil, silakan login");
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.message || "Register gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700 p-8">
          <AuthForm
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            password2={password2}
            setPassword2={setPassword2}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}