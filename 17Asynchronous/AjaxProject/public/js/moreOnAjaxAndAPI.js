/*
    HTTP Method di dalam REST API lain-nya seperti:

    Request di HTTP di define dengan beberapa macam Method/Verbs:
    1. GET: (idempotent/repeatable) request untuk mengambil data dari server-side ke client-side.
    2. POST: (non-idempotent/non-repeatable) request untuk mengirim data di dalam HTTP body dari 
        client-side ke server-side dengan tujuan menambahkan data baru.
    3. PUT: (idempotent/repeatable) request untuk mengirim data di dalam HTTP body dari client-side ke 
        server-side dengan tujuan edit dan replace total data yang terpilih di dalam server.
    4. PATCH: (non-idempotent/non-repeatable) request untuk mengirim data di dalam HTTP body dari client-side ke
        server-side dengan tujuan edit sebagian data dari object yang terpilih.
    5. DELETE: (idempotent/repeatable) request untuk menghapus selected data di dalam satu collection di dalam sever-side.

    Kita akan mecoba ini semua dengan menggunakan API palsu dari JSON Placeholder site.
*/

var getButton = document.getElementById("get");
var postButton = document.getElementById("post");
var putButton = document.getElementById("put");
var patchButton = document.getElementById("patch");
var deleteButton = document.getElementById("delete");

//GET
getButton.addEventListener('click', (event) => {
    let printOutPosts = () => {
        let postData = JSON.parse(getRequest.responseText);
        console.log(postData);    
    }
    let getRequest = new XMLHttpRequest();
    getRequest.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    getRequest.send();
    getRequest.onload = printOutPosts;
});

/*
    HTTP Header kepala surat atau tambahan informasi saat terjadi request dan response.
        Jenis property dari HTTP Header banyak sekali, di sini kita menggunakan satu jenis http header, 
        yaitu: Content-type untuk menandakan media type dari resourcesnya.
*/

//POST
postButton.addEventListener('click', (event) => {
    let postInput = {
        'title': 'One hell of a post',
        'body': 'Did you feel the heat of this lesson burning your brain?',
        'userId': 1
    }
    let postRequest = new XMLHttpRequest();
    postRequest.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    postRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    postRequest.send(JSON.stringify(postInput));
    postRequest.onload = function(){
        console.log(postRequest.response);
    }
});

//PUT
putButton.addEventListener('click', (event) => {
    let putInput = {
        'id': 101,
        'title': 'Replacement',
        'body': 'Pengganti data id 1',
        'userId': 1
    }
    let putRequest = new XMLHttpRequest();
    putRequest.open('PUT', 'https://jsonplaceholder.typicode.com/posts/1');
    putRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    putRequest.send(JSON.stringify(putInput));
    putRequest.onload = function(){
        console.log(putRequest.response);
    }
})

//PATCH
patchButton.addEventListener('click', (event) => {
    let patchInput = {
        "title": "New Title",
        "body": "New Body"
    }
    let patchRequest = new XMLHttpRequest();
    patchRequest.open('PATCH', 'https://jsonplaceholder.typicode.com/posts/1');
    patchRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    patchRequest.send(JSON.stringify(patchInput));
    patchRequest.onload = function(){
        console.log(patchRequest.response);
    }
})

//DELETE
deleteButton.addEventListener('click', (event) => {
    let deleteRequest = new XMLHttpRequest();
    deleteRequest.open('DELETE', 'https://jsonplaceholder.typicode.com/posts/1');
    deleteRequest.send();
    deleteRequest.onload = function(){
        console.log(deleteRequest.response);
    }
})