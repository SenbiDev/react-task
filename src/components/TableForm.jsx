import React, { useState, useEffect } from 'react';

const TableForm = ({ addNote, editNote, updateNote }) => {
  const [formData, setFormData] = useState({
    nama: '',
    category: '',
    price: '',
    date: '',
  });

  useEffect(() => {
    if (editNote) setFormData(editNote);
    else setFormData({ nama: '', category: '', price: '', date: '' });
  }, [editNote]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.category || !formData.price || !formData.date) return;
    editNote ? updateNote(formData) : addNote(formData);
    setFormData({ nama: '', category: '', price: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">{editNote ? 'Edit' : 'Tambah'} Daftar</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama" className="p-3 rounded bg-[#2A2A2A] text-white" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Kategori" className="p-3 rounded bg-[#2A2A2A] text-white" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Harga" className="p-3 rounded bg-[#2A2A2A] text-white" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} className="p-3 rounded bg-[#2A2A2A] text-white" />
      </div>
      <button type="submit" className="mt-4 !bg-[#f8f8fc] px-6 py-2 rounded-full font-bold">
        {editNote ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default TableForm;