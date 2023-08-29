/*
  1. Cookies
  - Simpen data dalam ukuran 20 x 4Kb
  - Mengingat beberapa informasi yang di simpan dari page lain atau pada kunjungan sebelumnya.
  - Cookies hanya bisa diakses oleh website dari domain yang sama, sehingga membuat website-website lain tidak bisa mengakesnya
  - biasa digunakan untuk menyimpan shopping chart, tracking, user preferences, authentication, user
  - Google chrome/ sebagian browser gak akan save cookies kalau mereka gak mendeteksi adanya domain di dalam web (local host atau di server)
  - secara cookie akan expire seperti session storage, lama default expirenya adalah 30 menit.
*/

document.cookie = "name=Superman";
document.cookie = "hero=true";
document.cookie = "city=Metropolis";
document.cookie = "group=JusticeLeague";
console.log(document.cookie);

document.cookie = "city=Gotham"
console.log(document.cookie);

//splitting cookies
var splitCookies = document.cookie.split("; ");
for (index = 0; splitCookies.length > index; index++){
    console.log(splitCookies[index]);
}

//setup cookies untuk expire 24 jam
var expiryDate = new Date();
var tomorrow = expiryDate.getTime() + (1000 * 60 * 60 * 24); //harus dalam milliseconds
expiryDate.setTime(tomorrow);
document.cookie = "name=Batman; expires=" + expiryDate.toUTCString();

//atau pakai max-age dengan hitungan detik (gak disupport sama IE lama)
document.cookie = "city=Gotham; max-age=86400"; //1 hari

//securing cookie with path supaya bisa dibaca sama path site lain dengan path ini.
document.cookie = "hero=true; path=/Home/Index";

//setting domain supaya bisa dibaca oleh domain lain
document.cookie = "name=Batman; domain=localhost; expires=" + expiryDate.toUTCString();

//secure cookies cuma untuk https doang
document.cookie = "name=Batman; domain=localhost; expires=" + expiryDate.toUTCString() + " secure";

//delete cookies, cookies hanya bisa di hapus lewat proses expire. Untuk menghapusnya set dengan tanggal saat ini atau masa lalu
document.cookie = "group=JusticeLeague; expires=Thu, 01 Jan 1970";