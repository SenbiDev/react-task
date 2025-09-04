import React, { useEffect, useState } from "react";
import { getKategori, createKategori, updateKategori, deleteKategori } from "../api/kategori";
import { getTags, createTag, upadateTag, deleteTag } from "../api/tags";
import { logout } from "../api/auntApi";

export default function AdminPage({ onLogout }) {
    const [ kategoriList, setKategoriList] =useState ([]);
    const [ selectedKategori, setSelectedKategori ] = useState (null);
    const [ tagList, setTagList ] = useState ([]);
    const [ selectedTag, setSelectedTag ] = useState (null)
    const [ kategoriForm, setKategoriForm] = useState({ nama: "" });
    const [ tagForm, setTagForm ] = useState ({ nama: "" });
    const [ loading, setLoading] = useState(true);
    const [ errorMsg, setErrorMsg] = useState(""); 

    const loadData = async () => {
        try{
            setLoading(true);
            const kategoriData = await getKategori();
            const tagData = await getTags();

            setKategoriList(Array.isArray(kategoriData) ? kategoriData : []);
            setTagList(Array.isArray(tagData) ? tagData : []); 
        } catch (err) {
            console.error("Error load data", err);
            setErrorMsg("gagal mengambil data, silahkan login ulang");
            logout();
            if(typeof onLogout === "function") onLogout();
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadData();
        // esslint-disable-next-line-react-hooks/exhaustive-deps
    }, []);

    const resetFormKategori = () => setKategoriForm({ nama: "" });
    const resetFormTag = () => setTagForm({ nama: ""});

    const handleSubmitKategori = async (e) => {
        e.preventDefault();
        try {
            if(selectedKategori) {
                await updateKategori(selectedKategori.id, kategoriForm.nama);
            } else {
                await createKategori(kategoriForm.nama);
            }
            resetFormKategori();
            setSelectedKategori(null);
            loadData();
        } catch (err) {
            console.error("error submit kategori:", err);
        }
    };

    const handleEditKategori = (kat) => {
        selectedKategori(kat);
        setKategoriForm({ nama: kat.nama});
    };

    const handleDeleteKategori = async (id) => {
        if (!window.confirm("yakin ingin menghapus kategori ini?")) 
            return ;
        await deleteKategori(id);
        loadData();
    };

    const handleSubmitTag = async (e) => {
        e.preventDefault();
        try {
            if (selectedTag) {
                await upadateTag(selectedTag.id,tagForm.nama);
            } else {
                await createTag(tagForm.nama);
            }
            resetFormTag();
            setSelectedTag(null);
            loadData();
        } catch (err) {
            console.error("error submit tag:", err);
        }
    };

    const handleEditTag = (tag) => {
        setSelectedTag(tag);
        setTagForm({ nama: tag.nama });
    };

    const handleDeleteTag = async (id) => {
        if (!window.confirm("yakin ingin menghapus tag ini?"))
            return;
        await deleteTag(id);
        loadData();
    };

    return (
        <div className="min-h-screen bg-black p-8 font-sans text-white">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* {Headers} */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashbord admin</h1>
                    <button
                    onClick={() => {
                        logout();
                        if (typeof onLogout === "function") onLogout();
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg transition">Logout</button>
                </div>
                {errorMsg && <p className="text-red-600">{errorMsg}</p>}
            </div>
            {/* {Form kategori} */}
            <div className="bg-black p-6 rounded-xl shadow border">
                <h2 className="text-lg font-semibold mb-4">
                    {selectedKategori ? "EditKategori": "Tambah Kategori"}
                </h2>
                <form onSubmit={handleSubmitKategori}
                className="flex space-x-2">
                    <input 
                    type="text"
                    value={kategoriForm.nama}
                    onChange={(e) => selectedKategori({...kategoriForm,nama: e.target.value })}
                    placeholder="nama kategori"
                    className="w-full border px-3 py-2 rounded text-black"required>
                    </input>
                    <button 
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-lg">
                        {selectedKategori ? "update": "simpan"}
                    </button>
                    {selectedKategori && (
                        <button
                        type="button"
                        onClick={() => {
                            setSelectedKategori(null);
                            resetFormKategori();
                        }}
                        className="bg-black text-white px-4 py-2 rounded-lg">Batal</button>
                    )}
                </form>
            </div>

            {/* {tabel kategori} */}
            <div className="bg-white p-6 rounded-xl shadow border text-black">
                <h2 className="text-lg font-semibold mb-4">Daftar Kategori</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : kategoriList.length === 0 ?
                (
                    <p className="text-gray-500">Belum Ada Kategori</p>
                ) : (
                    <ul className="space-y-2">{kategoriList.map((k) => ( 
                        <li key={k.id} className="flex justify-between items-center">
                            <span>{k.nama}</span>
                            <div className="space-2">
                                <button
                                onClick={() => handleEditKategori(k)}
                                className="px-3 py-1 text-sm bg-black text-white rounded">Edit</button>
                                <button
                                onClick={() => handleDeleteKategori(k.id)}
                                className="px-3 py-1 text-sm bg-black text-white rounded">Hapus</button>
                            </div>
                        </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* form tag */}
            <div className="bg-black p-y rounded-xl shadow border">
                <h2 className="text-lg font-semibold mb-4">
                    {selectedTag ? "edit tag" : "Tambah tag"}
                </h2>
                <form onSubmit={handleSubmitTag}
                className="flex space-x-2">
                    <input
                    type="text"
                    value={tagForm.nama}
                    onChange={(e) => setTagForm({ ... tagForm, nama: e.target.value})}
                    placeholder="Nama Tag" className="w-full border px-3 py-2 rounded text-black"required></input>
                    <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-lg">{selectedTag ? "update" : "simpan"}</button>
                    {selectedTag && ( 
                        <button
                        type="button"
                        onClick={() => {
                            setSelectedTag(null); 
                            resetFormTag();
                        }}
                        className="bg-black text-white px-4 py-2 rounded-lg">Batal</button>
                    )}
                </form>
            </div>

            {/* Table tag */}
            <div className="bg-white p-6 rounded-xl shadow border text-black">
                <h2 className="text-lg font-semibold mb-4">Daftar Tag</h2>
                {loading ? (
                    <p>loading....</p>
                ) : tagList.length === 0 ?
                (
                    <p className="text-gray-500">Belum ada tag</p>
                ) : (
                    <ul className="space-y-2">
                        {tagList.map((t) => (
                            <li key={k.id} className="flex justify-between items-center">
                                <span>{t.nama}</span>
                                <div className="space-2">
                                    <button
                                    onClick={() => handleEditTag(t)} 
                                    className="px-3 py-1 text-sm bg-black text-white rounded">Edit</button>
                                    <button 
                                    onClick={() => handleDeleteTag(t.id)} 
                                    className="px-3 py-1 text-sm bg-black text-white rounded">Hapus</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
