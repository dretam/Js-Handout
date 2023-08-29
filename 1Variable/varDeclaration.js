/*ASI Automatic Semicolon Insertion
  JS memang bisa bekerja seandainya tidak menggunakan ; (semicolon)
  karena JS secara otomatis bisa membaca enter/newline dan meng-insert ; 

  tapi penggunaan ; tetap harus dipakai untuk best practice, karena apabila
  process minified tidak berjalan benar, bisa mengakibatkan bugs.
  (minified adalah proses mengapus seluruh white space ketika javascript akan di deploy)
*/
var tanpaSM = "tanpa semi colon"
console.log(tanpaSM)

var denganSM = "dengan semi colon";
console.log(denganSM);

var denganSMInline = "dengan semi colon inline";console.log(denganSMInline);

/*
  Javascript hanya memiliki 6 tipe data, diantaranya:

  1. string: bisa ditulis dengan '', "" atau ``
  2. number: seluruh tipe data numeric yang dijadikan satu, baik sifatnya integer atau desimal
  3. boolean: true or false (bit) data type
  4. undefined: belum di definisikan sama sekali
  5. object: seluruh macam object tidak perduli di instantiate dengan cara apapun (akan dijelaskan di chapter lain)
  6. function: function as first class object, akan dijelaskan
*/
var stringVariable = "hello"; 
var charVariable = 'A'; //Ini bukan character, melainkan String. Tidak ada char di dalam javascript, string ditulis dengan berbagai macam quote mark.
var integerVariable = 50;
var floatingVariable = 20.5; //Bilangan bulat dan desimal tidak memiliki tipe data yang berbeda, yaitu number.
var booleanVariable = true;
var unknownVariable;

//gunakan perintah typeof untuk mengetahui tipe data yang sebenarnya dari sebuah variable atau object
console.log(typeof stringVariable);
console.log(typeof charVariable);
console.log(typeof integerVariable);
console.log(typeof floatingVariable);
console.log(typeof booleanVariable);
console.log(typeof unknownVariable);

//Deklarasi bisa dilakukan sekaligus
var variableA, variableB, variableC;

/*
  Javascript memiliki fungsi auto declaration ketika programmer lupa menulis var.
  Tapi auto declaration ini akan jalan apabila variable langsung di assign valuenya (langsung di inisialisasi)

  NOTE: penulisan tanpa deklarasi sangatlah bad practice karena bisa mengakibatkan miss communication antar developer
  dan memperbesar peluang error ketika ada developer yang lupa assign value variable tersebut.
*/
var testWithoutVar = "Bang!";
console.log(testWithoutVar);

//Automatic Parsing or Type Coercion
var numberFive = 5;
var numberSix = 6;
var stringFour = "4";
var stringFive = "words";
console.log(numberFive + numberSix);
console.log(numberFive * numberSix);
console.log(numberFive + stringFour);
console.log(numberFive * stringFour);
console.log(numberFive * stringFive);
console.log(stringFive / stringFive);

//Infinity value
var limit = 1E308;
var infinityNumber = 2E308;
console.log(limit);
console.log(infinityNumber);

var negativeInfinityNumber = -2E308;
console.log(negativeInfinityNumber);

//Converting number to string
var convertingOne = 3 + " ";
console.log(convertingOne);

var convertingTwo = 20..toString();
console.log(convertingTwo);

var convertingThree = 2..toString(2);
console.log(convertingThree);

var numericalValue = 45;
var convertingFour = String(numericalValue);
console.log(convertingFour);

//Converting string to number
var convertingSeven = Number("25");
console.log(convertingSeven);

var convertingEight = Number("Try String");
console.log(convertingEight);

var convertingNine = parseInt("340");
console.log(convertingNine);

var convertingTen = parseInt("100", 2);
console.log(convertingTen);

var convertingEleven = parseInt("TEST", 30);
console.log(convertingEleven);

var convertingTwelve = parseFloat("30");
console.log(convertingTwelve);

var convertingThirteen = parseFloat("30.40");
console.log(convertingThirteen);

var convertingFourteen = parseFloat(30);
console.log(convertingFourteen);

var convertingFifteen = parseInt(30.40);
console.log(convertingFifteen);

var convertingSixteen = parseInt("23.40");
console.log(convertingSixteen);

/*Semua tentang Boolean*/

//Conversi ke bool akan selalu true baik dari number atau string
var testTrueOne = Boolean("hello");
var testTrueTwo = Boolean(42);
console.log(testTrueOne);
console.log(testTrueTwo);

//hanya ada 7 values yang di convert jadi false
var testFalseOne = Boolean("");
var testFalseTwo = Boolean('');
var testFalseThree = Boolean(0);
var testFalseFour = Boolean(NaN);
var testFalseFive = Boolean(false);
var testFalseSix = Boolean(null);
var testFalseSeven = Boolean(undefined);

console.log("empty \"\" " , testFalseOne);
console.log("empty \'\' ", testFalseTwo);
console.log("0 ", testFalseThree);
console.log("NaN ", testFalseFour);
console.log("false ", testFalseFive);
console.log("null ", testFalseSix);
console.log("undefined ", testFalseSeven);
