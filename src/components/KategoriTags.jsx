import { useState, useEffect } from "react"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import { useAuthStore } from "../store/useAuthStore"

export default function KategoriTags() {
  const { user } = useAuthStore()
  const {
    kategori,
    fetchKategori,
    addKategori,
    updateKategori,
    deleteKategori,
  } = useKategoriStore()
  const { tags, fetchTags, addTag, updateTag, deleteTag } = useTagStore()

  // 🔹 state untuk tambah/edit
  const [newKategori, setNewKategori] = useState("")
  const [editKategoriId, setEditKategoriId] = useState(null)

  const [newTag, setNewTag] = useState("")
  const [editTagId, setEditTagId] = useState(null)

  // 🔹 fetch data awal
  useEffect(() => {
    fetchKategori()
    fetchTags()
  }, [fetchKategori, fetchTags])

  if (!user || user.role !== "admin") {
    return <p className="text-gray-400">Hanya admin yang bisa mengelola kategori & tags.</p>
  }

  // 🔹 handler kategori
  const handleSaveKategori = async () => {
    if (!newKategori.trim()) return alert("Nama kategori tidak boleh kosong")

    try {
      if (editKategoriId) {
        await updateKategori(editKategoriId, { nama: newKategori })
        setEditKategoriId(null)
      } else {
        await addKategori({ nama: newKategori })
      }
      setNewKategori("")
    } catch (err) {
      console.error("Gagal simpan kategori:", err)
      alert("Gagal simpan kategori")
    }
  }

  const handleEditKategori = (k) => {
    setEditKategoriId(k.id)
    setNewKategori(k.nama)
  }

  const handleDeleteKategori = async (id) => {
    if (!window.confirm("Yakin hapus kategori ini?")) return
    await deleteKategori(id)
  }

  // 🔹 handler tags
  const handleSaveTag = async () => {
    if (!newTag.trim()) return alert("Nama tag tidak boleh kosong")

    try {
      if (editTagId) {
        await updateTag(editTagId, { nama: newTag })
        setEditTagId(null)
      } else {
        await addTag({ nama: newTag })
      }
      setNewTag("")
    } catch (err) {
      console.error("Gagal simpan tag:", err)
      alert("Gagal simpan tag")
    }
  }

  const handleEditTag = (t) => {
    setEditTagId(t.id)
    setNewTag(t.nama)
  }

  const handleDeleteTag = async (id) => {
    if (!window.confirm("Yakin hapus tag ini?")) return
    await deleteTag(id)
  }

  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      {/* Kategori */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Kelola Kategori</h3>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Nama kategori"
            value={newKategori}
            onChange={(e) => setNewKategori(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <button
            onClick={handleSaveKategori}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {editKategoriId ? "Update" : "Tambah"}
          </button>
        </div>

        <ul className="space-y-2">
          {kategori.map((k) => (
            <li
              key={k.id}
              className="flex justify-between items-center bg-gray-800 p-2 rounded"
            >
              <span>{k.nama}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditKategori(k)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteKategori(k.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Kelola Tags</h3>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Nama tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <button
            onClick={handleSaveTag}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {editTagId ? "Update" : "Tambah"}
          </button>
        </div>

        <ul className="space-y-2">
          {tags.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-gray-800 p-2 rounded"
            >
              <span>{t.nama}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTag(t)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTag(t.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}