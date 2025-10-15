// import { useState, useEffect } from "react"
// import { useArtikelStore } from "../store/useArtikelStore"
// import { useKategoriStore } from "../store/useKategoriStore"
// import { useTagStore } from "../store/useTagStore"

// export default function ArtikelForm() {
//   const { artikelEdit, clearArtikelEdit, addArtikel, updateArtikel } = useArtikelStore()
//   const { kategori, fetchKategori } = useKategoriStore()
//   const { tags, fetchTags } = useTagStore()

//   const [judul, setJudul] = useState("")
//   const [konten, setKonten] = useState("")
//   const [status, setStatus] = useState("draft")
//   const [kategoriId, setKategoriId] = useState("")
//   const [tagIds, setTagIds] = useState([])
//   const [errors, setErrors] = useState({})

//   // 🔹 Load kategori & tags saat mount
//   useEffect(() => {
//     fetchKategori()
//     fetchTags()
//   }, [fetchKategori, fetchTags])

//   const resetForm = () => {
//     setJudul("")
//     setKonten("")
//     setStatus("draft")
//     setKategoriId("")
//     setTagIds([])
//     setErrors({})
//   }

//   // 🔹 Prefill form kalau artikelEdit ada
//   useEffect(() => {
//     if (artikelEdit) {
//       setJudul(artikelEdit.judul || "")
//       setKonten(artikelEdit.konten || "")
//       setStatus(artikelEdit.status || "draft")
//       setKategoriId(artikelEdit.kategori?.id || "")
//       setTagIds(artikelEdit.tags?.map((t) => t.id) || [])
//     } else {
//       resetForm()
//     }
//   }, [artikelEdit])

//   const validateForm = () => {
//     const newErrors = {}
//     if (!judul.trim()) newErrors.judul = "Judul wajib diisi"
//     if (!konten.trim()) newErrors.konten = "Konten wajib diisi"
//     if (!kategoriId) newErrors.kategori = "Kategori wajib dipilih"
//     if (tagIds.length === 0) newErrors.tags = "Minimal pilih 1 tag"
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateForm()) return

//     const payload = {
//       judul,
//       konten,
//       status,
//       kategori_id: Number(kategoriId),
//       tag_ids: tagIds.map(Number),
//     }

//     try {
//       if (artikelEdit) {
//         await updateArtikel(artikelEdit.id, payload)
//         clearArtikelEdit()
//       } else {
//         await addArtikel(payload)
//       }
//       resetForm()
//     } catch (err) {
//       console.error("Gagal simpan artikel:", err)
//       alert("Terjadi kesalahan saat menyimpan artikel")
//     }
//   }

//   const toggleTag = (id) => {
//     setTagIds((prev) =>
//       prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
//     )
//   }

//   return (
//     <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         {/* Judul */}
//         <div>
//           <input
//             type="text"
//             placeholder="Judul"
//             value={judul}
//             onChange={(e) => setJudul(e.target.value)}
//             className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
//           />
//           {errors.judul && <p className="text-red-400 text-sm">{errors.judul}</p>}
//         </div>

//         {/* Konten */}
//         <div>
//           <textarea
//             placeholder="Konten"
//             value={konten}
//             onChange={(e) => setKonten(e.target.value)}
//             className="p-2 rounded bg-gray-800 border border-gray-600 min-h-[100px] w-full"
//           />
//           {errors.konten && <p className="text-red-400 text-sm">{errors.konten}</p>}
//         </div>

//         {/* Status */}
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="p-2 rounded bg-gray-800 border border-gray-600"
//         >
//           <option value="draft">Draft</option>
//           <option value="published">Published</option>
//         </select>

//         {/* Kategori */}
//         <div>
//           <select
//             value={kategoriId}
//             onChange={(e) => setKategoriId(e.target.value)}
//             className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
//           >
//             <option value="">Pilih Kategori</option>
//             {kategori?.map((k) => (
//               <option key={k.id} value={k.id}>
//                 {k.nama}
//               </option>
//             ))}
//           </select>
//           {errors.kategori && <p className="text-red-400 text-sm">{errors.kategori}</p>}
//         </div>

//         {/* Tags */}
//         <div>
//           <p className="mb-2 font-medium">Pilih Tags:</p>
//           <div className="flex flex-wrap gap-2">
//             {tags?.map((t) => (
//               <label key={t.id} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={tagIds.includes(t.id)}
//                   onChange={() => toggleTag(t.id)}
//                 />
//                 <span>{t.nama}</span>
//               </label>
//             ))}
//           </div>
//           {errors.tags && <p className="text-red-400 text-sm">{errors.tags}</p>}
//         </div>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//           >
//             {artikelEdit ? "Update" : "Simpan"}
//           </button>
//           {artikelEdit && (
//             <button
//               type="button"
//               onClick={() => {
//                 clearArtikelEdit()
//                 resetForm()
//               }}
//               className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
//             >
//               Batal
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   )
// }