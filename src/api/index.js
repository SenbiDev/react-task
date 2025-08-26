async function postItems(item) {
    let response = await fetch('http://127.0.0.1:8000/api/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    });

    if (response.ok) {
        let item = await response.json();
        console.log("POST ITEM", item);
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
        console.log("", item)
        let items = [];

        if (item.data && Array.isArray(item.data)) {
            items = item.data;
        }
    } else {
        console.log("HTTP-Error: " + response.status) 
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
        console.log("UPDATE ITEM:", item)

    } else {
        console.log("HTTP-Error: " + response.status);
    }
};


async function deleteItems(id) {
    let response = await fetch(`http://127.0.0.1:8000/api/items/${id}/` ,{
        method: "DELETE",
    });
        
    if (response.ok) {
        console.log(`DELETE DATA. (status: ${response.status})`);
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