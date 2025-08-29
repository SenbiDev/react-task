import { useState, useEffect } from "react";
import { fetchWithAuth, createArtikel, updateArtikel, deleteArtikel } from "../api/artikel";
import { logout } from "../api/auth";
import { fetchArtikel, fecthKategori, fecthTag } from "../api/artikel";


export default function ArtikelPage ({ onLogout }) {
    const [artikels, setArtikels] = useState([]);
    const [selectedArtikel, setSelectedArtikel] = useState(null);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState("");
    const [kategoriList, setKategoriList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [form, setForm] = useState({
        judul: "",
        konten: "",
        kategori: "",
        tags: [],
        status: "draft"
    });

    const loadArtikels = async () => {
        return await fetchWithAuth("http://127.0.0.1:8000/api/artikel/");
    };
    const fecthKategori = async () => {
        return await fetchWithAuth("http://127.0.0.1:8000/api/kategori/");
    };
    const fecthTag = async () => {
        return await fetchWithAuth("http://127.0.0.1:8000/api/tag/");
    };
    

    useEffect(() => {
        const loadArtikels = () => {
            try{
                setLoad(true);
                fetchWithAuth("http://127.0.0.1:8000/api/artikel/")
                .then((data) => {
                    if(Array.isArray(data)){
                        setArtikels(data);
                    }else if (data.result && Array.isArray(data.result)){
                        setArtikels(data.result);
                    }else{
                        setArtikels([]);
                    }
                    return fecthKategori();
                })
                .then((kategoriData) => {
                    setKategoriList(kategoriData);
                    return fecthTag();
                })
                .then((tagData) => {
                    setTagList(tagData);
                })
            }catch(err){
                console.error("Gagal fetch artikel", err);
                setError("Gagal memmuat artikel");
                alert("Gagal load data, silahkan login kembali");
                logout();
                onLogout();
            }finally{
                setLoad(false);
            }
        };
        loadArtikels();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            judul: form.judul,
            konten: form.konten,
            kategori: parseInt(form.kategori),
            tags: form.tags.map(id => parseInt(id)),
            status: form.status
        };

        if (selectedArtikel) {
            updateArtikel(selectedArtikel, form)
            .then(() => {
                setSelectedArtikel(null);
                setForm({
                    judul: "",
                    konten: "",
                    kategori: "",
                    tags: [],
                    status: "draft"
                });
                loadArtikels();
            });
        } else {
            createArtikel(form).then(() => {
                setForm({
                    judul: "",
                    konten: "",
                    kategori: "",
                    tags: [],
                    status: "draft"
                });
                loadArtikels();
            });
        }
    };

    const handleEdit = (artikel) => {
        setSelectedArtikel(artikel);
        setForm({
            judul: artikel.judul,
            konten: artikel.konten,
            kategori: artikel.kategori?.id||"",
            tags: artikel.tags?artikel.tags.map(t => t.id) : [],
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
                    <h1 className="text-xl font-semibold text-black">Selamat datang</h1>
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
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Konten</label>
                            <textarea
                                placeholder="Isi konten..."
                                value={form.konten}
                                onChange={e => setForm({ ...form, konten: e.target.value })}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Kategori</label>
                            <select
                                value={form.kategori}
                                onChange={e => setForm({ ...form, kategori: e.target.value })}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="draft" className="text-black">Kategori</option>
                                {kategoriList.map((kat) => (
                                    <option key={kat.id} value={kat.id} className="text-black">
                                        {kat.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Tag</label>
                            <select
                                value={form.tags}
                                onChange={e => setForm({ ...form, tags: e.target.value})}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="draft" className="text-black">Tag</option>
                                {tagList.map((tag) => (
                                    <option key={tag.id} value={tag.id} className="text-black">
                                        {tag.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Status</label>
                            <select
                                value={form.status}
                                onChange={e => setForm({ ...form, status: e.target.value })}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="draft" className="text-black">Draft</option>
                                <option value="published" className="text-black">Published</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
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
                                            onClick={() => handleDelete(artikel.id)}
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