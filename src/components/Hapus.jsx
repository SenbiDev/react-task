const Hapus = ({tampilkan, tidak, iya, pesan = "Yakin Ingin Menghapus"}) => {
    if(!tampilkan) return null;

    return(
        <div className="fixed inset-0 dlex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">{pesan}</h3>
                <div className="flex justify-end space-x-3">
                    <button onClick={tidak} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
                    <button onClick={iya} className="bg-red-300 px-4 py-2 rounded hover:bg-red-600">Hapus</button>
                </div>
            </div>
        </div>
    );
};

export default Hapus;