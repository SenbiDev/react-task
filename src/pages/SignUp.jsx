import React, { useState } from "react";
import { registerUser } from "../api/auntApi";

export default function SignUp() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(values);
      console.log("Registrasi sukses:", res);
      alert("Pendaftaran berhasil!");
    } catch (err) {
      console.error(err);
      alert("Gagal mendaftar!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 bg-black text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
            value={values.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 bg-black text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 bg-black text-white"
            required
          />
          <input
            type="password2"
            name="password2"
            placeholder="konfirmasi password"
            value={values.password2}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 bg-black text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
}
