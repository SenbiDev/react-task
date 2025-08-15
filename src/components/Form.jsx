import { useEffect, useState } from "react";

export default function Form ({ onSave, editItem, cancelEdit}) {
    const [form, setForm] = useState({
        nama: "",
        kategori: "",
        harga: "",
        tanggal: "",
    });

    useEffect(() => {
        if (editItem) {
            setForm({
                nama: editItem.nama,
                kategori: editItem.kategori,
                harga: editItem.harga,
                tanggal: editItem.tanggal,
            });
        } else {
            setForm({
                nnama: "",
                kategori: "",
                harga: "",
                tanggal: "",
            });
        }
    }, [editItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            id : editItem ? editItem.id : Date.now().toString(),
            ...form
        };
        onSave(newData);
        setForm ({
            nama: "",
            kategori: "",
            harga: "",
            tanggal: ""
        })
    };

    return(
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="id" className=" block text-sm font-medium text-white">Nama</label>
                <input
                    type="text"
                    value={form.nama}
                    onChange={(e) => setForm({...form, nama: e.target.value})}
                    className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                <label htmlFor="id" className=" block text-sm font-medium text-white">Kategori</label>
                <input
                    type="text"
                    value={form.kategori}
                    onChange={(e) => setForm({...form, kategori: e.target.value})}
                    className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                <label htmlFor="id" className=" block text-sm font-medium text-white">Harga</label>
                <input
                    type="number"
                    value={form.harga}
                    onChange={(e) => setForm({...form, harga: e.target.value})}
                    className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                <label htmlFor="id" className=" block ml-auto w-32 text-sm font-medium text-white">Tanggal</label>
                <input
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => setForm({...form, tanggal: e.target.value})}
                    className="mt-1 block ml-auto w-48 rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div className=" flex justify-end space-x-4 pt-4">
            {editItem &&(
                <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Batal
                </button>
            )}
                <button type="submit" className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900">
                    Simpan
                </button>
            </div>
            </form>
    )
}