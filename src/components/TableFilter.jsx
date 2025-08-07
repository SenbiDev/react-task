import React from 'react';

const TableFilter = ({ setFilterKeyword, setSortBy }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <input
        type="text"
        onChange={(e) => setFilterKeyword(e.target.value)}
        placeholder="Cari berdasarkan id, nama, kategori, harga, atau tanggal..."
        className="p-3 rounded bg-[#2A2A2A] text-white w-full md:w-1/2"
      />
      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="p-3 rounded bg-[#2A2A2A] text-white w-full md:w-1/2"
      >
        <option value="">Urutkan...</option>
        <option value="price">Harga</option>
        <option value="date">Tanggal</option>
      </select>
    </div>
  );
};

export default TableFilter;
