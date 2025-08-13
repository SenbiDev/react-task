import { useState, useEffect } from "react";

export default function BuatCatatan({ addNote, updateNote, editNote }) {
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
    if (editNote){
        updateNote({ ...editNote, ...noteData });
    } else{
        addNote(noteData);
    }
    setTitle("");
    setContent("");
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-[#2A2A2A] text-white"
      />
      <textarea
        wrap="soft"
        spellCheck="false"
        placeholder="Isi catatan..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-[#2A2A2A] text-white h-32"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editNote ? "Update" : "Tambah"}
      </button>
    </form>
  );
}