/*
    EDAP - Event-Driven Asynchronous Programming adalah sebuah aplikasi dimana di buat dengan
    teknik memanfaatkan sifat asynchronous untuk meningkatkan performance aplikasi.

    Asyncrhonous sendiri artinya adalah 2 proses yang dijalankan sekaligus secara parallel tanpa harus
    menunggu satu proses selesai sebelum proses lain.
*/
function launchNuclear(callback, seconds){
    window.setTimeout(callback, (seconds * 1000)); //setTimeout ada di chapter 10 Window Object
    console.log("Nuclear will lauch in " + seconds + " seconds");
}
function nuclearConfirmation(){
    console.log("Your nuke successfully annihilate a town.");
}
launchNuclear(nuclearConfirmation, 5);
  
/*
    AJAX/J: Asychronous JAvascript XML/JSON:
        adalah metode menggunakan asychronous processing untuk melakukan HTTP Request dan menerima HTTP Respond lewat javascript.

    Ajax pada native javascript bisa dilakukan dengan pembuatan object XMLHttpRequest.

    3 parameters pada saat proses open request adalah:

    PARAMETER 1: Http Method
    Request di HTTP di define dengan beberapa macam Method/Verbs:
        1. GET: request untuk mengambil data dari server-side ke client-side.
        2. POST: request untuk mengirim data di dalam HTTP body dari client-side ke server-side.

    PARAMETER 2: URL/Source Data/ API End Point
        Tempat data bisa diperoleh dari URL/ API End Point.

    PARAMETER 3: ASYNC SETTING
        True: untuk asychronous
        False: untuk sychronous
*/

/*
    1. SYCHRONOUS
        Berikut ini adalah contoh menggunakan AJAX secara Synchronous. Metode ini akan mendapatkan warning atau peringatan,
            karena proses synchronous lewat ajax tidaklah best practive dan bisa mengakibatkan leletnya web site karena harus menunggu data yang besar.
*/
var synRequest = new XMLHttpRequest();
synRequest.open("GET", "http://localhost:4000/sample.txt", false);
synRequest.send(); //argument dari function send adalah HTTP Body, isinya kosong dikarenakan HTTP Methodnya GET
console.log(synRequest);
console.log(synRequest.responseText);

/*
    2. ASYCHRONOUS
        Penggunaan Asynchronous akan mengakibatkan sulitnya memprediksi kapan data akan selesai proses http request dan respond.
        Oleh karena itu kita harus membuatkan event handler yang bisa membaca status perjalanan proses dari http request dan menerima status respond 
        atau hasil akhir requestnya.

    Ready State adalah status code yang memperlihatkan, perjalanan request sudah sampai dimana.
    Code angka untuk readyState:
        0:UNSENT/ NOT INITIALIZED: Sebelum method .open() baru mau mengirim request.
        1:OPENED/ ESTABLISHED CONNECTION: Method .open() baru saja di invoke tetapi method .send() baru mau dilakukan, atau koneksi ke server baru saja dibentuk.
        2:HEADERS RECEIVED/ REQUEST RECEIVED: Method .send() baru saja selesai di invoke, server baru saja menerima request, HttpHeader dan STATUS CODE baru saja diterima.
        3:LOADING/ PROCESSING REQUEST: Menunggu respond dan process.
        4:DONE/ FINISHED: Request selesai dan Respon telah diterima.
    
    Status code adalah code respond balasan yang menceritakan hasil atau kesimpulan dari request.
        Status code banyak sekali, tetapi bisa di golongkan menjadi beberapa macam:

    1XX (seratusan) Informational: biasanya di acuhkan oleh user agent pada browser, ini adalah status code bersifat informasi sementara.
        100 Continue: Request masih separuh jalan
        101 Switching Protocol: di oper ke protocol lain

    2XX (dua ratusan) Success: Berhasil dari request diterima dengan baik.
        200 OK: Simple OK, tidak ada komentar.
        201 Created: OK dengan kabar kalau data berhasil dibuat baru untuk HTTP Method POST/PUT
        202 Accepted: Request diterima, tetapi belum ada hasil, biasanya karena batch proses.
        204 No Content: OK, tetapi respond tidak berisikan body.

    3XX (tiga ratusan) Redirection: dialihkan ke link lain, atau ke API end point lain
        301 Moved Permanently: redirection biasa ke url baru.
        302 Found: Halaman webnya dipindah sementara ke link lain.
        303 See Other: biasanya redirection setelah kegiatan POST/PUT/PATCH/DELETE, dimana dibalas dengan GET
            dalam bentuk konfirmasi submit process.

    4XX (empat ratusan) Client Errors: Artinya ada kesalahan request yang berasal dari client-side.
        400 Bad Request: Requestnya salah dan tidak pahami server-side.
        401 Unauthorized: Request tanpa melewati login terlebih dahulu.
        403 Forbidden: ditolak karena role/ permission tidak diijinkan.
        404 Not Found: Tidak menemukan URL/Routes/Action/End Points sama sekali.
        405 Method Not Allowed: Salah HTTP Method/Verb untuk sebuah URL/Routes/Action/End Points yang related.
        412 Precondition Failed: Tidak memenuhi syarat tertentu dari server-side.
        415 Unsupported Media Type: Mencoba mengirim sebuah file di dalam body dengan format file yang salah.
        422 Unprocessable: Sebuah inputan tidak dapat diproses dikarenakan ada kesalahan data, ini biasanya dibalas ketika input tidak memenuhi
            kriteria validaasi.

    5XX (lima ratusan) Server Errors: Sebuah process error yang terjadi di dalam server atau dari sisi server-side sadar akan jenis error ini.
        500 Internal Server Error: Ada proses error pada server-side dan harus di debug dari server side.
        503 Service Unavailable: Server sedang dalam maintenance.
        505 Http Version Not Supported: Versi Http yang berbeda yang harus diterima oleh server.

*/
var asynRequest = new XMLHttpRequest();
asynRequest.open("GET", "http://localhost:4000/sample.txt", true);
asynRequest.send();
asynRequest.onreadystatechange = function () {
    if (asynRequest.readyState === 4 && asynRequest.status >= 200 && asynRequest.status < 300) { //akan melakukan process apabila readyState sudah DONE dan status code sudah OK
        console.log(asynRequest);
        console.log(asynRequest.responseText);
    } else {
        console.log("Belum Selesai ‐ " + asynRequest.status + ": " + asynRequest.statusText);
    }
}

