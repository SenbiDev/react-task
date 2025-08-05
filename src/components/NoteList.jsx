import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length === 0 ? (
        <p className="text-gray-400">Belum ada catatan...</p>
      ) : (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default NoteList;