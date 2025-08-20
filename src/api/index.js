async function postItems(newItem) {
    let response = await fetch('http://127.0.0.1:8000/api/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8' 
        },
        body: JSON.stringify(newItem)
    });

    if (response.ok) {
            let items = await response.json();
            console.log(`Data items ditambahkan. (status: ${response.status} )`);
            return items;
        } else {
            console.log("HTTP-Error: " + response.status)
            return null;
        }
}

async function getAllItems() {
    let url = 'http://127.0.0.1:8000/api/items/';
    let response = await fetch(url)
    if (response.ok) {
        let data = await response.json()
        let items = Array.isArray(data) ? data : [data];
        console.log(JSON.stringify(data, null, 2));
        return items;
    } else {
        console.log("HTTP-Error: " + response.status);
        return [];
    }
}

async function puttItems(id, updatedItem) {
    let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(updatedItem)
    });

    if (response.ok) {
        let items = await response.json();
        console.log(`Update sukses. (status: ${response.status} )`);
        return items;
    } else {
        console.log("HTTP-Error: " + response.status)
        return [];
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
        console.log("HTTP-Error, status: " + response.status)
        return false;
    }
}

export {
    postItems,
    getAllItems,
    puttItems,
    deleteItems
}
