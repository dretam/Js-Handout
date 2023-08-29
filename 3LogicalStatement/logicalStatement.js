/* Penggunakan classic if else dan else if pada js sama dengan bahasa pemrograman lain.
  Code yang digunakan untuk conditional yang menentukan apakah kondisi sesuai untuk isi dari code block dijalankan.*/
var things = true;
if(things == true){
  console.log("code executed");
}
if(!things){
  console.log("code executed again");
}
things = false;
if(!things){
  console.log("code executed if false");
}

if (things){
  console.log("if things is true");
}
else{
  console.log("else things is false");
}

var condition = "no problem";
if(condition == "good"){
  console.log("condition is good");
}
else if (condition == "no problem"){
  console.log("no problem at all");
}
else{
  console.log("condition is bad");
}

/*Ternary operator adalah short hand notation yang bisa digunakan pada kondisi if else yang simple, dimana menggunakan
  3 macam operator (comparison, ? dan :)
*/
condition == "no problem" ? console.log("executed if condition is true.") : console.log("executed if condition is false.");
condition == "good" ? console.log("executed if condition is true.") : console.log("executed if condition is false.");

//Switch case
var justSomeNumber = 2;
switch(justSomeNumber)
{
    case 1:
        output = "satu";
        break;
    case 2:
        output = "dua";
        break;
    case 3:
        output = "tiga";
        break;
    default:
        output = "kacau";
}
console.log("outputnya: " + output);

//Yes Or Not !
var notTrue = !true;
console.log(notTrue);

var trySomeString = !"Hallo";
console.log(trySomeString);

var notNotTrue = !!true;
console.log(notNotTrue);

var notNotFalse = !!false;
console.log(notNotFalse);

/**
 * Karena javascript memiliki data type coercion, melakukan operasi perbandingan sedikit menantang.
 * karena itu dibuatkanlah operasi pembanding soft equality vs hard equality.
 * 
 * Dimana hard equality ===, membandingkan 2 buah variable yang memiliki value dan data type yang sama.
 * Dan soft equality ==, menggunakan feature data type coercien dimana kedua element akan dibandingkan valuenya saja dan data typenya akan di convert
 *    sampai sama.
 */
var component1 = 30;
var component2 = "30";
var component3 = 30;
if (component1 === component2){
  console.log("Component 1 and Component 2 has the same data type.");
}
else if (component1 == component2){
  console.log("Component 1 and Component 2 are same but has different data type");
}
else{
  console.log("Component 1 and Component 2 are different.");
}

if (component1 === component3) {
  console.log("Component 1 and Component 3 has the same data type.");
}
else if (component1 == component3) {
  console.log("Component 1 and Component 3 are same but has different data type");
}
else {
  console.log("Component 1 and Component 3 are different.");
}

/*
  Soft equality terkadang ditakut oleh sebagian programmer dan terkadang di consider sebagai tindakan
  bad practice dikarena beberapa strange case yang bisa dilihat di contoh berikut ini.
 */
if(" " == 0){
  console.log(" \" \" == 0 ");
}
if(false == "0"){
  console.log("false == \"0\"");
}
if("1" == true){
  console.log("some string == true");
}
if(null == undefined){
  console.log("null == undefined");
}

/*
  NaN atau Not a Number tidak bisa di compare dengan equality biasa, dikarenakan
  setiap NaN bisa memiliki potensi nilai yang berbeda di dalam memory dan di consider sebagai sesuatu yang
  tidak bisa dibaca sebagai number.
*/
if(NaN === NaN){
  console.log("NaN is equal to NaN");
}
else{
  console.log("NaN is not equal to NaN");
}
if(NaN == NaN){
  console.log("NaN is equal to NaN");
}
else{
  console.log("NaN is not equal to NaN");
}

/*Gunakan isNaN method untuk melacak apakah component ini bisa dibaca sebagai number atau tidak.*/
if(isNaN(NaN)){
  console.log("Nan isNaN");
}
if(isNaN(5)){
  console.log("5 isNaN");
}
if(isNaN("some string")){
  console.log("some string isNaN");
}
if(isNaN("78")){
  console.log("convertable");
}

//Greater and Less than
var firstNumber = 23;
var secondNumber = 15;
var thirdNumber = 15;
if(firstNumber > secondNumber){
  console.log("first number bigger than second number");
}
if(secondNumber <= thirdNumber){
  console.log("second number is smaller or equal to third number");
}

//AND
console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);
console.log((firstNumber > secondNumber) && (secondNumber <= thirdNumber));
if((firstNumber > secondNumber) && (secondNumber <= thirdNumber)){
  console.log("both condition is true");
}
//lazy evaluation
var testVariable = 0;
false && (testVariable = 1);
console.log("test variable: ", testVariable);

//OR
console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);
console.log((firstNumber > secondNumber) && (secondNumber < thirdNumber));
if((firstNumber > secondNumber) && (secondNumber < thirdNumber)){
  console.log("one of the condition is true");
}
//Lazy evaluation can't be so lazy anymore
false || (testVariable = 1);
console.log("test variable: ", testVariable);