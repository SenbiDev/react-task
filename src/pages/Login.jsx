import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuthStore } from "../store/useAuthStore";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const { login, register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  // 🧠 Handler untuk ubah value form
  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  // 🔄 Reset form agar tidak ada sisa input
  const resetForm = useCallback(() => {
    setForm({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
    setError("");
  }, []);

  // 🔐 Proses Login
  const handleLogin = useCallback(async () => {
    setError("");
    if (!form.username || !form.password) {
      setError("Username dan password wajib diisi");
      return;
    }

    try {
      const loggedInUser = await login(form.username, form.password);

      if (loggedInUser) {
        message.success(`Selamat datang, ${loggedInUser.username}! 🎉`);
        resetForm();
        navigate("/artikel-api");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.message || "Login gagal. Periksa kembali data Anda.");
      message.error("Login gagal. Coba lagi.");
    }
  }, [form, login, navigate, resetForm]);

  // 🧾 Proses Registrasi
  const handleRegister = useCallback(async () => {
    setError("");

    if (!form.username || !form.email || !form.password || !form.password2) {
      setError("Semua field wajib diisi");
      return;
    }

    if (form.password !== form.password2) {
      setError("Konfirmasi password tidak sama");
      return;
    }

    try {
      const newUser = await register(
        form.username,
        form.email,
        form.password,
        form.password2
      );

      if (newUser) {
        message.success("Registrasi berhasil! Silakan login.");
        resetForm();
        setIsRegister(false);
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(err?.message || "Registrasi gagal. Coba lagi.");
      message.error("Registrasi gagal. Silakan coba lagi.");
    }
  }, [form, register, resetForm]);

  return (
    <AuthForm
      isRegister={isRegister}
      setIsRegister={setIsRegister}
      username={form.username}
      setUsername={(val) => handleChange("username", val)}
      email={form.email}
      setEmail={(val) => handleChange("email", val)}
      password={form.password}
      setPassword={(val) => handleChange("password", val)}
      password2={form.password2}
      setPassword2={(val) => handleChange("password2", val)}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      error={error}
      isLoading={isLoading}
    />
  );
}