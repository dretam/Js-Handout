
var getButton = document.getElementById("get");
var postButton = document.getElementById("post");
var putButton = document.getElementById("put");
var patchButton = document.getElementById("patch");
var deleteButton = document.getElementById("delete");

/*
    Di sini kita akan menggunakan fetch untuk seluruh kegiatan http request ke typicode yang sebelumnya sudah
    pernah kita lakukan dengan menggunakan XMLHttpRequest.
*/

//GET
getButton.addEventListener('click', async (event) => {
    //Pada GET http method dan body tidak diperlukan.
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let jsonData = await response.json();
    console.log(jsonData);
});

//POST
postButton.addEventListener('click', async(event) => {
    let postInput = {
        'title': 'One hell of a post',
        'body': 'Did you feel the heat of this lesson burning your brain?',
        'userId': 1
    };
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(postInput),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }   
    });
    let jsonData = await response.json();
    console.log(jsonData);
});

//PUT
putButton.addEventListener('click', async(event) => {
    let putInput = {
        'id': 101,
        'title': 'Replacement',
        'body': 'Pengganti data id 1',
        'userId': 1
    };
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify(putInput),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }   
    });
    let jsonData = await response.json();
    console.log(jsonData);
})

//PATCH
patchButton.addEventListener('click', async(event) => {
    let patchInput = {
        "title": "New Title",
        "body": "New Body"
    };
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        body: JSON.stringify(patchInput),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }   
    });
    let jsonData = await response.json();
    console.log(jsonData);
})

//DELETE
deleteButton.addEventListener('click', async(event) => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
    });
    let jsonData = await response.json();
    console.log(jsonData);
})