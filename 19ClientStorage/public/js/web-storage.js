/*
 Session Storage
 - Sifatnya sementara seperti cookie, session secara default akan expire selama 20 menit.
 - Besar memory berbeda-beda tergantung browser dan device. (biasanya 5Mb - 10Mb)
 - Lebih secure daripada cookies dan lebih baik untuk web performance
 - membuka halaman baru akan mentrigger untuk dibuatkannya sesi baru, tidak seperti cookie
 - akan hilang bila browser di close
 - tidak akan hilang bila di refresh
 */
sessionStorage.setItem("color", "red");

//Selalu check apakah browser memiliki session storage (walaupun hampir semua browser modern sekarang punya)
if (typeof (Storage) != "undefined") {
    sessionStorage.setItem("setting", "default");
    var setting = sessionStorage.getItem("setting");
    var color = sessionStorage.getItem("color");
    console.log(setting + ", " + color);
    sessionStorage.removeItem("color");
    sessionStorage.clear();
}
else {
    alert("Browser tidak punya session storage atau local storage");
}

/*
    Local Storage
    -Tidak ada expirenya, seluruh informasi akan terus disimpan.
    -Data tidak akan terhapus walaupun browser window di tutup.
    -Satu-satunya cara menghpus local storage adalah lewat javascript.
    -Bisa kirim events antar browser window.
    -Besar memory berbeda-beda tergantung browser dan device. (biasanya 5Mb - 10Mb)
    - Lebih secure daripada cookies dan lebih baik untuk web performance
*/
localStorage.setItem("userName", "parker-crane");

//Selalu check apakah browser memiliki local storage (walaupun hampir semua browser modern sekarang punya)
if (typeof (Storage) != "undefined") {
    localStorage.setItem("language", "indonesia");
    var language = localStorage.getItem("language");
    var userName = localStorage.getItem("userName");
    console.log(language + ", " + userName);
    localStorage.removeItem("userName");
    localStorage.clear();
}
else {
    alert("Browser tidak punya session storage atau local storage");
}
