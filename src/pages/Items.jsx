import { useState, useEffect } from "react"
import { postItems, getAllItems, puttItems, deleteItems } from "./../../src/api/index"

export default function Items() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [editid, setEditId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllItems();
            setItems(data);
        }
        fetchData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (editid) {
            const updated = await puttItems(editid, {name, description, price});
            if (updated) {
                setItems(items.map(item => (item.id === editid ? updated : item)));
                setEditId(null);
            }
        } else {
            const newItem = await postItems({ name, description, price });
            if (newItem) {
                setItems([newItem, ...items]);
            }
        }
        setName("");
        setDescription("");
        setPrice("");
    }

    async function handleDelete(id) {
        const success = await deleteItems(id);
        if (success) {
            setItems(items.filter(item => item.id !== id));
        }
    }

    function handleEdit(item) {
        setEditId(item.id);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
    }

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1>Daftar Items</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                    required
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Harga"
                    required
                />
                <button type="submit">{editid ? "Update" : "Tambah"}</button>
                {editid && <button onClick={() => setEditId(null)}>Batal</button>}
            </form>

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <b>{item.name}</b> - {item.description} (Rp. {item.price}){""}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Hapus</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}