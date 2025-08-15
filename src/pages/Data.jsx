import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Form from "../components/Form";
import List from "../components/List";

export default function Data () {
    const [items, setItems] = useState([]);
    const [searchKategori, setSearchKategori] = useState("");
    const [searchBy, setSearchBy] = useState("semua");
    const [sort, setSort] = useState("");
    const [editItem, setEditItem] = useState(null);

    const handleSave = (item) => {
        if (editItem) {
            setItems(items.map((i) => (i.id === item.id ? item : i)));
            setEditItem(null);
        } else {
            const newId =
            items.length > 0
            ? Math.max(...items.map((i)=> i.id))+1:1;
            setItems([ ...items,{...item, id:newId}]);
        }
    };

    const handleUpdate = (id, updatedItems) => {
        setItems(items.map(item => item.id === id ? { ...item, ...updatedItems}: item));
        setEditItem(null);
    };

    const handleDelete = (id) => {
        setItems(items.filter((i) => i.id !== id));
    };

    const handleSort = (data) => {
        switch (sort) {
            case "id asc":
                return [...data].sort((a, b) => a.id - b.id);
            case "id desc":
                return [...data].sort((a, b) => b.id - a.id);
            case "tanggal-terlama":
                return [...data].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
            case "tanggal-terbaru":
                return [...data].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
            case "harga-termurah":
                return [...data].sort((a, b) => a.harga - b.harga);
            case "harga-termahal":
                return [...data].sort((a, b) => b.harga - a.harga);
            case "az":
                return [...data].sort((a, b) => a.nama.localeCompare(b.nama));
            case "za":
                return [...data].sort((a, b) => b.nama.localeCompare(a.nama));
            default:
                return data;
        }
    };

    const filterData = handleSort(
        items.filter((i) => {
            const searchLower = searchKategori.toLowerCase();
            if(!searchKategori||searchBy === "semua") return true;
            if(searchBy === "nama") return i.nama.toLowerCase().includes(searchLower);
            if(searchBy === "kategori") return i.kategori.toLowerCase().includes(searchLower);
            if(searchBy === "harga") return i.harga.toLowerCase().includes(searchLower);
            if(searchBy === "tanggal") return i.tanggal.toLowerCase().includes(searchLower);
        })
    );

    const handleEdit = (items) => {
        setEditItem(items);
    };

    return(
        <div className="bg-gray-900 text-gray-200 min-h-screen">
            <Header />
            <Navigation
                searchKategori={searchKategori}
                setSearchKategori={setSearchKategori}
                sort={sort}
                setSort={setSort}
                searchby={searchBy}
                setSearchBy={setSearchBy}
            />
            <main className="p-4">
                <Form onSave={handleSave} editItem={editItem} cancelEdit={() => setEditItem(null)} handleUpdate={handleUpdate}/>
                <List data={filterData} onEdit={setEditItem} onDelete={handleDelete} handleEdit={handleEdit}/>
            </main>
        </div>
    );
}
