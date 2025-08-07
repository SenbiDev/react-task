import { useState } from "react";
import TabelForm from "../components/TabelForm";
import TabelFilter from "../components/TabelFilter";
import TabelList from "../components/TableList";

export default function Tabels() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterField, setFilterField] = useState('nama');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    const addItem = (newItem) => {
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([{...newItem, id: newId }, ...items]);
        };

    const handleSort = (key) => {
        if (key === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const filteredItems = items.filter((item) => {
        const value = item[filterField]?.toString().toLowercase();
        return value?.includes(filter.toLocaleLowerCase());
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (typeof aValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return sortOrder === 'asc'
            ?aValue.localeCompare(bValue)
            :bValue.localeCompare(aValue);
        }
    })

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Barang</h1>
            <TabelForm onAdd={addItem} />
            <TabelFilter 
                filter={filter}
                onFilterChange={setFilter}
                filterField={filterField}
                onFieldChange={setFilterField}
            />
            <TabelList
            items={sortedItems}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
            />
        </div>
    );
}; 