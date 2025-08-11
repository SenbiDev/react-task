import React from 'react';

const TableFilter = ({ setFilterField, setFilterValue, setSortBy }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <select
        onChange={(e) => setFilterField(e.target.value)}
        className="p-3 rounded bg-[#2A2A2A] text-white w-full md:w-1/4"
      >
        <option value="">Pilih Kolom Filter</option>
        <option value="id">ID</option>
        <option value="nama">Nama</option>
        <option value="category">Kategori</option>
        <option value="price">Harga</option>
        <option value="date">Tanggal</option>
      </select>

      <input
        type="text"
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Masukkan nilai pencarian..."
        className="p-3 rounded bg-[#2A2A2A] text-white w-full md:w-1/4"
      />

      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="p-3 rounded bg-[#2A2A2A] text-white w-full md:w-1/4"
      >
        <option value="">Urutkan...</option>
        <option value="id-asc">ID (Kecil → Besar)</option>
        <option value="id-desc">ID (Besar → Kecil)</option>
        <option value="nama-asc">Nama (A → Z)</option>
        <option value="nama-desc">Nama (Z → A)</option>
        <option value="category-asc">Kategori (A → Z)</option>
        <option value="category-desc">Kategori (Z → A)</option>
        <option value="price-asc">Harga (Murah → Mahal)</option>
        <option value="price-desc">Harga (Mahal → Murah)</option>
        <option value="date-asc">Tanggal (Terlama → Terbaru)</option>
        <option value="date-desc">Tanggal (Terbaru → Terlama)</option>
      </select>
    </div>
  );
};

export default TableFilter;
