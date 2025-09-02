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
        kategori_id: "",
        tag_ids: [],
        status: "draft"
    });

    const loadArtikels = async () => {
        return await fetchWithAuth("http://127.0.0.1:8000/api/artikel/");
    };
    const fecthKategori = async () => {
        return await fetchWithAuth("http://127.0.0.1:8000/api/kategori/");
    };
    const fecthTag = async () => {
        return await fetchWithAuth("http://127.0.0.1:8000/api/tags/");
    };

    // const loadArtikels = async () => {
    //     const res = await fetchArtikel();
    //     const data = await res.json();
    //     setArtikels(data);
    // };
    // const loadKategori = async () => {
    //     const res = await fecthKategori();
    //     const data = await res.json();
    //     setKategoriList(data);
    // };
    // const loadTag = async () => {
    //     const res = await fecthTag();
    //     const data = await res.json();
    //     setTagList(data);
    // };
    

    useEffect(() => {
        const loadArtikels = async () => {
            try{
                setLoad(true);

                const data = await fetchWithAuth("http://127.0.0.1:8000/api/artikel/");
                setArtikels(
                    Array.isArray(data)
                    ? data 
                    : Array.isArray(data.results)
                    ? data.results
                    : []
                )

                const kategoriData = await fetchWithAuth("http://127.0.0.1:8000/api/kategori/");
                setKategoriList(kategoriData);

                const tagData = await fetchWithAuth("http://127.0.0.1:8000/api/tags/");
                setTagList(tagData);

            } catch (err) {
                console.error("Gagal fetch Artikel", err);
                setError("Gagal memuat artikel");
                alert("Gagal load data, seilahkan login kembali");
                logout();
                onLogout();
            } finally {
                setLoad(false);
            }
        };

        loadArtikels();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            judul: form.judul,
            konten: form.konten,
            kategori_id: form.kategori_id,
            tag_ids: form.tag_ids.map((t) => Number(t)),
            status: form.status
        };

        if(form.id) {
            await updateArtikel(form.id, payload);
        }else{
            await createArtikel(payload);
        }
        setForm({
            judul: "",
            konten: "",
            kategori_id: "",
            tag_ids: [],
            status: "draft"
        });
    };

    const handleEdit = (artikel) => {
        setSelectedArtikel(artikel);
        setForm({
            id: artikel.id,
            judul: artikel.judul,
            konten: artikel.konten,
            kategori_id: artikel.kategori_id?.id||"",
            tag_ids: artikel.tag_ids?artikel.tag_ids.map(t => t.id) : [],
            status: artikel.status
        });
    };

    const handleDelete = async (id) => {
        await deleteArtikel(id);
        await loadArtikels();
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
                                value={form.kategori_id}
                                onChange={e => setForm({ ...form, kategori_id: e.target.value? Number(e.target.value): null })}
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
                        <div className="space-y-2">
                            <p className="block mb-1 font-medium text-gray-700">Tag</p>
                            <div className="grid grid-cols-2 gap-2">
                                {tagList.map((t) => (
                                <label key={t.id} className="flex justify-center space-x-2">  
                                    <input
                                        type="checkbox"
                                        checked={form.tag_ids.includes(String(t.id))}
                                        onChange={(e) => {
                                            if (e.target.checked){
                                                setForm({ ...form, tag_ids: [ ...form.tag_ids, String(t.id)] });
                                            } else {
                                                setForm({
                                                    ...form,
                                                    tag_ids: form.tag_ids.filter((id) => id !== String(id)),
                                                });
                                            }
                                        }}
                                        // className="text-black w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                        <span className="text-black">{t.nama}</span>
                                        {/* {tagList.map((t) => (
                                            <option key={t.id} value={t.id} className="text-black">
                                                {t.nama}
                                            </option>
                                        ))} */}
                                </label>
                                ))}
                            </div>
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
                                        <p className="font-medium text-black">{artikel.judul}</p>
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