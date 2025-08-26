import React, { useEffect, useState } from "react"
import { getAllItems, postItems, puttItems, deleteItems } from "../api" 

export default function Items() {
    const [items, setitems] = useEffect([]);
    const [form, setFrom] = useState({ id: null, nama: "", description: "", price: ""});
    
    useEffect(() => {
        loadItems();
    }, []);
    
    async function loadItems() {
        const data = await getAllItems();
        setitems(data);
    }

    async function handlesumbit(e) {
        e.preventDefault();
        if (!form.name || !form.description || !form.price ) {
            const update = await postItems(form, items);
        } else {
            await postItems(form);
        }
        setFrom({ id: null, name: "", description: "", price: ""});
        loadItems(); 
    }

    async function handleEdit(e) {
        e.preventDefault();
        const updated = await puttItems(editItmes.id, form, items);
        setitems(updated);
        setEditItem(null);
        setFrom({ name: "", description: "", price: "" });
    }

    async function handleDelete(id) {
        const updated = await deleteItems(id, items);
        setitems(updated);
    }

    return (
        <div className="=p-6">
            <h1 className="text-xl font-bold mb-4>">Items</h1>

            <form onSubmit={editItmes? handleEdit : handlesumbit} className="space-y-3 mb-6">

            <input 
                className="border p-2 w-full"
                type="text"
                placeholder="Nama"
                value={form.name}
                onChange={(e) => setFrom({...form, name:e.target.value})}
            />
            <input
                className="border p-2 w-full"
                type="text"
                placeholder="Deskripsi"
                value={form.description}
                onChange={(e) => setFrom({...form, description:e.target.value})}
            />
            <input
                className="border p-2 w-full"
                type="text"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setFrom({...form, price:e.target.value})}
            />

            <button type="sumbit" className="bg-black text-white px-4 py-2 rounded">
                {editItmes ? "Update" : "Tambah"}
            </button>
            </form>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
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
                            <td className="border px-3 py-1 space-x-2"></td>

                            <button className="bg-black text-white px-2 py-1 rounded"
                                onClick={() => {
                                    setEditItem(item);
                                        setFrom({
                                            name:item.name,
                                            description:item.description,
                                            price:item.price
                                        })
                                    }}
                            >Edit</button>

                           <button className="bg-black text-white px-2 py-1 rounded"
                                onClick={() => handleDelete(item.id)}>Hapus    
                            </button>  

                            <td colSpan={5} className="p-4 text-white text-center">Tidak Ada Data</td>       
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};