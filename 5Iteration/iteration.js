var colors = [];
colors[0] = "merah";
colors[1] = "jingga";
colors[2] = "kuning";
colors[3] = "hijau";
colors[4] = "biru";
colors[5] = "nila";
colors[6] = "ungu";

//While
var index = 0;
while(index < 7){
  console.log(colors[index]);
  index++;
}

//Do While
index = 0;
do{
  console.log(colors[index]);
  index++;
} while(index < 7)

//For loop
for(var index = 0; index < 7; index++){
  console.log(colors[index]);
}

//Nested for loop
var steps = ["one", "two", "three"];
for(colorIndex = 0; colorIndex < 7; colorIndex++){
  console.log(colors[colorIndex]);
  for(stepIndex = 0; stepIndex < 3; stepIndex++){
    console.log(steps[stepIndex]);
  }
}

/**
 * Berikut ini adalah contoh method-method call-back yang digunakan untuk iteration.
 * Call back sendiri akan dijelaskan di chapter function.
 */

/*Tetapi method for each ini sudah tidak lagi trend, ini hanya digunakan pada javascript versi 5 ke bawah.*/
colors.forEach(function(colorValue, colorIndex, entireArray){
  console.log("Color at position " + colorIndex + " is " + colorValue + ", Entire Array: " + entireArray);
});

var numbers = [];
numbers[0] = 0;
numbers[1] = 1;
numbers[2] = 2;
numbers[3] = 3;
numbers[4] = 4;
numbers[5] = 5;
numbers[6] = 6;

/*
  Map method adalah fungsi for each yang dilengkap dengan callback yang digunakan untuk memproses dan mereturn setiap
  value di dalam collection sesuai dengan callback function.
*/
var tripleIt = function(param){
  return 3 * param;
}
var tripleNumbers = numbers.map(tripleIt);
console.log(tripleNumbers);

/*
  Filter method mengharapkan function callback yang return value dalam bentuk boolean.
  Setiap yang hasilnya true akan diambil ke dalam hasil, dan yang false akan di filter.
*/
function findEven(param){
  return param % 2 === 0;
}
var evenNumbers = numbers.filter(findEven);
console.log(evenNumbers);

let clusterOfFood = ["Chicken Teriyaki", "Asparagus", "Beef Burger", "Ice Cream"];

/*
  Kita bisa menggunakan for each tanpa foreach callback method pada ecmascript yang baru, dan methodnya mirip seperti for each pada java.
  Tetapi di dalam javascript kita tidak menyebutnya dengan for each, melainkan for of dan for in.
*/

//For of akan melakukan iteration pada value dari collection, bukan key/index-nya.
for (let food of clusterOfFood){
  console.log(`"Of" value of food: ${food}`);
}
//For in akan melakukan iteration pada key/index dari collection, bukan valuenya.
for (let foodIndex in clusterOfFood){
  console.log(`"In" index of food: ${foodIndex}`);
}

/*Kita akan ber-experiment melakukan iteration pada collection dimana menggunakan key string.*/
let clusterOfPeople = [];
clusterOfPeople["wx022"] = "Jack Starks";
clusterOfPeople["rx788"] = "Melissa Rauch";
clusterOfPeople["tr998"] = "Danny ";

/*
  Bisa kalian perhatikan bahwa loop pada value-nya dengan menggunakan for of gagal, sedangkan untuk setiap keynya dengan menggunakan in berhasil.
  For of tidak berfungsi untuk value diluar array dengan integer index.
*/
for (let person of clusterOfPeople){
  console.log(`"Of" value of person: ${person}`);
}
for(let personIndex in clusterOfPeople){
  console.log(`"In" index of person: ${personIndex}`);
}
