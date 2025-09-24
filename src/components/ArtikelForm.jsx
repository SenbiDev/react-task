import { useState, useEffect } from "react"
import { useArtikelStore } from "../store/useArtikelStore"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"

export default function ArtikelForm() {
  const { artikelEdit, clearArtikelEdit, addArtikel, updateArtikel } = useArtikelStore()
  const { kategori, fetchKategori } = useKategoriStore()
  const { tags, fetchTags } = useTagStore()

  const [judul, setJudul] = useState("")
  const [konten, setKonten] = useState("")
  const [status, setStatus] = useState("draft")
  const [kategoriId, setKategoriId] = useState("")
  const [tagIds, setTagIds] = useState([])

  // 🔹 Load kategori & tags saat pertama kali render
  useEffect(() => {
    fetchKategori()
    fetchTags()
  }, [fetchKategori, fetchTags])

  const resetForm = () => {
    setJudul("")
    setKonten("")
    setStatus("draft")
    setKategoriId("")
    setTagIds([])
  }

  // 🔹 Prefill form kalau artikelEdit ada
  useEffect(() => {
    if (artikelEdit) {
      setJudul(artikelEdit.judul || "")
      setKonten(artikelEdit.konten || "")
      setStatus(artikelEdit.status || "draft")
      setKategoriId(artikelEdit.kategori?.id || "")
      setTagIds(artikelEdit.tags?.map((t) => t.id) || [])
    } else {
      resetForm()
    }
  }, [artikelEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      judul,
      konten,
      status,
      kategori_id: kategoriId,
      tag_ids: tagIds,
    }

    if (artikelEdit) {
      updateArtikel(artikelEdit.id, payload)
    } else {
      addArtikel(payload)
      resetForm()
    }
  }

  const toggleTag = (id) => {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    )
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">
        {artikelEdit ? "Edit Artikel" : "Tambah Artikel"}
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />

        <textarea
          placeholder="Konten"
          value={konten}
          onChange={(e) => setKonten(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600 min-h-[100px]"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <select
          value={kategoriId}
          onChange={(e) => setKategoriId(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        >
          <option value="">Pilih Kategori</option>
          {kategori?.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama}
            </option>
          ))}
        </select>

        <div>
          <p className="mb-2 font-medium">Pilih Tags:</p>
          <div className="flex flex-col gap-2">
            {tags?.map((t) => (
              <label key={t.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tagIds.includes(t.id)}
                  onChange={() => toggleTag(t.id)}
                />
                <span>{t.nama}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {artikelEdit ? "Update" : "Simpan"}
          </button>
          {artikelEdit && (
            <button
              type="button"
              onClick={clearArtikelEdit}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  )
}