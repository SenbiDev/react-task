import { useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  function handleAdd(note) {
    const newNote = {
      id: Date.now(),
      title: note.title,
      content: note.content,
    };
    setNotes([...notes, newNote]);
  }

  function handleUpdate(note) {
    const updated = notes.map((n) => {
      if (n.id === note.id) return note;
      return n;
    });
    setNotes(updated);
    setEditingNote(null);
  }

  function handleDelete(id) {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
  }

  function handleEdit(note) {
    setEditingNote(note);
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Catatan</h2>
      <NoteForm
        onSave={editingNote ? handleUpdate : handleAdd}
        note={editingNote}
      />
      <div className="mt-4 space-y-4">
        {notes.length === 0 && <p className="text-gray-600">Belum ada catatan.</p>}
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}