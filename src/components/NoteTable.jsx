import React from 'react';

const NoteTable = ({ notes, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left !text-white">
        <thead>
          <tr className="bg-[#333]">
            <th className="p-3">ID</th>
            <th className="p-3">Nama</th>
            <th className="p-3">Kategori</th>
            <th className="p-3">Harga</th>
            <th className="p-3">Tanggal</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id} className="border-b border-[#444] !text-white">
              <td className="p-3">{note.id}</td>
              <td className="p-3">{note.nama}</td>
              <td className="p-3">{note.category}</td>
              <td className="p-3">Rp{note.price}</td>
              <td className="p-3">{note.date}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => onEdit(note)} className="!bg-[#f8f3f3] !text-black px-4 py-1 rounded-full text-sm">Edit</button>
                <button onClick={() => onDelete(note.id)} className="!bg-[#f8f3f3] !text-black px-4 py-1 rounded-full text-sm">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteTable;