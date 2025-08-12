export default function TabelFilter({ filter, onFilterChange, filterField, onFieldChange }) {
  return (
    <div className="flex gap-2 mb-4">
      <select value={filterField} onChange={(e) => onFieldChange(e.target.value)} className="bg-white border rounded px-2 py-1 text-black">
        <option value="nama">Nama</option>
        <option value="kategori">Kategori</option>
        <option value="harga">Harga</option>
        <option value="tanggal">Tanggal</option>
      </select>
      <input
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder={`Cari berdasarkan ${filterField}`}
        className="bg-white text-gray-500 border rounded p-1 flex-1"
      />
    </div>
  );
}