import { useState, useEffect } from "react";
import { getAuthHeader, refreshToken } from "../api/config";
import { getArtikelList, createArtikel, updateArtikel, deleteArtikel, getMyArtikels, getPublikArtikels } from "../api/artikel";
import { logout } from "../api/auth";
import { getKategori, getTags } from "../api/admin";
import { useNavigate } from "react-router-dom";

export default function ArtikelPage() {
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [status, setStatus] = useState("draft");
  const [editingId, setEditingId] = useState(null);
  const [kategori, setKategori] = useState("");
  const [tags, setTags] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [publikArtikel, setPublikArtikel] = useState([]);
  const [myArtikel, setMyArtikel] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  
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
      };
      if (editingId) {
        await updateArtikel(editingId, payload);
        alert("Artikel berhasil diupdate");
      } else {
        await createArtikel(payload);
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
      await deleteArtikel(id);
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
  
  return (
        <div className="min-h-screen bg-gray-100 font-sans p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-semibold text-black">Selamat datang</h1>
                    <div className="space-x-2">
                      {role === "admin" && (
                        <button
                          onClick={() => navigate("/admin")}
                          className="bg-gray-700 text-white px-3 py-1 rounded"
                        >
                          Admin: Kelola Kategori & Tag
                        </button>
                      )}
                      <button
                        onClick={logout}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                <div className="bg-white p-6 border border-gray-300 rounded shadow-sm mb-8">
                    <h3 className="mb-4 text-lg text-black font-medium">{editingId ? "Edit Artikel" : "Buat Artikel"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Judul</label>
                            <input
                                placeholder="Judul"
                                value={judul}
                                onChange={e => setJudul(e.target.value)}
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Konten</label>
                            <textarea
                                placeholder="Isi konten..."
                                value={konten}
                                onChange={e => setKonten(e.target.value)}
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Kategori</label>
                            <select
                                value={kategori}
                                onChange={e => setKategori(e.target.value)}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="" className="text-black">Kategori</option>
                                {kategoriList.map((k) => (
                                    <option key={k.id} value={k.id} className="text-black">
                                        {k.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <p className="block mb-1 font-medium text-gray-700">Tag</p>
                            <div className="grid grid-cols-2 gap-2">
                                {tagList.map((t) => (
                                <label key={t.id} className="flex justify-center space-x-2">  
                                    <input
                                        type="checkbox"
                                        checked={tags.includes(t.id)}
                                        onChange={(e) => {
                                        if (e.target.checked) setTags([...tags, t.id]);
                                        else setTags(tags.filter((id) => id !== t.id));
                                        }}
                                    />
                                    <span className="text-black">{t.nama}</span>
                                </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Status</label>
                            <select
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="draft" className="text-black">Draft</option>
                                <option value="published" className="text-black">Published</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            {editingId ? "Update" : "Create"}
                        </button>
                    </form>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded shadow-sm">
                    <h3 className="mb-4 text-lg text-black font-medium">Artikel Saya</h3>
                    {myArtikel.length === 0 ? (
                        <p className="text-gray-500">Belum ada artikel</p>
                    ) : (
                        <ul className="space-y-3">
                            {myArtikel.map((artikel) => (
                                <li key={artikel.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                    <div>
                                        <p className="font-medium text-black">{artikel.judul}</p>
                                        <p className="text-sm text-black">{artikel.status}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEdit(artikel)}
                                            className="text-green-600 hover:underline text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(artikel.id)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded shadow-sm">
                  <h3 className="mb-4 text-lg text-black font-medium">Artikel Publik</h3>
                    {publikArtikel.length === 0 ? (
                      <p className="text-gray-500">Belum ada artikel publik.</p>
                    ) : (
                      <ul className="space-y-3">
                        {publikArtikel.map((a) => {
                          const user = JSON.parse(localStorage.getItem("user"));
                          const isOwner = user?.id === a.penulis?.id;
                          const isAdmin = user?.role === "admin";
                          return (
                            <li key={a.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                          <div>
                            <p className="font-medium text-black">{a.judul}</p>
                            <p className="text-sm text-black">{a.konten}</p>
                            <p className="text-sm text-black mt-1">
                              Penulis: {a.penulis?.username || "-"} | Kategori:{" "}
                              {a.kategori?.nama || "-"} | Tags:{" "}
                              {a.tags?.map((t) => t.nama).join(", ") || "-"}
                             </p>
                          </div>
                            {(isOwner || isAdmin) && (
                              <div className="space-x-2">
                                <button
                                  onClick={() => handleEdit(a)}
                                  className="text-green-600 hover:underline text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(a.id)}
                                  className="text-red-600 hover:underline text-sm"
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
        </div>
    );
}