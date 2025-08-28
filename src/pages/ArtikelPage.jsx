import { useState, useEffect } from "react";
import { fetchArtikel, createArtikel, updateArtikel, deleteArtikel } from "../api/artikel";
import { logout } from "../api/auth";

export default function ArtikelPage ({ user, onLogout }) {
    const [artikels, setArtikels] = useState([]);
    const [form, setForm] = useState({judul: "", konten: "", status: "draft"});
    const [selectedArtikel, setSelectedArtikel] = useState(null);

    
    useEffect(() => {
        const loadArtikels = () => {
            fetchArtikel()
                .then(data => setArtikels(data.result || data))
                .catch(() => { alert("Gagal load artikel");
                    logout();
                    onLogout();
                });
        };
        loadArtikels();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedArtikel) {
            updateArtikel(selectedArtikel.id, form).then(() => {
                setSelectedArtikel(null);
                setForm({ judul: "", konten: "", status: "draft" });
                loadArtikels();
            });
        } else {
            createArtikel(form).then(() => {
                setForm({ judul: "", konten: "", status: "draft" });
                loadArtikels();
            });
        }
    };

    const handleEdit = (artikel) => {
        setSelectedArtikel(artikel);
        setForm({
            judul: artikel.judul,
            konten: artikel.konten,
            status: artikel.status
        });
    };

    const handleDelete = (id) => {
        deleteArtikel(id).then(() => loadArtikels());
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold">Selamat datang</h2>
                    <button
                        onClick={() => { logout(); onLogout(); }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Logout
                    </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded shadow-sm mb-8">
                    <h3 className="mb-4 text-lg font-medium">{selectedArtikel ? "Edit Artikel" : "Buat Artikel"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Judul</label>
                            <input
                                placeholder="Judul"
                                value={form.judul}
                                onChange={e => setForm({ ...form, judul: e.target.value })}
                                required
                                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Konten</label>
                            <textarea
                                placeholder="Isi konten..."
                                value={form.konten}
                                onChange={e => setForm({ ...form, konten: e.target.value })}
                                required
                                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Status</label>
                            <select
                                value={form.status}
                                onChange={e => setForm({ ...form, status: e.target.value })}
                                required
                                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="darf">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white pc-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            {selectedArtikel ? "Update" : "Create"}
                        </button>
                    </form>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded shadow-sm">
                    <h4 className="mb-4 text-lg font-medium">Daftar Artikel</h4>
                    {artikels.length === 0 ? (
                        <p className="text-gray-500">Belum ada artikel</p>
                    ) : (
                        <ul className="space-y-3">
                            {artikels.map((artikel) => (
                                <li key={artikel.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                    <div>
                                        <p className="font-medium">{artikel.judul}</p>
                                        <p className="text-sm text-gray-600">{artikel.status}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEdit(artikel)}
                                            className="text-green-600 hover:underline text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(artikel)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}