//Kita bisa menggunakan attribute menyerupai ENUM milik XMLHttpRequest untuk ready statenya.
var asynRequest2 = new XMLHttpRequest();
asynRequest2.open("GET", "http://localhost:4000/sample.txt", true);
asynRequest2.send();
asynRequest2.onreadystatechange = function () {
    if (asynRequest2.readyState == XMLHttpRequest.DONE && asynRequest2.status >= 200 && asynRequest2.status < 300) {
        console.log(asynRequest2);
        console.log(asynRequest2.responseText);
    } else {
        console.log("Belum Selesai ‐ " + asynRequest2.status + ": " + asynRequest2.statusText);
    }
}

var textButton = document.getElementById("text");
var jsonButton = document.getElementById("json");
var xmlButton = document.getElementById("xml");
var htmlButton = document.getElementById("html");
var apiButton = document.getElementById("api");
var postButton = document.getElementById("post");

//secara default asynchronous status sudah true, jadi tidak perlu ditulis lagi.
textButton.addEventListener("click", function (event) {
    textRequest = new XMLHttpRequest();
    textRequest.open("GET", "http://localhost:4000/sample.txt");
    textRequest.send();
    //Di sini kita sudah menggunakan onload, yang artinya cuma melakukan proses dimana readyState 4 dan status code 2xx an
    textRequest.onload = function () {
        console.log(textRequest.responseText);
    }
});

//Di sini kita mencoba menerima data JSON
jsonButton.addEventListener("click", function (event) {
    jsonRequest = new XMLHttpRequest();
    jsonRequest.open("GET", "http://localhost:4000/karyawan.json");
    jsonRequest.send();
    jsonRequest.onload = function () {
        var jsonInString = jsonRequest.responseText;
        console.log(jsonInString);
        console.log(typeof jsonInString);
        var jsonInObject = JSON.parse(jsonInString);
        console.log(jsonInObject);
        console.log(typeof jsonInObject);
        console.log(jsonInObject.nama);
    }
});

//Di sini kita mencoba menerima data XML
xmlButton.addEventListener("click", function (event) {
    xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", "http://localhost:4000/mahasiswa.xml");
    xmlRequest.send();
    xmlRequest.onload = function () {
        var xmlResult = xmlRequest.responseXML;
        console.log(xmlResult);
        console.log(typeof xmlResult);
        var xmlStringName = xmlResult.querySelector("name").textContent;
        console.log(xmlStringName);         
    }
});

//Disini kita mencoba mengambil HTML
htmlButton.addEventListener("click", function (event) {
    htmlRequest = new XMLHttpRequest();
    htmlRequest.open("GET", "http://localhost:4000/partial.html");
    htmlRequest.send();
    htmlRequest.onload = function () {
        var htmlResult = htmlRequest.responseText
        console.log(htmlResult);
        var targetNode = document.getElementById("target");
        targetNode.innerHTML = htmlResult;
    }
});


//Di sini kita mencoba mengambil JSON dari API End Point site lain.
apiButton.addEventListener("click", function (event) {
    apiRequest = new XMLHttpRequest();
    apiRequest.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
    apiRequest.send();
    apiRequest.onload = function () {
        var apiInString = apiRequest.responseText;
        console.log(apiInString);
        var apiObject = JSON.parse(apiInString);
        console.log(apiObject);
        console.log(apiObject[0].name);
    }
});