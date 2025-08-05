import React, { useState } from 'react';
import Navbar from './Navbar';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Footer from './Footer';

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
      <Navbar />
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