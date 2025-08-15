export default function Navigation ({ searchKategori, setSearchKategori, searchby, setSearchBy, sort, setSort}) {
    return (
        <nav className="bg-gray-800 bg-opacity-90 shadow-md p-4">
            <div className="flex justify-between items-center flex-wrap md:flex-nowrap gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="searchKategori" className="text-sm font-medium">Cari Kategori:</label>
                    <select
                        id="searchBy"
                        value={searchby}
                        onChange={(e) => setSearchBy(e.target.value)}
                        className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600">
                    <option value="">Pilih ↓</option>
                    <option value="nama">Nama</option>
                    <option value="kategori">Kategori</option>
                    <option value="harga">Harga</option>
                    <option value="tanggal">Tanggal</option>
                    </select>
                    <input
                        type="search"
                        id="searchKategori"
                        placeholder="Cari Kategori..."
                        value={searchKategori}
                        onChange={(e) => setSearchKategori(e.target.value)}
                        className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium">Urutkan:</label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                        <option value="">Pilih ↓</option>
                        <option value="id asc">ID↑</option>
                        <option value="id desc">ID↓</option>
                        <option value="tanggal-terlama">Tanggal Terlama</option>
                        <option value="tanggal-terbaru">Tanggal Terbaru</option>
                        <option value="harga-termurah">Harga Termurah</option>
                        <option value="harga-termahal">Harga Termahal</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
            </div>
        </nav>
    )
}