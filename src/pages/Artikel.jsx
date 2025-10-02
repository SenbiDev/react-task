import * as artikel from "../hooks/artikel";
import { useAuth } from "../auth/authContext";
import { useKategori, useTags } from "../hooks/admin";
import { useNavigate } from "react-router-dom";
import { useArtikelStore } from "../store/useArtikelStore";
import { EyeIcon, FileText, PencilIcon, Trash2Icon } from "lucide-react";

export default function ArtikelPage() {

const judul = useArtikelStore((state) => state.judul)
const setJudul = useArtikelStore((state) => state.setJudul)
const konten = useArtikelStore((state) => state.konten)
const setKonten = useArtikelStore((state) => state.setKonten)
const kategori = useArtikelStore((state) => state.kategori)
const setKategori = useArtikelStore((state) => state.setKategori)
const tags = useArtikelStore((state) => state.tags)
const setTags = useArtikelStore((state) => state.setTags)
const status = useArtikelStore((state) => state.status)
const setStatus = useArtikelStore((state) => state.setStatus)
const createArt = useArtikelStore((state) => state.createArt)
const deleteArt = useArtikelStore((state) => state.deleteArt)
const startEdit = useArtikelStore((state) => state.startEdit)
const updateArt = useArtikelStore((state) => state.updateArt)
const resForm = useArtikelStore((state) => state.resForm)
const editingId = useArtikelStore((state) => state.editingId)
const arts = useArtikelStore((state) => state.arts)

  const {user, logout} = useAuth();
  const role = user?.role || "";
  const navigate = useNavigate();

  const { data: myArtikel = [] } = artikel.useMyArtikels();
  const { data: publikArtikel = [] } = artikel.usePublikArtikels(role === "admin");
  const { data: kategoriList = [] } = useKategori();
  const { data: tagList = [] } = useTags();

  const createArtikel = artikel.useCreateArtikel();
  const updateArtikel = artikel.useUpdateArtikel();
  const deleteArtikel = artikel.useDeleteArtikel();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {judul, konten, kategori_id:kategori, tag_ids:tags, status};

    try {
      if (editingId) {
        updateArtikel.mutate({id: editingId, payload});
        updateArt();
        alert("Artikel berhasil diupdate")
      } else {
        createArtikel.mutate(payload);
        createArt();
        alert("Artikel berhasil dibuat")
      }
      resForm();
    } catch (err) {
      console.error("Gagal simpan artikel", err);
      alert(err.message || "Gagal simpan artikel")
    }
  };

  const handleEdit = (artikel) => {
    startEdit(artikel);
    navigate("/create")
    // if (!artikel) return;
    // editingId(artikel.id);
    // setJudul(artikel.judul||"");
    // setKonten(artikel.konten||"");
    // setKategori(artikel.kategori?.id || "");
    // setTags(artikel.tags?.map((t) => t.id) || []);
    // setStatus(artikel.status|| "draft");
  };

  // const resetForm = () => {
  //   editingId("");
  //   setJudul("");
  //   setKonten("");
  //   setKategori("");
  //   setTags([]);
  //   setStatus("draft");
  // };


  const handleDelete = (id) => {
    if (window.confirm("Hapus artikel ini?")){
      deleteArtikel.mutate(id);
      deleteArt(id);
    }
  }

  const handleLogOut = () => {
    logout();
    navigate("/login")
  }
  // useEffect(() => {
  //     const token = localStorage.getItem("access");
  //     const savedRole = localStorage.getItem("role");
  //     if (token) {
  //       setIsLogin(true);
  //       if (savedRole) {
  //         setRole(savedRole);
  //         loadData(savedRole);
  //       }
  //     }
  //   }, []);
    
  //   const loadData = async (role) => {
  //     try {
  //       const mine = await getMyArtikels();
  //       setMyArtikel(mine);

  //       const kat = await getKategori();
  //       setKategoriList(kat);
        
  //       const tg = await getTags();
  //       setTagList(tg);

  //       if (role === "admin") {
  //         const pub = await getPublikArtikels();
  //         setPublikArtikel(pub);
  //       }

  //     } catch (err) {
  //       console.error("Gagal load data:", err);
  //     }
  //   };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const payload = {
  //       judul,
  //       konten,
  //       status,
  //       kategori_id: kategori,
  //       tag_ids: tags,
  //     };
  //     if (editingId) {
  //       await updateArtikel(editingId, payload);
  //       alert("Artikel berhasil diupdate");
  //     } else {
  //       await createArtikel(payload);
  //       alert("Artikel berhasil dibuat");
  //     }
  //     resetForm();
  //     loadData();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Yakin hapus artikel ini?")) return;
  //   try {
  //     await deleteArtikel(id);
  //     alert("Artikel dihapus");
  //     loadData();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  // const handleEdit = (artikel) => {
  //   setEditingId(artikel.id);
  //   setJudul(artikel.judul);
  //   setKonten(artikel.konten);
  //   setStatus(artikel.status);
  //   setKategori(artikel.kategori?.id || "");
  //   setTags(artikel.tags?.map((t) => t.id) || []);
  // };

  // const resetForm = () => {
  //   setEditingId(null);
  //   setJudul("");
  //   setKonten("");
  //   setStatus("draft");
  //   setKategori("");
  //   setTags([]);
  // };
  
  return (
        <div className="min-h-screen bg-gray-900 font-sans p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <h1 className="text-xl font-semibold text-white">Selamat datang</h1>
                    <div className="space-x-2">
                      {/* {role === "admin" && (
                        <button
                          onClick={() => navigate("/create")}
                          className="flex gap-2 bg-gray-700 text-white px-3 py-1 rounded"
                        >
                          <FileText/> Create
                        </button>
                      )} */}
                      <span
                        onClick={() => navigate("/create")}
                        className="flex gap-2 bg-gray-800 text-blue-700 font-semibold px-3 py-1.5 rounded"
                      >
                        <FileText/> Create
                      </span>
                    </div>
                  </div>
                <div className="bg-gray-800 p-6 border border-gray-300 rounded shadow-sm mb-8">
                    <h3 className="mb-4 text-lg text-white font-medium">{editingId ? "Edit Artikel" : "Buat Artikel"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-100">Judul</label>
                            <input
                                placeholder="Judul"
                                value={judul}
                                onChange={e => setJudul(e.target.value)}
                                className="text-gray-100 w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-100">Konten</label>
                            <textarea
                                placeholder="Isi konten..."
                                value={konten}
                                onChange={e => setKonten(e.target.value)}
                                className="text-gray-100 w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-100">Kategori</label>
                            <select
                                value={kategori}
                                onChange={e => setKategori(e.target.value)}
                                required
                                className="text-gray-100 w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="" className="text-black">Kategori</option>
                                {kategoriList.map((k) => (
                                    <option key={k.id} value={k.id} className="text-gray-100">
                                        {k.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <p className="block mb-1 font-medium text-gray-100">Tag</p>
                            <div className="grid grid-cols-2 gap-2">
                                {tagList.map((t) => (
                                <label key={t.id} className="flex justify-center space-x-2">  
                                    <input
                                        type="checkbox"
                                        checked={tags.includes(t.id)}
                                        onChange={(e) => {
                                        if (e.target.checked) setTags([...tags, t.id]);
                                        else setTags(tags.filter((id) => id !== t.id));
                                        }}
                                    />
                                    <span className="text-gray-100">{t.nama}</span>
                                </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-100">Status</label>
                            <select
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                required
                                className="text-gray-100 w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="draft" className="text-black">Draft</option>
                                <option value="published" className="text-black">Published</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            {editingId ? "Update" : "Create"}
                        </button>
                    </form>
                </div>
                <div className="bg-gray-800 p-6 border border-gray-300 rounded shadow-sm">
                    <h3 className="mb-4 text-lg text-gray-100 font-medium">Artikel Saya</h3>
                    {myArtikel.length === 0 ? (
                        <p className="text-gray-500">Belum ada artikel</p>
                    ) : (
                        <ul className="space-y-3">
                            {myArtikel.map((artikel) => (
                                <li key={artikel.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                    <div>
                                        <p className="font-medium text-gray-100">{artikel.judul}</p>
                                        <p className="text-sm text-gray-100">{artikel.status}</p>
                                    </div>
                                    <div className="flex justify-around space-x-2">
                                      <button
                                        onClick={() => navigate(`/artikel/${artikel.id}`)}
                                        className="text-blue-600 hover:underline text-sm"
                                      >
                                        <EyeIcon/>
                                      </button>
                                      <div className="space-x-2">
                                          <button
                                              onClick={() => handleEdit(artikel)}
                                              className="text-green-600 hover:underline text-sm"
                                          >
                                              <PencilIcon/>
                                          </button>
                                          <button
                                              onClick={() => handleDelete(artikel.id)}
                                              className="text-red-600 hover:underline text-sm"
                                          >
                                              <Trash2Icon/>
                                          </button>
                                      </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {role === "admin" && (
                <div className="bg-gray-800 p-6 border border-gray-300 rounded shadow-sm">
                  <h3 className="mb-4 text-lg text-gray-100 font-medium">Artikel Publik</h3>
                    {publikArtikel.length === 0 ? (
                      <p className="text-gray-500">Belum ada artikel publik.</p>
                    ) : (
                      <ul className="space-y-3">
                        {publikArtikel.map((a) => {
                          const user = JSON.parse(localStorage.getItem("user"));
                          const isOwner = user?.id === a.penulis?.id;
                          const isAdmin = user?.role === "admin";
                          return (
                            <li key={a.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                          <div>
                            <p className="font-medium text-gray-100">{a.judul}</p>
                            {/* <p className="text-sm text-black">{a.konten}</p> */}
                            <p className="text-sm text-gray-100 mt-1">
                              Penulis: {a.penulis?.username || "-"} | Kategori:{" "}
                              {a.kategori?.nama || "-"} | Tags:{" "}
                              {a.tags?.map((t) => t.nama).join(", ") || "-"}
                            </p>
                          </div>
                          <div className="flex justify-around space-x-2">
                                <button
                                  onClick={() => navigate(`/artikel/${a.id}`)}
                                  className="text-blue-600 hover:underline text-sm"
                                >
                                  <EyeIcon/>
                                </button>
                                <div className="space-x-2">
                                  <button
                                    onClick={() => handleEdit(a)}
                                    className="text-green-600 hover:underline text-sm"
                                  >
                                    <PencilIcon/>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(a.id)}
                                    className="text-red-600 hover:underline text-sm"
                                  >
                                    <Trash2Icon/>
                                  </button>
                                </div>
                          </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </div>
              )}
            </div>
        </div>
    );
}