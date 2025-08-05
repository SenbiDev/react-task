import React from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <div className="bg-[#1F1F1F] p-4 rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold mb-2">{note.title}</h3>
        <p className="text-gray-300 whitespace-pre-line">{note.content}</p>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={() => onEdit(note)}
          className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-black"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-4 py-1 rounded-full text-sm font-semibold bg-red-600 text-white"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default NoteItem;