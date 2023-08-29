/* 
    Kita bisa memanfaatkan Promise dalam pembuatan ajax (XMLHttpRequest), seperti contoh di bawah ini.
    Sehingga kita bisa membuat proses tepat setelah ajax selesai dengan then, yang sebelumnya kita 
    harus membuat procedure atau memanggil method di dalam function onload atau onreadychange.
*/
let getData = (method, url) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url);
        request.onload = () => {
            if(request.status >= 200 && request.status < 300){
                resolve(JSON.parse(request.response));
            } else {
                reject({status: this.status,statusText: request.statusText});
            }
        };
        request.onerror = () => {
            reject({status: this.status,statusText: request.statusText});
        }
        request.send();
    });
}

/*
    jsonplaceholder.typicode adalah web yang menyediakan kita sample-sample data dalam JSON
    yang gunanya untuk kebutuhan test dan belajar.
*/
getData('GET', 'http://jsonplaceholder.typicode.com/todos').then((data) => {
    console.log(data);
    return data;
}).then((data) => {
    //total object yang dihitung tidak mungkin salah, karena then yang kedua pasti terjadi setelah then yang pertama di resolve complete.
    console.log(`Total object yang diterima: ${data.length}`);
}).catch((error) => {
    console.log(error);
});

/*
    Tapi daripada menggunakan object request dari XMLHttpRequest dengan semua methodnya, kita bisa menggunakan
    fetch API. Bisa dilihat seperti contoh dibawah ini.
*/
//fetch dari sebuah url akan mengembalikan object Promise yang akan meresolve object dengan class Response
let fetchData = url => {
    return fetch(url);
}

//Karena fetch mengembalikan object promise, maka kita bisa menggunakan then untuk menangkap hasil resolvenya.
fetchData('http://jsonplaceholder.typicode.com/todos').then(response => {
    console.log(response); //Ini adalah contoh object response yang dikembalikan.
    /*
        Untuk mendapatkan datanya dalam bentuk json, kita harus menggunakan method json, tetapi method json
        dibawah ini belum tentu sudah selesai, karena akan berbentuk promise dimana akan menunggu data selesai di get.
    */
    let jsonResult = response.json(); 
    console.log(jsonResult);
    return jsonResult;
}).then(data => {
    //oleh karena itu, kita harus menggunakan then satu kali lagi untuk menunggu data selesai di proses.
    console.log(data);
});

/*
    fetch API bukan merupakan feature language dari ecmascript versi baru, tetapi feature dari 
    W3C (World Wide Web Consoritum) dan WHATWG (Web Hypertext Application Technology Working Group) yang dibuatkan di dalam window object.
    Sehingga ada kemungkinan kalau fetch tidak akan berjalan di semua browser, contohnya fetch tidak akan bekerja di IE.

    Sebelum menggunakan fetch, ada beberapa hal yang harus diketahui:
    1. Promise yang dihasilkan oleh fetch, tidak di set untuk reject pada HTTP Request error status, sekalipun yang di return
        404 not found atau 500 forbidden. Apabila ingin reject, kalian harus buat pakai XMLHttpRequest sendiri.
    2. Memiliki keterbatasan dalam send atau receive cookies data.
*/

/*
    Untuk melakukan POST request, fetch akan meminta 2 parameter, url dan option object.
    Option object terdiri dari headers, method, body, dan lain-lain.

    Tanpa menggunakan option object, fetch akan simply menjadi GET by default.
*/
let newUser = {
    username: 'Elon Musk',
    email: 'elonmusk@gmail.com',
};

fetch('https://jsonplaceholder.typicode.com/users', {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'POST',
  body: JSON.stringify(newUser)
}).then(response => response.status)
.then(statusCode => console.log(`status codenya: ${statusCode}`));