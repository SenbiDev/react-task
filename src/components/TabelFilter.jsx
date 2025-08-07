export default function TabelFilter({ filter, onFilterChange, filterField, onFieldChange }) {
  return (
    <div className="flex gap-2 mb-4">
      <select value={filterField} onChange={(e) => onFieldChange(e.target.value)} className="border px-2 py-1">
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
        className="border p-1 flex-1"
      />
    </div>
  );
}