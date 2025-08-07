export default function TabelList({ items, onSort, sortBy, sortOrder, onEdit, onDelete }) {
    const renderSortArrow = (key) => {
        if (sortBy !== key) return '↑↓';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    return (
        <table className="min-w-full bg-white border text-black">
            <thead>
                <tr>
                    {['id', 'nama', 'kategori', 'harga', 'tanggal'].map((key) => (
                        <th
                            key={key}
                            className="border px-4 py-2 cursor-pointer"
                            onClick={() => onSort(key)}
                        >
                            {key.toUpperCase()} {renderSortArrow(key)}
                        </th>
                    ))}
                    <th className="border px-4 py-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {items.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center p-4 text-gray-500">
                            Tidak ada data.
                        </td>
                    </tr>
                ) : (
                    items.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.id}</td>
                            <td className="border px-4 py-2">{item.nama}</td>
                            <td className="border px-4 py-2">{item.kategori}</td>
                            <td className="border px-4 py-2">{item.harga.toLocaleString()}</td>
                            <td className="border px-4 py-2">{item.tanggal}</td>
                            <td className="border px-4 py-2 flex gap-[18%] justify-center">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="!bg-yellow-400 text-black px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="!bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}