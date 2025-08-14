import { useState } from "react";
import Home from "../components/Home";
import BuatCatatan from "../components/BuatCatatan";

export default function Catatan() {
    const [notes, setNotes]=useState([]);
    const [editNote, setEditNote]=useState(null);
    
    const addNote = (noteData) => {
        if (editNote) {
            setNotes(
                notes.map((note) =>
                note.id === editNote.id ? { ...note, ...noteData} : note
            )
        );
        setEditNote(null);
        } else {
            setNotes ([
                ...notes,{ id : Date.now(), title : noteData.title, content : noteData.content },
            ]);
        }
        setEditNote(null);
        // ([...notes, { id : Date.now(), {title : nilai, content : nilai} }])
    };

    const deleteNote = (id) => {
        if(window.confirm("Yakin ingin mengahapus catatan ini?")) {
            setNotes(notes.filter((note) => note.id !== id));
        }
    };

    const handleEdit = (note) => {
        setEditNote(note);
    }

    const updateNote = (updateData) => {
        setNotes(notes.map(note =>
            note.id === updateData.id ? updateData : note
        ));
        setEditNote(null);
    };

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <h1 className="text-2xl font-bold mb-4">Catatan</h1>

      <BuatCatatan addNote={addNote} deleteNote={deleteNote} editNote={editNote} updateNote={updateNote}/>

      {notes.length > 0 ? (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <Home
              key={index}
              note={note}
              onEdit={handleEdit}
              onDelete={deleteNote}
              updateData={updateNote}
            
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Belum ada catatan.</p>
      )}
    </div>
  );
}