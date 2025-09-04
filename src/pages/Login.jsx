import { useEffect, useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import { getPublikArtikels, getMyArtikels } from "../api/artikel";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { getKategori, getTags } from "../api/admin";


export default function LoginPage({ onLogin, switchPage }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [role, setRole] = useState("");
    const [publicArtikel, setPublikArtikel] = useState([]);
    const [myArtikel, setMyArtikel] = useState([]);
    const [kategoriList, setKategoriList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const navigate = useNavigate();
    
    const loadData = async () => {
      try {
        const pub = await getPublikArtikels();
        setPublikArtikel(pub);
        const mine = await getMyArtikels();
        setMyArtikel(mine);
        const kat = await getKategori();
        setKategoriList(kat);
        const tg = await getTags();
        setTagList(tg);
      } catch (err) {
        console.error("Gagal load data:", err);
      }
    };
    
    useEffect(() => {
      const token = localStorage.getItem("access");
      const savedRole = localStorage.getItem("role");
      if (token) {
        setIsLogin(true);
        if (savedRole)
        setRole(savedRole);
        loadData();
      }
    }, []);

    async function handleSubmit(e) {
       e.preventDefault();
       try {
          const data = await login(username, password);
          alert("Login berhasil");
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.role);
            setRole(data.user.role || "user");
          }
          setIsLogin(true);
          loadData();
          navigate("/artikel");
        } catch {
          alert("Login gagal");
        }
    };
    
    const handleAddKategori = () => {};
    const handleAddTag = () => {};
    const handleDeleteKategori = () => {};
    const handleDeleteTag = () => {};
    const handleUpdateKategori = () => {};
    const handleUpdateTag = () => {};
    
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans">
            <div className="w-80 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                <h2 className="text-center text-xl font-semibold text-blue-400 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <PasswordInput
                            placeholder="password"
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
                      className="flex justify-center w-full py-2 text-blue-400 hover:text-blue-600 transition-colors"
                    >
                      Belum punya Akun ?
                    </Link>
                </form>
            </div>
        </div>
    );
}