import React, { useState, useEffect } from 'react';

const NoteForm = ({ addNote, editNote, updateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    const noteData = { title, content };
    editNote ? updateNote({ ...editNote, ...noteData }) : addNote(noteData);
    setTitle('');
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editNote ? 'Edit Catatan' : 'Tambah Catatan'}
      </h2>
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-[#2A2A2A] text-white"
      />
      <textarea
        placeholder="Isi catatan..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-[#2A2A2A] text-white h-32"
      ></textarea>
      <button
        type="submit"
        className="bg-[#5A38EE] hover:bg-[#472cd0] px-6 py-2 rounded-full font-bold"
      >
        {editNote ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default NoteForm;