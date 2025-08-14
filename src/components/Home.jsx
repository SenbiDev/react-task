export default function Home({ note, onEdit, onDelete }) {
  return (
    <li className="flex justify-between items-center bg-white p-3 rounded shadow">
      <h2 className="text-black font-bold">{note.title}</h2>
      <p className="text-black font-semibold">{note.content}</p>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Hapus
        </button>
      </div>
    </li>
  );
}