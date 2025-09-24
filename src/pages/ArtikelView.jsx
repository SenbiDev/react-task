import { useParams, useNavigate } from "react-router-dom";
import { useArtikelById } from "../hooks/artikel";

export default function ArtikelView () {
    const navigate = useNavigate();
    const {id} = useParams();

    const { data : artikel, isLoading, isError, error} = useArtikelById(id);

    // useEffect(() => {
    //     const loadArtikel = async () => {
    //         setLoading(true);
    //         setError("");
    //         try {
    //             const data = await getArtikelById(id);
    //             setArtikel(data);
    //         } catch (err) {
    //             console.error("Gagal memuat artikel", err);
    //             setError("Gagal memuat artikel");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     loadArtikel();
    // }, [id]);

    if (isLoading) return <p className="p-4">Loading...</p>
    if (isError) return <p className="p-4">{error.message}</p>
    if (!artikel) return <p className="p-4">Artikel tidak ditemukan.</p>

    return (
        <div className="min-h-screen bg-gray-900 font-sans p-8">
            <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow">
                <h3 className="text-center text-2xl font-bold text-gray-100 mb-5">{artikel.judul}</h3>
                <div className="text-gray-100 mb-5">{artikel.konten}</div>
                <div className="flex gap-5 mb-3">
                    <div className="flex justify-around gap-2">
                        <p className="font-semibold text-gray-400">
                            Kategori :
                        </p>
                        <p className="font-bold text-gray-100">
                            {""}{artikel.kategori?.nama||"-"}
                        </p>
                    </div>
                    <div className="flex justify-around gap-2">
                        <p className="font-semibold text-gray-400">
                            Tag : 
                        </p>
                        <p className="font-bold text-gray-100 items-center">
                            #{artikel.tags?.map((t) => t.nama).join(" #")||"-"}
                        </p>
                    </div>
                </div>
                <div className="flex justify-baseline gap-2">
                    <p className="font-semibold text-gray-400">
                        Penulis :
                    </p>
                    <p className="font-bold text-gray-100 mb-4">
                        {artikel.penulis?.username||"-"}
                    </p>
                </div>
                    <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/artikel")}
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    )
}