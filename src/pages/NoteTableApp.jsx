import React, { useState } from 'react';
import TableForm from '../components/TableForm';
import NoteTable from '../components/NoteTable';
import TableFilter from '../components/TableFilter';

const NoteTableApp = () => {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('');

  const addNote = (note) => {
    const newID = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
    setNotes([...notes, { id: newID, ...note, price: Number(note.price) || 0 }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setEditNote(null);
  };

  const handleEdit = (note) => {
    setEditNote(note);
  };

  const filteredNotes = notes
    .filter((note) => {
      if (!filterField || !filterValue) return true;
      const noteValue = String(note[filterField]).toLowerCase();
      return noteValue.includes(filterValue.toLowerCase());
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      const [field, order] = sortBy.split("-");

      let aVal = a[field];
      let bVal = b[field];

      if (field === "price" || field === "id") {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      }

      if (field === "date") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-6">
        <TableForm addNote={addNote} editNote={editNote} updateNote={updateNote} />
        <TableFilter
          setFilterField={setFilterField}
          setFilterValue={setFilterValue}
          setSortBy={setSortBy}
        />
        <NoteTable notes={filteredNotes} onDelete={deleteNote} onEdit={handleEdit} />
      </main>
    </div>
  );
};

export default NoteTableApp;
