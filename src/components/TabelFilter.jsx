export default function TabelFilter({value, onChange}) {
    return (
        <input 
            type="text"
            placeholder="Cari berdasarkan nama atau kategori"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded w-full mb-4"
        />
    );
}