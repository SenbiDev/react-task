import { useAuthStore } from "../store/useAuthStore"
import { useArtikelStore } from "../store/useArtikelStore"

export default function ArtikelList({ isMyList }) {
  const { user } = useAuthStore()
  const { artikel, deleteArtikel, setArtikelEdit } = useArtikelStore()

  // 🔹 logika list
  const list = isMyList
    ? artikel.filter((a) => a.penulis?.id === user?.id)
    : artikel.filter((a) => a.status === "published")

  const canModify = (a) =>
    user?.role === "admin" || a.penulis?.id === user?.id

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md mt-3">
      <h3 className="text-lg font-semibold mb-3">
        {isMyList ? "Artikel Saya" : "Artikel Publik"}
      </h3>

      {list.length === 0 ? (
        <p className="text-gray-400">
          {isMyList ? "Belum ada artikel." : "Belum ada artikel publik."}
        </p>
      ) : (
        <ul className="space-y-2">
          {list.map((a) => (
            <li
              key={a.id}
              className="p-3 rounded bg-gray-800 border border-gray-700 flex justify-between items-start"
            >
              <div className="flex-1">
                <h4 className="font-bold">{a.judul}</h4>
                <p className="text-gray-300">{a.konten}</p>

                <p className="text-sm text-gray-400 mt-1">
                  {isMyList ? (
                    <>
                      Status: {a.status} | Kategori: {a.kategori?.nama || "-"} | Tags:{" "}
                      {a.tags?.map((t) => t.nama).join(", ") || "-"}
                    </>
                  ) : (
                    <>
                      Penulis: {a.penulis?.username || "-"} | Kategori:{" "}
                      {a.kategori?.nama || "-"} | Tags:{" "}
                      {a.tags?.map((t) => t.nama).join(", ") || "-"}
                    </>
                  )}
                </p>
              </div>

              {/* 🔹 Tampilkan tombol kalau admin ATAU pemilik */}
              {canModify(a) && (
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setArtikelEdit(a)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteArtikel(a.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}