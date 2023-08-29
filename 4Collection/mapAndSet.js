/*
  Map dan Set sekarang juga bisa ditemui pada javascript (ES6).
  Map kurang lebih sifatnya seperti Hash Map dan Dictionary
*/

//Untuk membuat map object, kita bisa instantiate seperti di bawah ini.
let mapObject = new Map();

//untuk set ke dalam map, bisa menggunakan method set dengan parameters (key, value)
mapObject.set('index', 3600);
mapObject.set('anotherIndex', "Value");
mapObject.set(12, "Dua Belas");

console.log("================get value=================");
console.log(mapObject.get('index'));
console.log(mapObject.get('anotherIndex'));
console.log(mapObject.get(12));
console.log(`mapObject size: ${mapObject.size}`);

console.log(`mapObject has index: ${mapObject.has('index')}`);
console.log(`mapObject delete index: ${mapObject.delete('index')}`);
console.log(`mapObject index after delete: ${mapObject.has('index')}`);
console.log(mapObject.get('index'));
console.log(`mapObject size: ${mapObject.size}`);

//Cara lain untuk inisialisasi map value sekaligus.
let employeeMap = new Map([
  ['AR001', 'Hartono Sutanto'],
  ['AR002', 'Jessica Biel'],
  ['AR003', 'Arjuna Wandari'],
  ['AR004', 'Saleh Agustiawan']
]);

//atau bisa set sekaligus seperti cara di bawah ini.
let studentMap = new Map()
  .set(1200, 'Michael Myers')
  .set(1201, 'Sean Bean')
  .set(1202, 'Sarah Hyland');

console.log("=========== loop seluruh Keys dengan for of ===========");
for(let key of employeeMap.keys()){
  console.log(key);
}

console.log("=========== loop seluruh Values dengan for of ===========");
for(let value of studentMap.values()){
  console.log(value);
}

console.log("=========== loop seluruh Entries dengan for of ===========");
for(let entry of employeeMap.entries()){
  console.log(entry[0], entry[1]);
}

console.log("=========== loop dengan memanfaatkan kombinasi Key, Value from Entries ===========");
for(let [key, value] of studentMap.entries()){
  console.log(`key: ${key}, value: ${value}`);
}

console.log("=========== loop dengan memanfaatkan Key, Value from Map ===========");
for(let [key, value] of studentMap){
  console.log(`key: ${key}, value: ${value}`);
}

//Kita bisa mengambil seluruh keys-nya ke dalam array sekaligus
let arrayKeys = [...studentMap.keys()];
console.log(arrayKeys);

/*Set sifatnya seperti non-generic list. Bisa diexpand terus tanpa memiliki informasi keys.*/
let setColor = new Set();
setColor.add('Red');
setColor.add('Orange');
setColor.add('Green');

console.log(setColor);
console.log(`setColor size: ${setColor.size}`);
console.log(setColor.has('Red'));
setColor.delete('Red');
console.log(setColor.has('Red'));
console.log("setColor size (after delete): " + setColor.size);

//Alternative inisialisasi untuk mengisi value ke dalam Set
let setWarna = new Set(['merah', 'jingga', 'kuning']);

//atau dengan multiple add seperti di bawah ini:
let setMakanan = new Set()
  .add('Ayam Goreng')
  .add('Tempe')
  .add('Tahu');

/*Set bahkan bisa memiliki value NaN di dalamnya*/
let setNanExample = new Set([NaN]);
console.log("NaN size is: " + setNanExample.size);
console.log("Check NaN: " + setNanExample.has(NaN));

//bisa di for of seperti biasa
for(let warna of setWarna){
  console.log(warna);
}

//Atau langsung di input ke dalam array
let arrayMakanan = [...setMakanan];
console.log(arrayMakanan);