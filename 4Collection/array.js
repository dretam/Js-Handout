/**
 * Pada JS5, satu-satunya collection yang bisa digunakan pada javascript adalah array.
 * Array dalam javascript memiliki prilaku yang berbeda dengan array pada bahasa pemrograman pada umumnya.
 * 
 * Array di dalam javascript adalah dynamic collection dengan campuran array index dan map,
 * tetapi jumlahnya tidak fixed.
 */
var colors = [];
colors[0] = "merah";
colors[1] = "jingga";
colors[2] = "kuning";
colors[3] = "hijau";
colors[4] = "biru";
colors[5] = "nila";
colors[6] = "ungu";
console.log("Warna kesukaan saya adalah: " + colors[3]);
console.log("Total colors: " + colors.length);

//Tentunya kita bisa menulis array dalam short-hand notation seperti ini.
var rainbows = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"];
console.log("My favourite color is: " + rainbows[0]);

/*
    Saat kita mengisi array dengan index yang jauh lebih besar,
    maka sebagian index yang lebih kecil di awalnya akan berisikan undefined, tetapi node array tetap ada.
*/
var halfArray = [];
halfArray[3] = "merah";
halfArray[4] = "jingga";
halfArray[5] = "kuning";
console.log("Isi index 0 adalah: " + halfArray[0]);
console.log("Total length half array adalah: ", halfArray.length); //besar arraynya sampai 6

//Array di dalam js bersifat dynamic, itu artinya bisa di-isi dengan tipe data yang berbeda-beda
var mixedArray = new Array();
mixedArray[0] = 34;
mixedArray[1] = "This is string";
console.log("Index of 0: ", mixedArray[0]);
console.log("Index of 1: ", mixedArray[1]);

/*
    Di sini kita bisa memanfaatkan array seperti map dengan menggunakan key ketimbang index
    Tetapi setiap element map yang ada di dalam array tidak akan dihitung sebagai total length dari collection.
*/
var dictionary = new Array();
dictionary["zero"] = "Nol";
dictionary["one"] = "Satu"
dictionary["two"] = "Dua";
console.log("isi dari one: ", dictionary["one"]);
console.log("length dari index string gak bisa diliat: ", dictionary.length);

/*Di bawah ini kita akan menggunakan multi dimensional array dengan contoh case melihat jarak antar kota*/
let cities = ["Indianapolis", "New York", "Tokyo", "London"];

let distancesTypeTwo = [];
distancesTypeTwo[0] = [];
distancesTypeTwo[0][0] = 0;
distancesTypeTwo[0][1] = 648;
distancesTypeTwo[0][2] = 6476;
distancesTypeTwo[0][3] = 4000;
distancesTypeTwo[1] = [];
distancesTypeTwo[1][0] = 648;
distancesTypeTwo[1][1] = 0;
distancesTypeTwo[1][2] = 6760;
distancesTypeTwo[1][3] = 3470;
distancesTypeTwo[2] = [];
distancesTypeTwo[2][0] = 6476;
distancesTypeTwo[2][1] = 6760;
distancesTypeTwo[2][2] = 0;
distancesTypeTwo[2][3] = 5956;
distancesTypeTwo[3] = [];
distancesTypeTwo[3][0] = 4000;
distancesTypeTwo[3][1] = 3470;
distancesTypeTwo[3][2] = 5956;
distancesTypeTwo[3][3] = 0;

/*Untuk menuliskan short-hand nya kurang lebih seperti ini.*/
let distancesTypeThree = [
    [0, 648, 6476, 4000], 
    [648, 0, 6760, 3470], 
    [6476, 6760, 0, 5956], 
    [4000, 3470, 5956, 0]
];

var firstCity = 0
var secondCity = 2

var resultTypeTwo = distancesTypeTwo[firstCity][secondCity];
var outputTypeTwo = "(Type two) The distance from " + cities[firstCity] + " to " + cities[secondCity] + " is " + resultTypeTwo;
console.log(outputTypeTwo);

var resultTypeThree = distancesTypeThree[firstCity][secondCity];
var outputTypeThree = "(Type three) The distance from " + cities[firstCity] + " to " + cities[secondCity] + " is " + resultTypeThree;
console.log(outputTypeThree);

var warna = [];
warna[0] = "merah";
warna[1] = "jingga";
warna[2] = "kuning";
warna[3] = "hijau";
warna[4] = "biru";
warna[5] = "nila";
warna[6] = "ungu";

//Di bawah ini adalah contoh-contoh method yang digunakan untuk management isi dari array

//pop: menghapus value dari index tertinggi
console.log(warna.pop());
console.log(warna[6]);
console.log(warna[5]);

//shift: menghapus value dari index terkecil
console.log(warna.shift());
console.log(warna[0]);
console.log(warna[1]);

//push: masukin value baru di index tertinggi
warna.push("violet");
console.log(warna[5]);

//hapus value dari Array
console.log(warna[2]);
delete warna[2];
console.log(warna[2]);

//unshift: masukin value baru di index terkecil
warna.unshift("velvet");
console.log(warna[0]);

//mutable length/ set length: bisa di ubah ukurannya, tidak seperti kebanyakan bahasa pemerograman.
warna.length = 10;
console.log(warna.length);

/*Concat digunakan untuk menggabungkan 2 array menjadi satu*/
var angka = [];
angka[0] = "nol";
angka[1] = "satu";
angka[2] = "dua";

console.log(angka.concat(["tiga", "empat", "lima"]));

//Kita bisa menggabungkan array menjadi satu string, parameter string pada method ini menunjukan character yang digunakan sebagai splitter
//dari satu element dan element lainnya. (By default splitter character adalah ",")
var joinedAngka = angka.join("-");
console.log(joinedAngka);

//split: adalah method yang digunakan untuk me-reverse join atau memisahkan string ke dalam bentuk array kembali
var deretan = "Joko,Amir,Mira,Sule";
var deretanArray = deretan.split(",");
console.log(deretanArray[0]);

//Slicing: mengambil value sesuai dengan index dan jumlah yang diinginkan.
var angkakedua = new Array();
angkakedua[0] = "nol";
angkakedua[1] = "satu";
angkakedua[2] = "dua";
angkakedua[3] = "tiga";
angkakedua[4] = "empat";
angkakedua[5] = "lima";
angkakedua[6] = "six";
angkakedua[7] = "seven";

var sliced = angkakedua.slice(2, 4);
console.log(angkakedua);
console.log(sliced);

/*Splicing: menyisipkan sekaligus menghapus existing array.
	.splice(indexStart, deleteCount, value yang ingin ditambahkan...)
*/
angkakedua.splice(2, 2, "two", "three");
console.log(angkakedua);

angkakedua.reverse();
console.log(angkakedua);

angkakedua.sort();
console.log(angkakedua);

//index of digunakan untuk mendapatkan index dari setiap element.
console.log(angkakedua.indexOf("empat"));
console.log(angkakedua.indexOf("test"));