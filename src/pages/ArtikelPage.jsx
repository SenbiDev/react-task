import { useArtikelStore } from "../store/artikelStore";
import {
  useArticles,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from "../hooks/useArtikelQuery";
import { useTagsList } from "../hooks/useTagsQuery";
import { useKategoriList } from "../hooks/useKategoriQuery";
import { useNavigate } from "react-router-dom";

export default function ArtikelPage() {
  const { form, setForm, resetForm, selected, setSelected } = useArtikelStore();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const role = currentUser?.role || "user";
  const navigate = useNavigate();

  const { data: artikels = [], isLoading } = useArticles();
  const { data: kategoriList = [] } = useKategoriList();
  const { data: tagList = [] } = useTagsList();
  const { mutate: createArticle } = useCreateArticle();
  const { mutate: updateArticle } = useUpdateArticle();
  const { mutate: deleteArticle } = useDeleteArticle();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      judul: form.judul,
      konten: form.konten,
      kategori_id: form.kategori_id,
      tag_ids: form.tag_ids,
      status: form.status,
    };

    if (selected) {
      updateArticle({ id: selected.id, data: payload });
    } else {
      createArticle(payload);
    }
    resetForm();
  };

  const handleEdit = (artikel) => {
    setSelected(artikel);
    setForm({
      judul: artikel.judul,
      konten: artikel.konten,
      kategori_id: artikel.kategori?.id?.toString() || "",
      tag_ids: artikel.tags?.map((t) => t.id) || [],
      status: artikel.status,
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    deleteArticle(id);
  };

  const myArtikel = (artikels || []).filter(
    (a) => a.penulis?.id === currentUser?.id
  );
  const publicArtikel = (artikels || []).filter(
    (a) => a.status === "published"
  );

  const canManage = (artikel) =>
    role === "admin" || artikel.penulis?.id === currentUser?.id;

  return (
    <div className="min-h-screen bg-black p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard Artikel</h1>
          {role === "admin" && (
            <button
              onClick={() => navigate("/admin/")}
              className="!bg-white text-black px-4 py-2 rounded-lg"
            >
              Kelola Kategori & Tag
            </button>
          )}
        </div>

        {/* Form Artikel */}
        <div className="bg-white p-6 rounded-xl shadow border text-black">
          <h2 className="text-lg font-semibold mb-4">
            {selected ? "Edit Artikel" : "Tambah Artikel"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Judul */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Judul</label>
              <input
                type="text"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="w-full border px-3 py-2 rounded text-black"
                required
              />
            </div>

            {/* Konten */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Konten</label>
              <textarea
                value={form.konten}
                onChange={(e) => setForm({ ...form, konten: e.target.value })}
                className="w-full border px-3 py-2 rounded text-black"
                rows="4"
                required
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block mb-1 font-medium">Kategori</label>
              <select
                value={form.kategori_id}
                onChange={(e) =>
                  setForm({ ...form, kategori_id: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="">Pilih kategori</option>
                {(kategoriList || []).map((kat) => (
                  <option key={kat.id} value={kat.id}>
                    {kat.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag */}
            <div>
              <label className="block mb-1 font-medium">Tag</label>
              <div className="flex flex-wrap gap-4 text-black">
                {(tagList || []).map((tag) => (
                  <label key={tag.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={tag.id}
                      checked={form.tag_ids.includes(tag.id)}
                      onChange={(e) => {
                        const tagId = parseInt(e.target.value);
                        if (e.target.checked) {
                          setForm({
                            ...form,
                            tag_ids: [...form.tag_ids, tagId],
                          });
                        } else {
                          setForm({
                            ...form,
                            tag_ids: form.tag_ids.filter((t) => t !== tagId),
                          });
                        }
                      }}
                      className="w-4 h-4 rounded-full"
                    />
                    <span>{tag.nama}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Tombol */}
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                {selected ? "Update Artikel" : "Simpan Artikel"}
              </button>
              {selected && (
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    resetForm();
                  }}
                  className="ml-3 bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* My Artikel */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-4 text-black">My Artikel</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : myArtikel.length === 0 ? (
            <p className="text-gray-500">Belum ada artikel</p>
          ) : (
            <ArtikelTable
              data={myArtikel}
              canManage={canManage}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* Public Artikel - hanya admin */}
        {role === "admin" && (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Public Artikel
            </h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : publicArtikel.length === 0 ? (
              <p className="text-gray-500">Belum ada artikel publish</p>
            ) : (
              <ArtikelTable
                data={publicArtikel}
                canManage={canManage}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Tabel
function ArtikelTable({ data = [], canManage, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto text-black">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Judul</th>
            <th className="p-2 border">Konten</th>
            <th className="p-2 border">Penulis</th>
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">Tag</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id} className="hover:bg-gray-50">
              <td className="p-2 border">{a.judul}</td>
              <td className="p-2 border">{a.konten}</td>
              <td className="p-2 border">{a.penulis?.username || "-"}</td>
              <td className="p-2 border">{a.kategori?.nama || "-"}</td>
              <td className="p-2 border">
                {a.tags?.length > 0
                  ? a.tags.map((t) => t.nama).join(", ")
                  : "-"}
              </td>
              <td className="p-2 border">{a.status}</td>
              <td className="p-2 border space-x-2">
                {canManage(a) && (
                  <>
                    <button
                      onClick={() => onEdit(a)}
                      className="px-2 py-1 text-sm bg-black text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(a.id)}
                      className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                    >
                      Hapus
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
