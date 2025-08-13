import { useState } from "react";
import Home from "../components/Home";
import BuatCatatan from "../components/BuatCatatan";

export default function Catatan() {
    const [notes, setNotes]=useState([]);
    const [editid, setEditid]=useState(null);
    const [title, setTitle]=useState("")
    const [content, setContent]=useState("")
    
    const addNote = (noteData) => {
        if (editid) {
            setNotes(notes.map((note) =>
                note.id === edit ? { ...noteData} : note
        ));
        setEditid(null);
        } else {
            setNotes ([...notes, { id : Date.now(), judul : noteData.title}]);
        }
        // ([...notes, { id : Date.now(), {title : nilai, content : nilai} }])
    };

    const deleteNote = (id) => {
        if(window.confirm("Yakin ingin mengahapus catatan ini?")) {
            setNotes(notes.filter((note) => note.id !== id));
        }
    };

    const editNote = (note) => {
        setEditid(note.id);
    }

    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditid(note.id);
    };

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <h1 className="text-2xl font-bold mb-4">Catatan</h1>

      <BuatCatatan addNote={addNote} handleEdit={handleEdit} deleteNote={deleteNote} editNote={editNote}/>

      {notes.length > 0 ? (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <Home
              key={index}
              note={note}
              onEdit={handleEdit}
              onDelete={deleteNote}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Belum ada catatan.</p>
      )}
    </div>
  );
}