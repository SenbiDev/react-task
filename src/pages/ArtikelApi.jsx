import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  login,
  register,
  getPublicArticles,
  getMyArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "../api/index";

// Komponen PasswordInput
function PasswordInput({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

// Komponen Kelola Kategori & Tags (CRUD lengkap)
function KategoriTags({
  kategoriList,
  tagList,
  onAddKategori,
  onAddTag,
  onDeleteKategori,
  onDeleteTag,
  onUpdateKategori,
  onUpdateTag,
}) {
  const [newKategori, setNewKategori] = useState("");
  const [newTag, setNewTag] = useState("");

  const [editKategoriId, setEditKategoriId] = useState(null);
  const [editKategoriName, setEditKategoriName] = useState("");

  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState("");

  return (
    <div className="bg-gray-800 p-4 rounded mb-6">
      {/* ====== KATEGORI ====== */}
      <h3 className="text-xl font-semibold mb-2">Kelola Kategori</h3>
      <div className="mb-3 flex">
        <input
          type="text"
          value={newKategori}
          onChange={(e) => setNewKategori(e.target.value)}
          placeholder="Nama kategori"
          className="flex-1 p-2 rounded bg-gray-700 border border-gray-500"
        />
        <button
          onClick={() => {
            if (!newKategori.trim()) return;
            onAddKategori(newKategori);
            setNewKategori("");
          }}
          className="ml-2 bg-green-600 px-3 py-1 rounded"
        >
          Tambah
        </button>
      </div>

      <ul className="mt-3">
        {kategoriList.map((k) => (
          <li
            key={k.id}
            className="flex justify-between items-center bg-gray-900 p-2 rounded mb-1"
          >
            {editKategoriId === k.id ? (
              <div className="flex w-full">
                <input
                  type="text"
                  value={editKategoriName}
                  onChange={(e) => setEditKategoriName(e.target.value)}
                  className="flex-1 p-1 rounded bg-gray-700 border border-gray-500"
                />
                <button
                  onClick={() => {
                    onUpdateKategori(k.id, editKategoriName);
                    setEditKategoriId(null);
                  }}
                  className="ml-2 bg-green-600 px-2 py-1 rounded text-sm"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditKategoriId(null)}
                  className="ml-2 bg-gray-500 px-2 py-1 rounded text-sm"
                >
                  Batal
                </button>
              </div>
            ) : (
              <>
                <span>{k.nama}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditKategoriId(k.id);
                      setEditKategoriName(k.nama);
                    }}
                    className="bg-blue-500 px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteKategori(k.id)}
                    className="bg-red-600 px-2 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* ====== TAGS ====== */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Kelola Tags</h3>
      <div className="mb-3 flex">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Nama tag"
          className="flex-1 p-2 rounded bg-gray-700 border border-gray-500"
        />
        <button
          onClick={() => {
            if (!newTag.trim()) return;
            onAddTag(newTag);
            setNewTag("");
          }}
          className="ml-2 bg-green-600 px-3 py-1 rounded"
        >
          Tambah
        </button>
      </div>

      <ul className="mt-3">
        {tagList.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-gray-900 p-2 rounded mb-1"
          >
            {editTagId === t.id ? (
              <div className="flex w-full">
                <input
                  type="text"
                  value={editTagName}
                  onChange={(e) => setEditTagName(e.target.value)}
                  className="flex-1 p-1 rounded bg-gray-700 border border-gray-500"
                />
                <button
                  onClick={() => {
                    onUpdateTag(t.id, editTagName);
                    setEditTagId(null);
                  }}
                  className="ml-2 bg-green-600 px-2 py-1 rounded text-sm"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditTagId(null)}
                  className="ml-2 bg-gray-500 px-2 py-1 rounded text-sm"
                >
                  Batal
                </button>
              </div>
            ) : (
              <>
                <span>{t.nama}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditTagId(t.id);
                      setEditTagName(t.nama);
                    }}
                    className="bg-blue-500 px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTag(t.id)}
                    className="bg-red-600 px-2 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

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

  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [status, setStatus] = useState("draft");
  const [editingId, setEditingId] = useState(null);

  const [kategori, setKategori] = useState("");
  const [tags, setTags] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [tagList, setTagList] = useState([]);

  // Load token & data saat mount
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
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
        setRole(data.user.role || "user");
      }
      setIsLogin(true);
      loadData();
    } catch {
      alert("Login gagal");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, password2);
      alert("Register berhasil, silakan login");
      setIsRegister(false);
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

  // Artikel create/update
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

  // CRUD kategori & tag
  const handleAddKategori = async (nama) => {
    await createKategori(nama);
    loadData();
  };
  const handleAddTag = async (nama) => {
    await createTag(nama);
    loadData();
  };
  const handleDeleteKategori = async (id) => {
    if (!window.confirm("Yakin hapus kategori?")) return;
    await deleteKategori(id);
    loadData();
  };
  const handleDeleteTag = async (id) => {
    if (!window.confirm("Yakin hapus tag?")) return;
    await deleteTag(id);
    loadData();
  };
  const handleUpdateKategori = async (id, nama) => {
    if (!nama.trim()) return;
    await updateKategori(id, nama);
    loadData();
  };
  const handleUpdateTag = async (id, nama) => {
    if (!nama.trim()) return;
    await updateTag(id, nama);
    loadData();
  };

  return (
    <div className="p-4">
      {!isLogin ? (
        // ================= FORM LOGIN & REGISTER =================
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
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <PasswordInput
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Confirm Password"
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
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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
        // ================= DASHBOARD =================
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

          {/* ================= FORM ARTIKEL ================= */}
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

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                {editingId ? "Update" : "Simpan"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white py-2 rounded"
                >
                  Batal Edit
                </button>
              )}
            </form>
          </div>

          {/* ================= ADMIN: KELOLA KATEGORI & TAGS ================= */}
          {role === "admin" && (
            <KategoriTags
              kategoriList={kategoriList}
              tagList={tagList}
              onAddKategori={handleAddKategori}
                            onAddTag={handleAddTag}
              onDeleteKategori={handleDeleteKategori}
              onDeleteTag={handleDeleteTag}
              onUpdateKategori={handleUpdateKategori}
              onUpdateTag={handleUpdateTag}
            />
          )}

          {/* ================= LIST ARTIKEL SAYA ================= */}
          <div className="bg-gray-800 p-4 rounded mb-6">
            <h3 className="text-xl font-semibold mb-2">Artikel Saya</h3>
            {myArtikel.length === 0 ? (
              <p className="text-gray-400">Belum ada artikel.</p>
            ) : (
              <ul className="space-y-3">
                {myArtikel.map((a) => (
                  <li
                    key={a.id}
                    className="bg-gray-900 p-3 rounded flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold">{a.judul}</h4>
                      <p className="text-sm text-gray-400">
                        Status: {a.status} | Kategori: {a.kategori?.nama || "-"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="bg-blue-500 px-2 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="bg-red-600 px-2 py-1 rounded text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ================= LIST ARTIKEL PUBLIK ================= */}
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Artikel Publik</h3>
            {publicArtikel.length === 0 ? (
              <p className="text-gray-400">Belum ada artikel publik.</p>
            ) : (
              <ul className="space-y-3">
                {publicArtikel.map((a) => {
                  const user = JSON.parse(localStorage.getItem("user"));
                  const isOwner = user?.id === a.penulis?.id;
                  const isAdmin = user?.role === "admin";
                  return (
                    <li key={a.id} className="bg-gray-900 p-3 rounded flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{a.judul}</h4>
                        <p className="text-gray-300">{a.konten}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Penulis: {a.penulis?.username || "-"} | Kategori:{" "}
                          {a.kategori?.nama || "-"} | Tags:{" "}
                          {a.tags?.map((t) => t.nama).join(", ") || "-"}
                        </p>
                      </div>
                      {(isOwner || isAdmin) && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(a)}
                            className="bg-blue-500 px-2 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(a.id)}
                            className="bg-red-600 px-2 py-1 rounded text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}