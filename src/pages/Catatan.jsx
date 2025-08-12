import { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Home from "../components/Home";
import Hapus from "../components/Hapus";

const Catatan = () => {
    const [notes, setNotes] = useState([]);

    const[showconfirm, setShowConfirm] = useState(false);
    const[toDelete, setToDelete] = useState(null);

    const requestDelete = (id) => {
        setToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        setNotes((prev) => prev.filter((n) => n.id !== toDelete));
        setToDelete(null);
        setShowConfirm(false);
    };
    
    return(
        <div className="bg-gray-100 min-h-screen">
            <Header/>
            <Navigation/>
            <main className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                    <Home
                    key={note.id}
                    tittle={note.tittle}
                    content={note.content}
                    onDelete={() => requestDelete.note.id}
                    />
                ))}
            </main>
            <Hapus
                showconfirm={showconfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Catatan;