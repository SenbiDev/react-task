import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import ArtikelForm from "../components/ArtikelForm";
import ArtikelList from "../components/ArtikelList";
import KategoriTags from "../components/KategoriTags";

import {
  usePublicArticles,
  useMyArticles,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from "../hooks/artikel";
import {
  useKategoriList,
  useCreateKategori,
  useUpdateKategori,
  useDeleteKategori,
} from "../hooks/kategori";
import {
  useTagList,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "../hooks/tags";

export default function ArtikelApi() {
  const { user } = useAuth();
  const role = user?.role || "user";

  const { data: publicArtikel = [] } = usePublicArticles();
  const { data: myArtikel = [] } = useMyArticles();
  const { data: kategoriList = [] } = useKategoriList();
  const { data: tagList = [] } = useTagList();

  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();

  const createKategori = useCreateKategori();
  const updateKategori = useUpdateKategori();
  const deleteKategori = useDeleteKategori();

  const createTag = useCreateTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();

  const [artikelEdit, setArtikelEdit] = useState(null);

  const handleSaveArtikel = async (payloadFromForm) => {
    const payload = { ...payloadFromForm, penulis_id: user?.id };
    if (artikelEdit?.id) {
      await updateArticle.mutateAsync({ id: artikelEdit.id, data: payload });
      alert("Artikel berhasil diupdate");
    } else {
      await createArticle.mutateAsync(payload);
      alert("Artikel berhasil dibuat");
    }
    setArtikelEdit(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus artikel ini?")) return;
    await deleteArticle.mutateAsync(id);
    alert("Artikel dihapus");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Dashboard ({role})</h2>

      {/* Form Artikel */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {artikelEdit ? "Edit Artikel" : "Tambah Artikel"}
        </h3>
        <ArtikelForm
          kategori={kategoriList}
          tags={tagList}
          artikelEdit={artikelEdit}
          onSubmit={handleSaveArtikel}
          onCancel={() => setArtikelEdit(null)}
        />
      </div>

      {/* Admin: Kategori & Tags */}
      {role === "admin" && (
        <KategoriTags
          kategori={kategoriList}
          tags={tagList}
          onCreateKategori={(nama) => createKategori.mutateAsync(nama)}
          onUpdateKategori={(id, nama) =>
            updateKategori.mutateAsync({ id, nama })
          }
          onDeleteKategori={(id) => deleteKategori.mutateAsync(id)}
          onCreateTag={(nama) => createTag.mutateAsync(nama)}
          onUpdateTag={(id, nama) => updateTag.mutateAsync({ id, nama })}
          onDeleteTag={(id) => deleteTag.mutateAsync(id)}
        />
      )}

      {/* Artikel Saya */}
      <ArtikelList
        artikel={myArtikel}
        onEdit={setArtikelEdit}
        onDelete={handleDelete}
        isMyList={true}
      />

      {/* Artikel Publik */}
      {role === "admin" && (
        <ArtikelList
          artikel={publicArtikel}
          onEdit={setArtikelEdit}
          onDelete={handleDelete}
          isMyList={false}
        />
      )}
    </div>
  );
}