import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

const BuatCatatan = () => {
    const navigate = useNavigate();
    const [showconfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);
        navigate('/');
    };

    return(
        <main className="p-6">
            <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="judul" className="blockk text-sm font-medium text-gray-200">
                            Judul Catatan
                        </label>
                        <input
                        type="text"
                        id="judul"
                        name="judul"
                        placeholder="Masukan Judul Catatan"
                        className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring focus:border-yellow-500" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="isi" className="blockk text-sm font-medium text-gray-700 mb-1">
                            Isi Catatan
                        </label>
                        <textarea
                        id="isi"
                        name="isi"
                        rows="6"
                        placeholder="Isi catatan di sini..."
                        className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring focus:border-yellow-500" required></textarea>
                    </div>

                    {showconfirm && (
                        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded shadow-md text-center max-w-sm">
                                <p className="mb-4">Yakin ingin menyimpan catatan ini?</p>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setShowConfirm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
                                    <button type="submit" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">Ya, Simpan</button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
};

export default BuatCatatan;