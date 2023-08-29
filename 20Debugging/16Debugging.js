//global strict, kurang bagus dipake karena maksa seluruh isi js untuk strict
/*
"use strict";
test = "hallo";
*/

//pake di dalam function
/*
function strictly(){
  "use strict";
  pi = 3.142;
}
strictly();
*/

//feature detection
if(window.unicorn){
  console.log("Ada method yang namanya unicorn");
  unicorn();
}

if(window.alert){
  console.log("ada method yang namanya alert");
}

//consoles trace: melacak mana yang selesai di eksekusi duluan
function firstFunction() {
  function secondFunction() {
    console.trace();
  }
  secondFunction(); //invoking second function
}
firstFunction();

//debugger
function testingBreakPoints(){
  console.log("inisialisasi");
  //debugger;
  console.log("terminasi");
}
testingBreakPoints();

//Error Object
var error = new Error("Oops, ada yang error nih!"); //general error
var typeError = new TypeError("Lu harus pake variable number untuk fungsi ini");
var rangeError = new RangeError("Gak boleh pake angka negatif");
var referenCeError = new ReferenceError("lu pake property atau method yang gak pernah ada");
var syntaxError = new SyntaxError("kayaknya lu ada salah tulis");

function akarDua(number){
  "use strict";
  if(typeof number != "number"){
    throw typeError;
  }
  else if(number < 0){
    throw rangeError;
  }
  else{
    return Math.sqrt(number);
  }
}

//Try, Catch, and Finally
function akarDuaCatch(number){
  "use strict";
  try{
    return akarDua(number);
  }
  catch(error){
    return akarDua(-number) + " sudah dikoreksi";
  }
}

function akarDuaFinally(number){
  "use strict";
  try{
    var result = akarDua(number);
  }
  catch(error){
    result = (-number) + " sudah dikoreksi";
  }
  finally{
    return "+/-" + result;
  }
}
