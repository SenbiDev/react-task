const EditCatatan = () => (
    <main className="p-6">
        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="judul" className="blockk text-sm font-medium text-gray-200">
                        Judul Catatan
                    </label>
                    <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-yellow-500"
                    placeholder="Judul Catatan"
                    defaultValue="Judul sebelumnya"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="isi" className="blockk text-sm font-medium text-gray-700 mb-1">
                        Isi Catatan
                    </label>
                    <textarea
                    rows="6"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-yellow-500"
                    placeholder="Isi Catatan"
                    defaultValue="Isi sebelumnya"/>
                </div>
                <div className="flex justify-between">
                    <a href="/home" className=" bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Kembali</a>
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-800">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </main>
);

export default EditCatatan;