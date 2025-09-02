import { use, useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";

export default function LoginPage({ onLogin, switchPage }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await login(username, password);
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            
            console.log("Login berhasil");
            window.location.href="/artikel"
        }catch(err){
            console.error("Login Error", err);
            alert("Login gagal");
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans">
            <div className="w-80 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                <h2 className="text-center text-xl font-semibold text-blue-400 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-300 font-medium">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-300 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-gray-200 rounded hover:bg-blue-700 transition-colors mb-2"
                    >
                        Login
                    </button>
                    <Link
                        to="/register"
                        className="flex justify-center w-full py-2 text-black rounded hover:blue-400 transition-colors"
                    >
                        Registrasi
                    </Link>
                </form>
            </div>
        </div>
    );
}