export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="border p-2 rounded">
      <h3 className="font-semibold">{note.title}</h3>
      <p>{note.content}</p>
      <div className="mt-2 flex gap-2">
        <button onClick={() => onEdit(note)} className="text-blue-500 hover:underline">Edit</button>
        <button onClick={() => onDelete(note.id)} className="text-red-500 hover:underline">Hapus</button>
      </div>
    </div>
  );
}