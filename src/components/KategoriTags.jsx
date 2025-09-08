export default function KategoriTags({
  kategori,
  tags,
  onCreateKategori,
  onUpdateKategori,
  onDeleteKategori,
  onCreateTag,
  onUpdateTag,
  onDeleteTag,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Kategori */}
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Kategori</h3>
        <ul className="space-y-2">
          {kategori.map((k) => (
            <li
              key={k.id}
              className="flex justify-between items-center bg-gray-800 p-2 rounded"
            >
              <span>{k.nama}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const nama = prompt("Edit Kategori:", k.nama);
                    if (nama) onUpdateKategori(k.id, nama);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteKategori(k.id)}
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
            const nama = prompt("Nama kategori baru:");
            if (nama) onCreateKategori(nama);
          }}
          className="mt-3 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
        >
          + Tambah Kategori
        </button>
      </div>

      {/* Tags */}
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <ul className="space-y-2">
          {tags.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-gray-800 p-2 rounded"
            >
              <span>{t.nama}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const nama = prompt("Edit Tag:", t.nama);
                    if (nama) onUpdateTag(t.id, nama);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTag(t.id)}
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
            const nama = prompt("Nama tag baru:");
            if (nama) onCreateTag(nama);
          }}
          className="mt-3 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
        >
          + Tambah Tag
        </button>
      </div>
    </div>
  );
}