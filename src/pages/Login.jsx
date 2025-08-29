import React, { useState } from 'react';
import { loginUser } from "../api/authApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUser(formData);
    console.log("Login success:", data);
    alert("Login berhasil!");
  } catch (err) {
    console.error("Login gagal:", err);
    alert("Email atau password salah");
  }
};


  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;