/*
  Destructuring assignment pada Ecma Script sama seperti Deconstruction di dalam C#.
  Dimana gunanya adalah untuk memisah-misahkan value ke dalam variable masing-masin yang berada di dalam satu collection atau object.
*/
let [first, second, third] = [33, 45, 67];
console.log(`first: ${first}, second: ${second}, third: ${third}`);

let [pertama, ,kedua] = [11, 22, 33];
console.log(`pertama: ${pertama}, kedua: ${kedua}`);

let [satu, dua, tiga] = [35, 122, 35];
console.log(`satu: ${satu}, dua: ${dua}, tiga: ${tiga}`);

/*
  Object Matching: adalah kemampuan Destructuring Assignment untuk memisahkan seluruh field dari suatu object 
  ke dalam variable-variable yang baru di deklarasikan dan diberi nama persis dengan nama-nama fieldnya.
*/

//Contoh dibawah ini menggunakan object yang tidak bernama atau anonymous object.
{
  console.log("===============Destructuring Anonymous Object==================");
  let {fieldPertama, fieldKedua, fieldKetiga} = {fieldPertama: "satu", fieldKedua: "kedua", fieldKetiga: "ketiga"};
  console.log(`first field: ${fieldPertama}`);
  console.log(`second field: ${fieldKedua}`);
  console.log(`third field: ${fieldKetiga}`);
}
/*
  Perhatikan contoh di bawah ini. Ini adalah contoh yang salah, karena nama fieldnya berbeda dengan nama variable
  yang baru di deklarasi untuk destructuring.
*/
{
  console.log("===============Fail Destructuring, Penamaan variable yang tidak sesuai field==================");
  let {firstField, secondField, thirdField} = {fieldPertama: "satu", fieldKedua: "kedua", fieldKetiga: "ketiga"};
  console.log(`first field: ${firstField}`);
  console.log(`second field: ${secondField}`);
  console.log(`third field: ${thirdField}`);
}
/*untuk membuat solusi di atas jadi berhasil, kita bisa menggunakan syntax seperti dibawah ini, sehingga kita bisa me-rename seluruh field jadi variable yang baru.*/
{
  console.log("===============Rename after destructuring==================");
  let {fieldPertama:firstField, fieldKedua:secondField, fieldKetiga:thirdField} = {fieldPertama: "satu", fieldKedua: "kedua", fieldKetiga: "ketiga"};
  console.log(`first field: ${firstField}`);
  console.log(`second field: ${secondField}`);
  console.log(`third field: ${thirdField}`);
}

let aisyah = {
  name : "Aisyah Triyana",
  position: "Salesman",
  birthPlace: "Jakarta"
};
{
  console.log("==================Destructuring Object Literals=========================")
  let {name, position, birthPlace} = aisyah;
  console.log(`person name: ${name}`);
  console.log(`person position: ${position}`);
  console.log(`person birth place: ${birthPlace}`);
}
{
  console.log("==================Dengan rename=========================")
  let {name:nama, position:jabatan, birthPlace:tempatLahir} = aisyah;
  console.log(`person name: ${nama}`);
  console.log(`person position: ${jabatan}`);
  console.log(`person birth place: ${tempatLahir}`);
}

let joko = {
  name : "Joko Iskandar",
  position: "Salesman",
  birthPlace: "Jakarta",
  car:{
    brand: "Toyota",
    model: "Avanza"
  }
}
{
  console.log("==================Descructuring untuk relational object===================");
  let {name, position, birthPlace, car: {brand: brand}, car: {model: model}} = joko;
  console.log(`person name: ${name}`);
  console.log(`person position: ${position}`);
  console.log(`person birth place: ${birthPlace}`);
  console.log(`brand: ${brand}`);
  console.log(`model: ${model}`);
}

/*Kita juga bisa menggunakan destructuring langsung pada parameter.*/
function printPerson({name, position, birthPlace}){
  console.log("=============Inside a function============");
  console.log(`person name: ${name}`);
  console.log(`person position: ${position}`);
  console.log(`person birth place: ${birthPlace}`);
  console.log("==========================================");
}
printPerson(aisyah);

/*
  Fail-safe deconstruction: adalah gabungan dari destructuring dan default parameter, dimana
  satu atau lebih field diberikan default valuenya pada saat proses destructuring.
*/
let {name, position, birthPlace, age = 25} = aisyah;
console.log(name + " age: " + age);

let jack = {
  name : "Jack Krauss",
  position: "Salesman",
  birthPlace: "Jakarta",
  age: 56
};
{
  let {name, position, birthPlace, age = 25} = jack;
}
console.log(`${name} age: ${age}`);