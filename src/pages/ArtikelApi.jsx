import { useState, useEffect } from "react";
import {
  login,
  register,
  getPublicArticles,
  getMyArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getKategori,
  getTags,
} from "../api/index";

export default function ArtikelApi() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password2, setPassword2] = useState("");

    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [role, setRole] = useState(null);

    const [publicArtikel, setPublicArtikel] = useState([]);
    const [myArtikel, setMyArtikel] = useState([]);

    // state buat CRUD artikel
    const [judul, setJudul] = useState("");
    const [konten, setKonten] = useState("");
    const [status, setStatus] = useState("draft"); // draft / published
    const [editingId, setEditingId] = useState(null);

    // kategori & tags
    const [kategori, setKategori] = useState("");
    const [tags, setTags] = useState([]);
    const [kategoriList, setKategoriList] = useState([]);
    const [tagList, setTagList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    const savedRole = localStorage.getItem("role");
    if (token) {
      setIsLogin(true);
      if (savedRole) setRole(savedRole);
      loadData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const data = await login(username, password);
        alert("Login berhasil");

        // Simpan user (role & username)
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("role", data.user.role);
          setRole(data.user.role || "user");
        }

        setIsLogin(true);
        loadData();
    } catch (err) {
        alert("Login gagal");
    }
    };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await register(username, email, password, password2);
        alert("Register berhasil, silakan login");
        setIsRegister(false); // balik ke form login
    } catch (err) {
        alert("Register gagal: " + err.message);
    }
    };


  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    setRole(null);
    setPublicArtikel([]);
    setMyArtikel([]);
  };

  const loadData = async () => {
    try {
      const pub = await getPublicArticles();
      setPublicArtikel(pub);

      const mine = await getMyArticles();
      setMyArtikel(mine);

      const kat = await getKategori();
      setKategoriList(kat);

      const tg = await getTags();
      setTagList(tg);
    } catch (err) {
      console.error("Gagal load data:", err);
    }
  };

  // Create/Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        judul,
        konten,
        status,
        kategori_id: kategori,
        tag_ids: tags,
        penulis_id: user?.id, 
      };


      if (editingId) {
        await updateArticle(editingId, payload);
        alert("Artikel berhasil diupdate");
      } else {
        await createArticle(payload);
        alert("Artikel berhasil dibuat");
      }
      resetForm();
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus artikel ini?")) return;
    try {
      await deleteArticle(id);
      alert("Artikel dihapus");
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit
  const handleEdit = (artikel) => {
    setEditingId(artikel.id);
    setJudul(artikel.judul);
    setKonten(artikel.konten);
    setStatus(artikel.status);
    setKategori(artikel.kategori?.id || "");
    setTags(artikel.tags?.map((t) => t.id) || []);
  };

  const resetForm = () => {
    setEditingId(null);
    setJudul("");
    setKonten("");
    setStatus("draft");
    setKategori("");
    setTags([]);
  };

  return (
    <div className="p-4">
      {!isLogin ? (
        <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        {isRegister ? (
            <>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                >
                Register
                </button>
            </form>
            <p className="mt-4">
                Sudah punya akun?{" "}
                <button
                onClick={() => setIsRegister(false)}
                className="text-blue-400 hover:underline"
                >
                Login di sini
                </button>
            </p>
            </>
        ) : (
            <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                Login
                </button>
            </form>
            <p className="mt-4">
                Belum punya akun?{" "}
                <button
                onClick={() => setIsRegister(true)}
                className="text-blue-400 hover:underline"
                >
                Register sekarang!
                </button>
            </p>
            </>
        )}
        </div>
      ) : (
        // Dashboard
        <div className="max-w-3xl mx-auto text-white">
            {(() => {
                const user = JSON.parse(localStorage.getItem("user"));
                return (
                <h2 className="text-2xl font-bold mb-4">
                    Dashboard ({user?.role || "user"})
                </h2>
                );
            })()}
            
            <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded mb-6"
            >
                Logout
            </button>
          {/* Form Create/Edit */}
          <div className="bg-gray-800 p-4 rounded mb-6">
            <h3 className="text-xl font-semibold mb-2">
              {editingId ? "Edit Artikel" : "Tambah Artikel"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="p-2 rounded bg-gray-700 border border-gray-500"
              />
              <textarea
                placeholder="Konten"
                value={konten}
                onChange={(e) => setKonten(e.target.value)}
                className="p-2 rounded bg-gray-700 border border-gray-500"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 rounded bg-gray-700 border border-gray-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              {/* Dropdown kategori */}
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="p-2 rounded bg-gray-700 border border-gray-500"
              >
                <option value="">-- Pilih Kategori --</option>
                {kategoriList.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama}
                  </option>
                ))}
              </select>

              {/* Checkbox tags */}
              <div>
                <p className="mb-2">Pilih Tag:</p>
                {tagList.map((t) => (
                  <label key={t.id} className="mr-4">
                    <input
                      type="checkbox"
                      checked={tags.includes(t.id)}
                      onChange={(e) => {
                        if (e.target.checked) setTags([...tags, t.id]);
                        else setTags(tags.filter((id) => id !== t.id));
                      }}
                    />
                    {t.nama}
                  </label>
                ))}
              </div>

              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                {editingId ? "Update" : "Simpan"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="bg-gray-500 text-white py-2 rounded">
                  Batal Edit
                </button>
              )}
            </form>
          </div>

          {/* Artikel Publik */}
          <h3 className="text-xl font-semibold">Artikel Publik</h3>
          <ul className="list-disc ml-6 mb-6">
            {publicArtikel.length > 0 ? (
              publicArtikel.map((a) => (
                <li key={a.id}>
                  {a.judul} ({a.status})
                </li>
              ))
            ) : (
              <p>Tidak ada artikel publik.</p>
            )}
          </ul>

          {/* Artikel sesuai role */}
          {role === "admin" ? (
            <>
              <h3 className="text-xl font-semibold">Semua Artikel (Admin)</h3>
              <ul className="list-disc ml-6">
                {myArtikel.length > 0 ? (
                  myArtikel.map((a) => (
                    <li key={a.id} className="mb-2">
                      <b>{a.judul}</b> - {a.status} - penulis: {a.penulis?.username}
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleEdit(a)}
                          className="bg-blue-500 px-2 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="bg-red-500 px-2 py-1 rounded text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>Belum ada artikel.</p>
                )}
              </ul>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold">Artikel Saya</h3>
              <ul className="list-disc ml-6">
                {myArtikel.length > 0 ? (
                  myArtikel.map((a) => (
                    <li key={a.id} className="mb-2">
                      <b>{a.judul}</b> - {a.status}
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleEdit(a)}
                          className="bg-blue-500 px-2 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="bg-red-500 px-2 py-1 rounded text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>Tidak ada artikel.</p>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}