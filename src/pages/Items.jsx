import { useEffect, useState } from "react";
import { postItems, getAllItems, putItems, deleteItems } from "./../../src/api/";

export default function Items () {
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({id: "", name: "", description: "", price: "" });

    useEffect(() => {
        loadItems();
    })

    async function loadItems() {
        const data = await getAllItems();
        setItems(data);        
    }

    async function handlePost(e) {
            e.preventDefault();
            if (!form.name || !form.description || !form.price) return;
            
            const newItems = await postItems(form);
            setItems(items.concat(newItems));
            setForm({name: "", description: "", price: ""});
    }

    async function handlePut(e) {
        e.preventDefault();
        const updated = await putItems(editItem.id, form);
        setItems(items.map((i) => (i.id === editItem.id ? updated : i)));
        setEditItem(null);
        setForm({name: "", description: "", price: ""});
    }

    async function handleDelete(id) {
        await deleteItems(id);
        setItems(items.filter((i) => i.id !== id));
    }
    return (
    <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Items</h1>
        <form onSubmit={editItem ? handlePut : handlePost} className="flex flex-col gap-2 mb-4">
            <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value})}
                className="border p-2"
            />
            <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value})}
                className="border p-2"
            />
            <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value})}
                className="border p-2"
            />
            <button type="submit" className="bg-blue-700 text-white p-2 rounded">
                {editItem ? "Put" : "Post"}
            </button>
        </form>
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-900">
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {items?.length > 0 ? (
                    items.map((item) => (
                    <tr key={item.id} className="text-center">
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>Rp {item.price}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setEditItem(item);
                                    setForm({
                                        name: item.name,
                                        description: item.description,
                                        price: item.price
                                    });
                                }}
                                className="bg-green-500 text-white font-bold px-2 hover:bg-green-600"
                            >
                                PUT
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 text-gray-500 font-bold px-2"
                            >
                                DELETE
                            </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center p-2 text-gray-500">
                            Tidak ada items
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)
}

