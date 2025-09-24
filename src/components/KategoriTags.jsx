import { useEffect } from "react"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"

export default function KategoriTags() {
  const { kategori, fetchKategori, addKategori, updateKategori, deleteKategori } = useKategoriStore()
  const { tags, fetchTags, addTag, updateTag, deleteTag } = useTagStore()

  // Ambil data saat pertama render
  useEffect(() => {
    fetchKategori()
    fetchTags()
  }, [fetchKategori, fetchTags])

  const ItemList = ({ title, items, onCreate, onUpdate, onDelete }) => (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-800 p-2 rounded"
          >
            <span>{item.nama}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const nama = prompt(`Edit ${title}:`, item.nama)
                  if (nama) onUpdate(item.id, { nama })
                }}
                className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const nama = prompt(`Nama ${title.toLowerCase()} baru:`)
          if (nama) onCreate({ nama })
        }}
        className="mt-3 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
      >
        + Tambah {title}
      </button>
    </div>
  )

  return (
    <div className="grid grid-cols-2 gap-4">
      <ItemList
        title="Kategori"
        items={kategori}
        onCreate={addKategori}
        onUpdate={updateKategori}
        onDelete={deleteKategori}
      />
      <ItemList
        title="Tag"
        items={tags}
        onCreate={addTag}
        onUpdate={updateTag}
        onDelete={deleteTag}
      />
    </div>
  )
}