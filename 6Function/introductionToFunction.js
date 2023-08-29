/*
  Di dalam javascript, function adalah first class object. Sehingga function akan diperlakukan sama persis seperti object.
  Function memiliki pointer di dalam heap memory sehingga bisa diproses layaknya variable atau object kalau digunakan tanpa pemanggilan fungsi.

  fungsi dipanggil ketika parameter bracket ditulis (), dan akan digunakan seperti object pointer ketika dipanggil tanpa bracket.
*/

/*
  Penulisan fungsi seperti ini disebut juga dengan Function Declaration.
  Function declaration membuat sebuah fungsi bisa dipanggil atau di invoke sebelum deklarasinya.
  Kurang lebih sama seperti bahasa pemrograman lainnya.
*/
hello();//invoke sebuah function sebelum function ditulis, disebut hoisting
function hello(){
  console.log("Hello World!");
}
hello();

/*
  Function Declaration adalah cara menulis function persis dengan seperti mendeklarasikan object.
  Selayaknya object, deklarasi harus terlebih dahulu di proses sebelum pemakaian.
*/
//goodBye();
var goodBye = function(){
  console.log("Goodbye World!");
};
goodBye();
console.log(goodBye);


/*
  Karena parameter tidak di definisikan tipe datanya pada setiap parameter, maka konsep overloading tidak pernah ada di dalam
  javascript. Seluruh kelebihan parameter akan dibuang dan seluruh parameter yang kekurangan nilai dari argument akan di anggap
  sebagai undefined.
*/
//Basic parameter and arguments
function multiplication (param1, param2, param3){
  return param1 * param2 * param3;
}
console.log(multiplication(3, 3));
console.log(multiplication(3, 3, 4, 5, 8)); //automatic elimination for excessive parameter when invoked.

//Default arguments
function sayMyName(name = "Anonymous"){
  console.log("Your name is", name);
}
sayMyName();
sayMyName("Boby");

function anotherRound(word){
  word = word || "for you";
  console.log("Anouther round ", word);
}
anotherRound();
anotherRound("I dare");

//Comparing functions
function additional(param1, param2){
  var result = param1 + param2;
  console.log("the result is: ", result);
}
var additionalFunctionOne = additional;
additionalFunctionOne(8, 10);

function fungsiPenjumlahan(param1, param2){
  var hasil = param1 + param2;
  console.log("hasilnya adalah: ", hasil);
}

function addTwoNumbers(param1, param2){
  var result = param1 + param2;
  console.log("the result is: ", result);
}

/*Sama seperti object, function hanya bisa dicompare reference numbernya, bukan valuenya.*/
if(additional == fungsiPenjumlahan){
  console.log("the functions are same");
}
if(additional == addTwoNumbers){
  console.log("the functions are same");
}
if(additional == additionalFunctionOne){
  console.log("the functions are same");
}
if(additional === additionalFunctionOne){
  console.log("the functions are same");
}

additionalFunctionOne = fungsiPenjumlahan;
if(additional === additionalFunctionOne){
  console.log("the functions are same");
}
if(fungsiPenjumlahan === additionalFunctionOne){
  console.log("the functions are same");
}

/*
  Callback function adalah tindakan memanfaatkan function sebagai argument ke dalam parameter,
  sehingga parameter tersebut bisa di invoke di dalam fungsi ini.
*/
function mailContent(toPerson, callback){
  console.log("Dear ", toPerson);
  callback();
}

function selamatNatal(){
  console.log("Merry Christmas for you and your family!");
}

mailContent("Harvey", selamatNatal);

//Karena ada function callback, kita bisa menulis dengan cara anonymous function.
//Anonymous function disebut demikian karena fungsi tersebut langsung ditulis tanpa diberi nama pointer objectnya
mailContent("Jason",
  function(){
    console.log("Happy New Year for you and your family!");
  }
);

//Contoh lain pemakaian dengan kombinasi fungsi dan parameter
var authorityTo = function(authority, place){
    console.log("You need to ask " + authority + " to go to " + place);
}
function mailWritterAuthority(toPerson, callback, authority, place){
  console.log("Dear ", toPerson);
  callback(authority, place);
}
mailWritterAuthority("Bruce", authorityTo, "Tony", "Avenger Tower");

var notificationGreeting = function(name){
  console.log(`Hello ${name}, you have one message`);
}
var notification = function(greeting){
  greeting();
  console.log("The notification is about...");
}

notification(notificationGreeting.bind(this, "John Doe"));