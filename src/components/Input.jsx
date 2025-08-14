import React, {useState} from "react"

const Input = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        id: "",
        nama: "",
        kategori: "",
        harga: "",
        tanggal: "",
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nama || !formData.category || !formData.price || !formData.date) return;

        const cleanedPrice = Number(formData.price)

        const finalData = { ...formData, price: cleanedPrice };

        editNote ? updateNote(finalData) : addNote(finalData)
        setFormData({nama: '', category: '', price: '', date: ''});

        onAdd({
            ...formData,
            harga: Number(formData.harga),
        });
    };

    return(
        <main className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            <form id="formTambah" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id" className=" block text-sm font-medium text-gray-700">ID</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChangeCapture={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <label htmlFor="nama" className=" block text-sm font-medium text-gray-700">Nama</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChangeCapture={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <label htmlFor="kategori" className=" block text-sm font-medium text-gray-700">Kategori</label>
                    <input
                        type="text"
                        id="kategori"
                        name="kategori"
                        value={formData.kategori}
                        onChangeCapture={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <label htmlFor="harga" className=" block text-sm font-medium text-gray-700">Harga</label>
                    <input
                        type="number"
                        id="harga"
                        name="harga"
                        value={formData.harga}
                        onChangeCapture={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <label htmlFor="tanggal" className=" block text-sm font-medium text-gray-700">Tanggal</label>
                    <input
                        type="date"
                        id="tanggal"
                        name="tanggal"
                        value={formData.tanggal}
                        onChangeCapture={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
            </form>
        </main>
    )
};