import { useState, useEffect } from "react"
import { postItems, getAllItems, putItems, deleteItems } from "./../../src/api/index"

export default function Items() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [editid, setEditId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let data = await getAllItems();
            console.log("DATA DARI API: ", data)
            setItems(data);
        }
        fetchData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (editid) {
            let updated = await putItems(editid, {name, description, price});   
            if (updated) {
                setItems(items.map(item => (item.id === editid ? updated : item)));
            }
            setEditId(null);
        } else {
            let newItem = await postItems({ name, description, price });
            if (newItem) {
                setItems([newItem, ...items]);
            }
        }
        setName("");
        setDescription("");
        setPrice("");
    }

    async function handleDelete(id) {
        let success = await deleteItems(id);
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
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Daftar Items
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >
                <div className="grid grid-cols-1 gap-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama"
                        required
                        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Deskripsi"
                        required
                        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Harga"
                        required
                        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg !bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        {editid ? "Update" : "Tambah"}
                    </button>
                    {editid && (
                        <button
                            type="button"
                            onClick={() => setEditId(null)}
                            className="px-4 py-2 rounded-lg !bg-gray-400 text-white hover:bg-gray-500 transition"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>
            <ul className="space-y-3">
                {items.length === 0 ? (
                    <li className="text-gray-500 dark:text-gray-400">Tidak ada data.</li>
                ) : (
                    items
                    .slice()
                    .sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                        <li
                            key={item.id ? `item-${item.id}`:`index-${index}`}
                            className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow"
                        >
                            <div>
                                <span className="font-bold text-gray-500 dark:text-gray-400 mr-2">
                                    {index + 1}.</span>
                                <b className="text-gray-900 dark:text-gray-100">{item.name}</b>{" "}
                                - <span className="text-gray-700 dark:text-gray-300">{item.description}</span>{" "}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    (Rp. {item.price})
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Hapus
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}