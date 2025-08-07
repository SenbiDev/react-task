import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import Footer from '../components/Footer';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  const addNote = (note) => {
    setNotes([...notes, { id: Date.now(), ...note }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditNote(null);
  };

  const handleEdit = (note) => {
    setEditNote(note);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-6">
        <NoteForm
          addNote={addNote}
          editNote={editNote}
          updateNote={updateNote}
        />
        <NoteList notes={notes} onDelete={deleteNote} onEdit={handleEdit} />
      </main>
      <Footer />
    </div>
  );
};

export default NoteApp;