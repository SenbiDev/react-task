import React, { useEffect, useState } from "react"
import { getAllItems, postItems, puttItems, deleteItems } from "../api" 

export default function Items() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", description: "", price: ""});
    const [editItem, setEditItem] = useState(null);
    
    useEffect(() => {
    loadItems();
    }, []);

    async function loadItems() {
    const data = await getAllItems();
    setItems(data);
    }

    async function handleSumbit(e) {
        e.preventDefault();
        if (form.id === null) {
            const newItem = await postItems(form);
            console.log("hasil POST", newItem);
         
            setForm({ id: null, name: "", description: "", price: ""});
            loadItems();
        }
    };
    
    async function handleEdit() {
        if (!form.id) {
            console.log("gagal edit");
            return;
        } else {
            const updatedItem = await puttItems(form.id, form);
            console.log("edit berhasil", updatedItem);
            setForm({ id: null, name: "", description: "", price: ""});
            loadItems();
        }
    }
    

    async function handleDelete(id) {
        await deleteItems(id);
        loadItems(); 
    }
    
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Items</h1>

            <form onSubmit={editItem? handleEdit : handleSumbit} className="space-y-3 mb-6">

            <input 
                className="border p-2 w-full"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({...form, name:e.target.value})}
            />
            <input
                className="border p-2 w-full"
                type="text"
                placeholder="Deskripsi"
                value={form.description}
                onChange={(e) => setForm({...form, description:e.target.value})}
            />
            <input
                className="border p-2 w-full"
                type="text"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({...form, price:e.target.value})}
            />

            <button type="sumbit" className="bg-black text-white px-4 py-2 rounded">
                {editItem ? "Update" : "Tambah"}
            </button>
            </form>

            <table className="w-full border">
                <thead>
                    <tr className="bg-black">
                        <th className="border px-3 py-1">ID</th>
                        <th className="border px-3 py-1">Nama</th>
                        <th className="border px-3 py-1">Deskripsi</th>
                        <th className="border px-3 py-1">Harga</th>
                        <th className="border px-3 py-1">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-3 py-1">{item.id}</td>
                            <td className="border px-3 py-1">{item.name}</td>
                            <td className="border px-3 py-1">{item.description}</td>
                            <td className="border px-3 py-1">{item.price}</td>
                            <td className="border px-3 py-1 space-x-2">

                                <button className="bg-black text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setEditItem(item);
                                            setForm({
                                                name:item.name,
                                                description:item.description,
                                                price:item.price
                                            });
                                        }}
                                >Edit</button>

                            <button className="bg-black text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(item.id)}
                                    >Hapus    
                                </button>
                            </td>         
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};