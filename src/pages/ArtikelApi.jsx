import { useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useArtikelStore } from "../store/useArtikelStore"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import ArtikelForm from "../components/ArtikelForm"
import ArtikelList from "../components/ArtikelList"
import KategoriTags from "../components/KategoriTags"

export default function ArtikelApi() {
  const { user } = useAuthStore()
  const role = user?.role || "user"

  const {
    fetchArtikel,
    artikel = [], 
    artikelEdit,
    setArtikelEdit,
    clearArtikelEdit,
    deleteArtikel,
  } = useArtikelStore()

  const { fetchKategori } = useKategoriStore()
  const { fetchTags } = useTagStore()

  useEffect(() => {
    fetchArtikel()
    fetchKategori()
    fetchTags()
  }, [fetchArtikel, fetchKategori, fetchTags])

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus artikel ini?")) return
    await deleteArtikel(id)
    alert("Artikel dihapus")
  }

  return (
    <div className="p-4 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Dashboard ({role})</h2>

      <div className="bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {artikelEdit ? "Edit Artikel" : "Tambah Artikel"}
        </h3>
        <ArtikelForm />
      </div>

      {role === "admin" && <KategoriTags />}

      {/* My Artikel */}
      <ArtikelList
        artikel={(artikel || []).filter((a) => a.is_owner)}
        onEdit={setArtikelEdit}
        onDelete={handleDelete}
        isMyList={true}
      />

      {role === "admin" && (
        <ArtikelList
          artikel={(artikel || []).filter((a) => a.status === "published")}
          onEdit={setArtikelEdit}
          onDelete={handleDelete}
          isMyList={false}
        />
      )}
    </div>
  )
}