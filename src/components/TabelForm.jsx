import { useState } from "react";

export default function TabelForm({ onAdd }) {
    const [nama, setNama] = useState('');
    const [kategori, setKategori] = useState('');
    const [harga, setharga] = useState('');
    const [tanggal, setTanggal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nama || !kategori || !harga || !tanggal) {
            alert('Semua kolom wajib diisi');
            return;
        }

        onAdd({nama, kategori, harga:parseFloat(harga), tanggal});
        setNama('');
        setKategori('');
        setharga('');
        setTanggal('');
        setError(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow p-4 border rounded mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-black">
                <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama"
                    className={`border p-2 rounded ${error && !nama ? 'border-red-500' : 'border-gray-300'}`}
                />
                <input
                    type="text"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    placeholder="Kategori"
                    className={`border p-2 rounded ${error && !kategori ? 'border-red-500' : 'border-gray-300'}`}
                />
                <input
                    type="number"
                    value={harga}
                    onChange={(e) => setharga(e.target.value)}
                    placeholder="Harga"
                    className={`border p-2 rounded ${error && !harga ? 'border-red-500' : 'border-gray-300'}`}
                />
                <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    placeholder="Tanggal"
                    className={`border p-2 rounded ${error && !tanggal ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
            <button
                type="submit"
                className="mt-4 !bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"    
            >
                Simpan
            </button>
        </form>
    );
}