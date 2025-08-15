export default function List ({ data, onEdit, onDelete}) {
    return(
        <div className="overflow-x-auto bg-gray-900 bg-opacity-80 rounded shadow">
            <table className="min-w-full text-sm text-gray-200">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="text-center px-4 py-2">ID</th>
                        <th className="text-center px-4 py-2">Nama</th>
                        <th className="text-center px-4 py-2">Kategori</th>
                        <th className="text-center px-4 py-2">Harga</th>
                        <th className="text-center px-4 py-2">Tanggal</th>
                        <th className="text-center px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-400">Belum ada data</td>
                        </tr>
                    ) : (
                        data.map((item) =>(
                            <tr key={item.id} className="hover:bg-gray800">
                                <td className="text-center px-4 py-2">{item.id}</td>
                                <td className="text-center px-4 py-2 capitalize">{item.nama}</td>
                                <td className="text-center px-4 py-2 capitalize">{item.kategori}</td>
                                <td className="text-center px-4 py-2">Rp {parseInt(item.harga).toLocaleString()}</td>
                                <td className="text-center px-4 py-2">{item.tanggal}</td>
                                <td className="justify-center px-4 py-2 flex gap-2">
                                    <button onClick={() => onEdit(item)} className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">Edit</button>
                                    <button onClick={() => onDelete(item.id)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Hapus</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}