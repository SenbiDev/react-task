async function postItems(newItem) {
    let response = await fetch('http://127.0.0.1:8000/api/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8' 
        },
        body: JSON.stringify(newItem)
    });

    if (response.ok) {
        let raw = await response.json();
        console.log("RAW CREATE:", raw);
        return raw.data ? raw.data : raw;
        // console.log(`Data items ditambahkan. (status: ${response.status} )`);
        // return items;
    } else {
        console.log("HTTP-Error: " + response.status);
        return null;
    }
}

async function getAllItems() {
    let url = 'http://127.0.0.1:8000/api/items/';
    let response = await fetch(url);
    if (response.ok) {
        let raw = await response.json();
        console.log("RawApi:", raw)
        let items = [];
        
        if (raw.data && Array.isArray(raw.data)) {
            items = raw.data;
        }
        else if (Array.isArray(raw)) {
            items = raw;
        }
        else {
            items = [raw];
        }

        console.log("ITEM FIXED:", items);
        // let items = Array.isArray(data) ? data : [data];
        // items = items.map(d => ({
        //     id: d.id,
        //     name: d.name || d.nama,
        //     description: d.description || d.deskripsi,
        //     price: d.price || d.harga
        // }));
        // console.log(JSON.stringify(data, null, 2));
        return items;
    } else {
        console.log("HTTP-Error: " + response.status);
        return [];
    }
}

async function putItems(id, updatedItem) {   
    let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(updatedItem)
    });

    if (response.ok) {
        let raw = await response.json();
        console.log("RAW UPDATE:", raw)
        let item = raw.data ? raw.data : raw;
        // console.log(`Update sukses. (status: ${response.status} )`);
        return item;
    } else {
        console.log("HTTP-Error: " + response.status);
        return null;   
    }
}

async function deleteItems(id) {
    let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log(`Data dihapus. (status: ${response.status} )`);
        return true;
    } else {
        console.log("HTTP-Error, status: " + response.status);
        return false;
    }
}

export {
    postItems,
    getAllItems,
    putItems,    
    deleteItems
}