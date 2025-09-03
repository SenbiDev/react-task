import React, { useState } from "react";
import { loginUser } from "../api/auntApi";

export default function SignIn() {
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(values);
      console.log("Login sukses:", res);
      alert("Berhasil masuk!");
      localStorage.setItem("access",res.access);
      localStorage.setItem("refresh",res.access);
    } catch (err) {
      console.error("login error:",err.message);
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-black shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Kata Sandi"
            value={values.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-black hover:bg-white text-white rounded-lg py-2"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
