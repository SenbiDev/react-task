import { useState, useEffect } from "react";

export default function BuatCatatan({ addNote, editNote, updateNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title||"");
      setContent(editNote.content||"");
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        ide:editNote?.id,
        title: title.trim(),
        content: content.trim(),
    };
    if (!data.title || !data.content) return;
    
    if (editNote){
        updateNote({
            id:editNote.id,
            title:title.trim(),
            content:content.trim(),
        });   
    } else {
        addNote(data);
        setTitle("");
        setContent("");
    }
    }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <div>
        <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-[#2A2A2A] text-white"
        />
      </div>
      <div>
        <textarea
        wrap="soft"
        spellCheck="false"
        placeholder="Isi catatan..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-[#2A2A2A] text-white h-32"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editNote ? "Update" : "Tambah"}
      </button>
    </form>
  );
}