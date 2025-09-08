export default function ArtikelList({ artikel, onEdit, onDelete, isMyList }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">
        {isMyList ? "Artikel Saya" : "Artikel Publik"}
      </h3>
      <ul className="space-y-2">
        {artikel.map((a) => (
          <li
            key={a.id}
            className="p-3 rounded bg-gray-800 border border-gray-700 flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{a.judul}</h4>
              <p className="text-sm text-gray-400">
                {a.kategori?.nama || "-"} | {a.status}
              </p>
            </div>
            {isMyList && (
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(a)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(a.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}