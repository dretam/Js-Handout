/*
  Karena constructor adalah function dan function pada javascript adalah object, kita bisa mendapatkan constructor seperti 
  melakukan tindakan get terhadap constructor.

  Note: object literal tidak dibuat dengan menggunakan constructor, sehingga tidak banyak informasi mengenai constructornya.
 */
var steven = {
  nama: "Steven Adinata",
  department: "IT Department",
  bekerja: function(){
    return "mendevelop aplikasi";
  }
}
console.log(steven.constructor); 
console.log(typeof steven.constructor);

/*
  Sebelum adanya class di ES 6, javascript bisa membuat object dengan style OOP lewat class-less constructor.
  Karena function adalah first-class object, sebuah function bisa memiliki property dan method sendiri selayaknya object,
  hal ini dimanfaatkan dengan cara membuat function menjadi sebuah constructor tak ber-class.

  class-less constructor bisa ditulis dengan function declaration maupun function expression, yang terpenting aturan penulisan
  dari class-less constructor adalah dengan menulisnya cara Pascal Case.
*/
var Karyawan = function(paramNama, paramDepartment){
  this.nama = paramNama;
  this.department = paramDepartment;
  this.bekerja = function(){
    return "mendevelop aplikasi";
  }
}
var maria = new Karyawan("Maria Sulaiman", "IT Department");
console.log(maria.constructor);
console.log(maria instanceof Karyawan); //kita juga bisa melakukan instanceOf terhadap class-less constructor

//Mendapatkan constructor dengan cara instantiate dengan class
let reno = new Employee("Reno", "Staff", "IT Department", new Date(27, 10, 1988), "Jakarta", 6000000);
console.log(reno.constructor);

/*
  Javascript memiliki feature prototyping pada object, yaitu sebuah feature yang mempersilahkan kita 
  memberikan class member (property maupun method), dimana merupakan default member.

  Member tersebut akan bisa dipakai oleh setiap object yang dibentuk class tersebut, namun setiap prototype member
  akan bisa dengan mudah di override oleh setiap individu object dan tidak mempengaruhi object lainnya yang tidak melakukan 
  override terhadap prototype tersebut
*/
function Mammal(name, species, family){
  this.name = name;
  this.species = species;
  this.family = family;
  this.introduction = function(){
    return this.name + " is a/an " + this.species + " and he/she is part of the " + this.family + " family.";
  }
}
console.log(Mammal.prototype);
console.log(typeof Mammal.prototype); //prototype akan dianggap sebagai object

//untuk menambahkan member prototype, kita harus menggunakan kata "prototype" diantara class dan member
Mammal.prototype.respiratory = "lungs";
Mammal.prototype.breathing = function(){
  return this.species + " is breathing with " + this.respiratory;
}

var garfield = new Mammal("Garfield", "Exotic Short-hair Cat", "Feline");
var flipper = new Mammal("Flipper", "Bottle-nose dolphin", "Cetacean");

//Menggunakan prototype member tidak berbeda dengan menggunakan member biasa.
console.log(garfield.breathing());

/*Ketika sebuah object membuat member yang namanya persis dengan member pada prototype,
  member pada prototype akan di override (bukan di set atau di replace).
  Sehingga object akan menggunakan member utamanya.
*/
flipper.respiratory = "aquatic lungs";
console.log(flipper.breathing());

//Untuk object yang tidak melakukan override, mereka akan tetap memakai member dari prototype
var rex = new Mammal("Rex", "German Shepard Dog", "Canine");
console.log(rex.breathing());

/*
  Dengan adanya prototyping, kita bisa melakukan teknik Monkey-patching .

  Monkey-Patching adalah teknik untuk menambahkan atau merubah feature pada system library / built-in object.
  Apabila kita merasa method di dalam object bawaan kurang dari yang kita mau, kita bisa tambahkan.
  Sebagai contoh dibawah, saya menambahkan method untuk seluruh variable dengan tipe data Number.
*/
Number.prototype.isEven = function(){
  return this%2 === 0;
}
Number.prototype.isOdd = function(){
  return this%2 === 1;
}
console.log(42..isEven());
console.log(42..isOdd());
console.log(31..isOdd());

/*
  Karena setiap function adalah first-class object, sehingga penggunaan kata this di dalam method
  sebuah constructor atau class bisa membingungkan.

  this bisa diartikan sebagai this dari this object atau this dari method.
  Sehingga bisa terjadi kesalahan sebagai berikut ini.
*/
function Programmer(name, competency){
  this.name = name;
  this.competency = competency;
  this.summarySkills = function(){
    for(index = 0; index < this.competency.length; index++){
      console.log(this.name + " capable how to " + competency[index]);
    }
  }
}
saskia = new Programmer("Saskia Sanjaya", ["PHP", "Javascript", "HTML", "CSS"]);
/*
  Nama saskia menghilang, dikarenakan this.name mencari nama dari summarySkills bukan mencari nama dari Programmer.
  Sedangkan yang punya nama adalah programmer, bukan method summarySKills.
*/
saskia.summarySkills(); 

/*
  Untuk mengatasi masalah diatas, kita bisa menggunakan arrow function (di jelaskan di chapter lain),
  object pointer trick atau dengan menggunakan bind
*/
kevin = {};
kevin.name = "Kevin Pratama";
kevin.competency = ["C#", "Java", "Javascript", "HTML"];

//Solusi 1, fake variable "that": set this kedalam sebuah variable sebelum dipakai.
kevin.thatSummarySkills = function(){
  that = this;
  this.competency.forEach(function(skill){
    console.log(that.name + " capable how to " + skill);
  });
}

//Solusi 2, bind: method yang disediakan untuk mengikat value this di dalam Function
kevin.bindSummarySkills = function(){
  this.competency.forEach(function(skill){
    console.log(this.name + " capable how to " + skill);
  }.bind(this));
}

kevin.thatSummarySkills();
kevin.bindSummarySkills();