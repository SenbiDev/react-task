import React from "react";
import {
  useKategoriList,
  useCreateKategori,
  useUpdateKategori,
  useDeleteKategori,
} from "../hooks/useKategoriQuery";
import {
  useTagsList,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "../hooks/useTagsQuery";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../store/adminStore";

export default function AdminPage() {
  const navigate = useNavigate();

  const { data: kategoriList = [], isLoading: loadingKategori } = useKategoriList();
  const { data: tagList = [], isLoading: loadingTag } = useTagsList();

  const { mutate: createKategori } = useCreateKategori();
  const { mutate: updateKategori } = useUpdateKategori();
  const { mutate: deleteKategori } = useDeleteKategori();

  const { mutate: createTag } = useCreateTag();
  const { mutate: updateTag } = useUpdateTag();
  const { mutate: deleteTag } = useDeleteTag();

const {
  selectedKategori,
  kategoriForm,
  setSelectedKategori,
  setKategoriForm,
  resetKategori,

  selectedTag,
  tagForm,
  setSelectedTag,
  setTagForm,
  resetTag,
} = useAdminStore();

  const handleSubmitKategori = (e) => {
    e.preventDefault();
    if (!kategoriForm.nama.trim()) return;
    if (selectedKategori) {
      updateKategori({ id: selectedKategori.id, nama: kategoriForm.nama.trim() });
    } else {
      createKategori(kategoriForm.nama.trim());
    }
    resetKategori();
  };

  const handleSubmitTag = (e) => {
    e.preventDefault();
    if (!tagForm.nama.trim()) return;
    if (selectedTag) {
      updateTag({ id: selectedTag.id, nama: tagForm.nama.trim() });
    } else {
      createTag(tagForm.nama.trim());
    }
    resetTag();
  };

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-black">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <div className="space-x-2">
            <button
              onClick={() => navigate("/artikel")}
              className="bg-black text-white px-4 py-2 rounded-lg border"
            >
              Kembali
            </button>
          </div>
        </div>

        {/* Form Kategori */}
        <div className="bg-white p-6 rounded-xl shadow border mt-6">
          <h2 className="text-lg font-semibold mb-4">
            {selectedKategori ? "Edit Kategori" : "Tambah Kategori"}
          </h2>
          <form onSubmit={handleSubmitKategori} className="flex space-x-2">
            <input
              type="text"
              value={kategoriForm.nama}
              onChange={(e) => setKategoriForm({ nama: e.target.value })}
              placeholder="Nama kategori"
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg border">
              {selectedKategori ? "Update" : "Simpan"}
            </button>
            {selectedKategori && (
              <button
                type="button"
                onClick={() => setSelectedKategori(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg border"
              >
                Batal
              </button>
            )}
          </form>
        </div>

        {/* Tabel Kategori */}
        <div className="bg-white p-6 rounded-xl shadow border text-black mt-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Kategori</h2>
          {loadingKategori ? (
            <p>Loading...</p>
          ) : kategoriList.length === 0 ? (
            <p className="text-gray-500">Belum ada kategori</p>
          ) : (
            <ul className="space-y-2">
              {kategoriList.map((k) => (
                <li key={k.id} className="flex justify-between items-center">
                  <span>{k.nama}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setSelectedKategori(k);
                        setKategoriForm({ nama: k.nama });
                      }}
                      className="px-3 py-1 text-sm bg-black text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteKategori(k.id)}
                      className="px-3 py-1 text-sm bg-black text-white rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Form Tag */}
        <div className="bg-white p-6 rounded-xl shadow border mt-6">
          <h2 className="text-lg font-semibold mb-4">
            {selectedTag ? "Edit Tag" : "Tambah Tag"}
          </h2>
          <form onSubmit={handleSubmitTag} className="flex space-x-2">
            <input
              type="text"
              value={tagForm.nama}
              onChange={(e) => setTagForm({ nama: e.target.value })}
              placeholder="Nama tag"
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg border">
              {selectedTag ? "Update" : "Simpan"}
            </button>
            {selectedTag && (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg border"
              >
                Batal
              </button>
            )}
          </form>
        </div>

        {/* Tabel Tag */}
        <div className="bg-white p-6 rounded-xl shadow border text-black mt-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Tag</h2>
          {loadingTag ? (
            <p>Loading...</p>
          ) : tagList.length === 0 ? (
            <p className="text-gray-500">Belum ada tag</p>
          ) : (
            <ul className="space-y-2">
              {tagList.map((t) => (
                <li key={t.id} className="flex justify-between items-center">
                  <span>{t.nama}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTag(t);
                        setTagForm({ nama: t.nama });
                      }}
                      className="px-3 py-1 text-sm bg-black text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTag(t.id)}
                      className="px-3 py-1 text-sm bg-black text-white rounded"
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
