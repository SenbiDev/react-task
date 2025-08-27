async function postItems(data) {
    let response = await fetch('http://127.0.0.1:8000/api/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        let item = await response.json();
        console.log("POST Data", item);
        return item.data ? item.data : item;
    } else {
        console.log("HTTP-Error: " + response.status);
        return null;
    }
};


async function getAllItems() {
    let url = 'http://127.0.0.1:8000/api/items/';
    let response = await fetch(url);

    if (response.ok) {
        let item = await response.json();
        console.log("Data API", item)
        let data = [];

        if (item.data && Array.isArray(item.data)) {
            data = item.data;
        } else if (Array.isArray(item)) {
            data = item;
        } else {
            data = [item];
        }

        console.log("GET Data", data);
        return data; 
    } else {
        console.log("HTTP-Error: " + response.status);
        return [];
    }
};


async function puttItems(id) {
    let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify()
    });
    if (response.ok) {
        let item = await response.json();
        console.log("UPDATE Data:", item);
        let update = item.data ? item.data : item;
        return update;
    } else {
        console.log("HTTP-Error: " + response.status)
        return null;
    }
};


async function deleteItems(id) {
    let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/` ,{
        method: "DELETE",
    });
        
    if (response.ok) {
        console.log(`DELETE Data. (status: ${response.status})`);
    } else {
        console.log("HTTP-Error: " + response.status) 
    }
};

export{
    postItems,
    getAllItems,
    puttItems,
    deleteItems
};