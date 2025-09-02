import { useState } from "react";
import { register } from "../api/auth";

export default function RegisterPage({ switchPage }) {
    const [form, setForm] = useState({ username: "", email: "", password: "", password2: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        register(form)
        .then((data) => {
            console.log("Resgistrasi respone", data)
            alert("Registrasi berhasil")
            switchPage("login");
        })
        .catch((err) => {
            console.error("Gagal", err)

            let message = "registrasi gagal";

            if(err && typeof err === "object"){
                message = Object.entries(err)
                    .map(([field, msgs]) => {
                        if (Array.isArray(msgs)) {
                        return `${field}: ${msgs.join(",")}`;
                    }
                    return `${field}: ${msgs.join}`;
            })
             .join("\n");
        }
        alert(message);
    });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-80 p-6 bg-white border border-gray-300 rounded shadow-sm">
                <h2 className="text-center mb-6 text-gray-800 text-xl font-medium">Registrasi</h2>
                <form onSubmit={handleSubmit}>
                    {["username", "email", "password", "password2"].map((field, idx) => (
                        <div key={idx} className="mb-4">
                            <label className="block mb-1 text-gray-700 capitalize">
                                {field === "password2" ? "Confirm Password" : field}
                            </label>
                            <input
                                type={field.includes("password") ? "password" : field}
                                placeholder={field === "password" ? "Confirm Password" : field
                                    .charAt(0).toUpperCase() + field.slice(1)}
                                value={form[field]}
                                onChange={e => setForm({ ...form, [field]: e.target.value})}
                                required
                                className="text-black w-full px-2 py-1 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Registrasi
                    </button>
                </form>
                <div className="text-center mt-3">
                    <button
                        onClick={() => switchPage("login")}
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
}