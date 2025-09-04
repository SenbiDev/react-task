import { useState, useEffect } from "react";
import { getAuthHeader, refreshToken } from "../api/config";
import { getKategori, createKategori, updateKategori, deleteKategori, getTags, createTag, updateTag, deleteTag, } from "../api/admin";

export default function AdminPage () {
  const [newKategori, setNewKategori] = useState("");
  const [newTag, setNewTag] = useState("");
  const [editKategoriId, setEditKategoriId] = useState(null);
  const [editKategoriName, setEditKategoriName] = useState("");
  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("");
  
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
        const kat = await getKategori();
        const tg = await getTags();
        setKategoriList(kat);
        setTagList(tg);
      } catch (err) {
        console.error("Gagal load data:", err);
      }
    };
    
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
    <div className="bg-white p-6 border border-gray-300 rounded shadow-sm">
      <h3 className="text-xl font-semibold text-black">Kelola Kategori</h3>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newKategori}
          onChange={(e) => setNewKategori(e.target.value)}
          placeholder="Nama kategori"
          className="flex text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (!newKategori.trim()) return;
            handleAddKategori(newKategori);
            setNewKategori("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Tambah
        </button>
      </div>

      <ul className="space-y-3">
        {kategoriList.map((k) => (
          <li
            key={k.id}
            className="flex justify-between items-center p-3 border border-gray-200 rounded"
          >
            {editKategoriId === k.id ? (
              <div className="mb-4 flex">
                <input
                  type="text"
                  value={editKategoriName}
                  onChange={(e) => setEditKategoriName(e.target.value)}
                  className="flex text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    handleUpdateKategori(k.id, editKategoriName);
                    setEditKategoriId(null);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditKategoriId(null)}
                  className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Batal
                </button>
              </div>
            ) : (
              <>
                <span>{k.nama}</span>
                <div className="mb-4 flex">
                  <button
                    onClick={() => {
                      setEditKategoriId(k.id);
                      setEditKategoriName(k.nama);
                    }}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteKategori(k.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold text-black">Kelola Tags</h3>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Nama tag"
          className="flex text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (!newTag.trim()) return;
            handleAddTag(newTag);
            setNewTag("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Tambah
        </button>
      </div>

      <ul className="mt-3">
        {tagList.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center p-3 border border-gray-200 rounded"
          >
            {editTagId === t.id ? (
              <div className="mb-4 flex">
                <input
                  type="text"
                  value={editTagName}
                  onChange={(e) => setEditTagName(e.target.value)}
                  className="flex text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    handleUpdateTag(t.id, editTagName);
                    setEditTagId(null);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditTagId(null)}
                  className="text-gray-600 hover:underline text-sm"
                >
                  Batal
                </button>
              </div>
            ) : (
              <>
                <span>{t.nama}</span>
                <div className="mb-4 flex">
                  <button
                    onClick={() => {
                      setEditTagId(t.id);
                      setEditTagName(t.nama);
                    }}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTag(t.id)}
                    className="text-red-600 hover:underline text-sm"
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