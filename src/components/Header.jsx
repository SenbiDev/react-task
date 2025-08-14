const Header = () => (
    <header className="bg-gray-900 p-4">
        <h1 className="p-4 text-center text-2xl font-bold text-white">Data</h1>
        <nav className="bg-gray-800 bg-opacity-90 shadow-md p-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-2 mx-auto">
                    <label htmlFor="searchKategori" className="text-sm font-medium">Cari Kategori:</label>
                    <input
                        type="search"
                        id="searchKategori"
                        placeholder="Cari Kategori..."
                        className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium">Urutkan:</label>
                    <select
                        id="sort"
                        value={sortOpition}
                        onChange={onSortOption}
                        className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                        <option value="">Pilih</option>
                        <option value="tanggal-terlama">Tanggal Terlama</option>
                        <option value="tanggal-terbaru">Tanggal Terbaru</option>
                        <option value="harga-termurah">Harga Termurah</option>
                        <option value="harga-termahal">Harga Terbaru</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
            </div>
        </nav>
    </header>
)

export default Header;