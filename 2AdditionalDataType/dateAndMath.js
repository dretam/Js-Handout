/*
	Date adalah cara untuk membuat object yang menampung tanggal dan waktu.
  Tipe data date adalah object, karena di dalam javascript seluruh object memiliki tipe data yang sama, yaitu object.
  Tidak perduli dibuat oleh constructor apa.
*/
var today = new Date();
console.log(today);
console.log(today.toString());

//Membuat date dari string sebagai parameter
var christmas = new Date('25 December 2016');
var newYear = new Date('January 1, 2017'); 
var independence = new Date("Friday, August 17, 2018"); //Assumed time zone with day (hari tidak akan guna bila salah, date akan tetap menulis hari yang benar)
var halloween = new Date('2016 10 31');
var valentine = new Date('2017-02-14'); 
var easter = new Date('04/01/2018'); //Non-ISO American Format

//Membuat date dari number parameters
//(year, month, day, hour, minutes, seconds, milliseconds)
var birthday = new Date(1988, 10, 27); //Bulan di dalam Javascript adalah array, sehinggal January indexnya diawali dengan 0
var birthdayWithTime = new Date(1988, 10, 27, 12, 33);

/*options
  weekday: 'narrow', 'short', 'long'
  era: 'narrow', 'short', 'long'
  year: 'numeric', '2-digit'
  month: 'numeric', '2-digit', 'narrow', 'short', 'long'
  day: 'numeric', '2-digit'
  hour: 'numeric', '2-digit'
  minute: 'numeric', '2-digit'
  second: 'numeric', '2-digit'
  timeZoneName:'short', 'long'
*/
var indonesiaOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(christmas.toLocaleDateString('id-ID', indonesiaOptions));
var usOptions = { month: 'long', year: 'numeric', day: 'numeric' };
console.log(christmas.toLocaleDateString('en-US', usOptions));
var japOptions = { year: 'numeric', day: 'numeric', month: 'long'};
console.log(christmas.toLocaleDateString('ja-JP', japOptions));

/*Getter method yang bisa digunakan untuk mengambil element date and time*/

//Get Day hanya mendapatkan number, dimana 0 dimulai dari minggu dan 6 di sabtu
var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
var halloweenDay = halloween.getDay();
console.log(halloweenDay);
console.log(days[halloweenDay]);

var christmasDate = christmas.getDate();
var christmasMonth = christmas.getMonth();

/*
  Jangan menggunakan getYear(), karena sudah deprecated sejak tahun 2000.
  getYear() dirancang untuk mendapatkan 2 digit tahun, tetapi sejak tahun 2000, hasil yang dikembalikan adalah 100 (karena 1999 adalah 99)
  Gunakan getFullYear() selalu untuk mendapatkan tahun
*/
var christmasYear = christmas.getFullYear();

var todayHours = today.getHours();

//Setter method
var sampleDate = new Date('1 January 2017');
sampleDate.setDate(11);
sampleDate.setMonth(9);
sampleDate.setFullYear(2011);
console.log(sampleDate);

//Math Operator
console.log(5 + 6);
console.log(6 - 11);
console.log(4 * 7);
console.log(5 / 10);
console.log(23 % 6);

/*
  Post increment dan decrement operator sama seperti pada programming language
  pada umumnya.
 */
var startingUp = 5;
console.log(startingUp++);
console.log(startingUp);

var startingAgain = 5;
var oneStepCloser = startingAgain++;
console.log(oneStepCloser);

var preStartUp = 3;
console.log(++preStartUp);
console.log(preStartUp);

//Compound operation
var points = 10;
points += 10;
console.log(points);
points -= 5;
console.log(points);

/**
 * Ceil pembulatan ke atas
 * Floor pembulatan ke bawah
 * Round pembulatan classic
 */
var floatingNumber1 = 5.1;
var floatingNumber2 = 5.9;
console.log("Pembulatan ke atas untuk floating number 1 & 2: " + Math.ceil(floatingNumber1) + " & " + Math.ceil(floatingNumber2));
console.log("Pembulatan ke bawah untuk floating number 1 & 2: " + Math.floor(floatingNumber1) + " & " + Math.floor(floatingNumber2));
console.log("Pembulatan standard untuk floating number 1 & 2: " + Math.round(floatingNumber1) + " & " + Math.round(floatingNumber2));

//Find Minimum and Maximum
console.log(Math.min(12.3, 12.4, 34));
console.log(Math.max(12.3, 12.4, 34));

var randomNumber = Math.random(); //akan generate dari 0 - 0.9 dalam bentuk decimal
var maximumRandomNumber = 6; //set angka maximum untuk sebuah random number
var floatingRandomNumber = maximumRandomNumber * randomNumber; //angka akan jatuh berkisar dari 0 - 5... dalam bentuk decimal
var floorIntegerNumber = Math.floor(floatingRandomNumber); //angka akan jatuh berkisar dari 0 - 5 dalam bentuk bilangan bulat
var dice = floorIntegerNumber + 1; //jadi seperti dadu, random dari 1 - 6 dalam bentuk bilangan bulat

/**
 * Terkadang kita berhadapan dengan angka exponential ketika valuenya terlalu besar.
 * Berikut ini beberapa cara converting exponential.
 */
 var exponentialOne = 2e3;
 console.log(exponentialOne);

var exponentialThree = 2e+3;
console.log(exponentialThree);

var exponentialFive = 2e-3;
console.log(exponentialFive);

console.log(0.53.toExponential());
console.log(50..toExponential());
console.log(5 .toExponential());
console.log((5).toExponential());

//Dalam kondisi tertentu kita masih bisa mengubah exponential kembali ke fixed number
//parameter fixed number digunakan untuk membatasi digit pada fixed yang akan ditunjukan.
//maximumnya 20
var largeNumber = 1E-10;
console.log(largeNumber.toFixed(10));