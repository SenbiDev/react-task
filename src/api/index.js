export async function postItems(item) {
    let response = await fetch('http://127.0.0.1:8000/api/items/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(item)
    });
    if (response.ok) {
        let items = await response.json();
        console.log("POST items: ", items);
        return items.data ? items.data : items;
    }else{
        console.log("HTTP-Error: " + response.status)
        return null;
    }
}

export async function getAllItems() {
    let url = 'http://127.0.0.1:8000/api/items/';
    let response = await fetch(url);
    if (response.ok) {
        let items = await response.json();    
        console.log("Items API: ", items);
        let item = [];

        if (items.data && Array.isArray(items.data)) {
            item = items.data;
        }
        else if (Array.isArray(items)) {
            item = items;
        }
        else {
            item = [items];
        }

        console.log("GET Items:", item);
        return item;
    }else{
        console.log("HTTP-Error: " + response.status);
        return [];
    }
}

export async function putItems(id, updatedItem) {
    let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(updatedItem)
    });
    if (response.ok) {
        let items = await response.json();
        console.log("PUT items: ", items);
        let update = items.data ? items.data : items;
        return update;
    }else{
        console.log("HTTP-Error: " + response.status)
        return null;
    }
    
}

export async function deleteItems(id) {
        let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/`,{
        method: 'DELETE'
    });
    if (response.ok) {
        console.log(`DELETE items. (status: ${response.status} )`);
    }else{
        console.log("HTTP-Error: " + response.status)
    }
}
