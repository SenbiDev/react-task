import { useState, useEffect } from 'react';

export default function NoteForm({ onSave, note }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  function handleSubmit(e) {
    e.preventDefault();

    // validasi manual (sebenarnya form HTML5 juga bisa)
    if (title.trim() === '' || content.trim() === '') {
      return;
    }

    const newNote = {
      id: note ? note.id : null,
      title: title,
      content: content,
    };

    onSave(newNote);
    setTitle('');
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <textarea
          placeholder="Isi catatan"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-black px-4 py-1 rounded hover:bg-blue-700 transition"
      >
        {note && note.id ? 'Simpan' : 'Tambah Catatan'}
      </button>
    </form>
  );
}