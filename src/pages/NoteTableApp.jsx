import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TableForm from '../components/TableForm';
import NoteTable from '../components/NoteTable';
import TableFilter from '../components/TableFilter';

const NoteTableApp = () => {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');

  const addNote = (note) => {
    const newID = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
    setNotes([...notes, { id: newID, ...note }]);
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

  const filteredNotes = notes
    .filter((note) => {
      if (!filterKeyword) return true;

      const keyword = filterKeyword.toLowerCase();

      return (
        note.id.toString().includes(keyword) ||
        note.nama.toLowerCase().includes(keyword) ||
        note.category.toLowerCase().includes(keyword) ||
        note.price.toString().includes(keyword) ||
        note.date.includes(keyword)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-6">
        <TableForm
          addNote={addNote}
          editNote={editNote}
          updateNote={updateNote}
        />
        <TableFilter
          setFilterKeyword={setFilterKeyword}
          setSortBy={setSortBy}
        />
        <NoteTable
          notes={filteredNotes}
          onDelete={deleteNote}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
};

export default NoteTableApp;
