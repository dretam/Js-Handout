//Function that return function
function perkalian(angkaPertama){
  return function(angkaKedua){
    return angkaPertama * angkaKedua;
  }
}
var kelipatanDua = perkalian(2);
console.log(kelipatanDua);
var hasil = kelipatanDua(5);
console.log(hasil);

//Function sebagai first-class object
function pangkat(number){
  return number * number;
}
console.log(pangkat.length);

pangkat.extraProperty = "tambahan property";
console.log(pangkat.extraProperty);

pangkat.extraFungsi = function(){ return "tambahan fungsi" };
console.log(pangkat.extraFungsi);
console.log(pangkat.extraFungsi());

//call: memperbolehkan object asing menggunakan fungi yang bukan miliknya
var alvin = {
  name: "Alvinadi Wijaya",
  alvinFunction : function(){ return "Ini fungsi milik " + this.name; }
}
var yuri = {
  name: "Yuri Gagarin"
}
function helloSomeone(){
  return "Hello, ada yang namanya " + this.name;
}
function helloID(id){
  return "Hello, ada yang namanya " + this.name + " dengan nomor id: " + id;
}
function helloArray(sequenceSatu, sequenceDua, sequenceTiga){
  return "buah kesukaan, "+ this.name + " adalah " + sequenceSatu + " & " + sequenceDua + " & " + sequenceTiga;
}
console.log(alvin.alvinFunction()); //cara manggil fungsi milik sendiri
//console.log(alvin.helloSomeone()); tidak akan bekerja
console.log(helloSomeone.call(alvin));
console.log(helloSomeone.call(yuri));
console.log(helloID.call(alvin, 3445)); //call dengan fungsi ber-parameter
console.log(alvin.alvinFunction.call(yuri)); //ambil fungsi object lain
console.log(helloID.call(null, 76689)); //saat gak ada object yang mengambil alih
console.log(alvin.alvinFunction.call(null));

//apply: sama seperti call, tapi sanggup manggil array sebagai multiple parameters
var tripletArray = ["Apel", "Jeruk", "Mangga"];
console.log(helloArray.call(alvin, tripletArray));//dengan call tidak akan berfungsi dengan baik
console.log(helloArray.apply(alvin, tripletArray));

//memoization: trick menggunakan custom property untuk membuat cache palsu

//single argument
function pangkatTiga(angka){
  pangkatTiga.simpenan = pangkatTiga.simpenan || {};
  if(!pangkatTiga.simpenan[angka]){
    pangkatTiga.simpenan[angka] = angka * angka * angka;
  }
  return pangkatTiga.simpenan[angka];
}
console.log(pangkatTiga(5));
console.log(pangkatTiga(2));
console.log(pangkatTiga(5));
console.log(pangkatTiga.simpenan);

//pakai multidimensional array untuk multiple parameter
function luasPersegi(panjang, lebar){
  if(luasPersegi.simpenan != null){
    luasPersegi.simpenan = luasPersegi.simpenan;
    if(!luasPersegi.simpenan[panjang]){
      luasPersegi.simpenan[panjang] = [];
    }
  }
  else {
    luasPersegi.simpenan = [];
    luasPersegi.simpenan[panjang] = [];
  }
  if(!luasPersegi.simpenan[panjang][lebar]){
    luasPersegi.simpenan[panjang][lebar] = panjang * lebar;
  }
  return luasPersegi.simpenan[panjang][lebar];
}
console.log(luasPersegi(50, 50));
console.log(luasPersegi(10, 20));
console.log(luasPersegi(5, 4));
console.log(luasPersegi(10, 50));
console.log(luasPersegi(5, 4));
console.log(luasPersegi.simpenan);

//salah satu trick untuk multiple argument, pakai dictionary
function luasSegitiga(alas, tinggi){
  luasSegitiga.simpenan = luasSegitiga.simpenan || {};
  if(!luasSegitiga.simpenan[alas.toString()+tinggi.toString()]){
    luasSegitiga.simpenan[alas.toString()+tinggi.toString()] = (alas * tinggi) / 2 ;
  }
  return luasSegitiga.simpenan[alas.toString()+tinggi.toString()];
}
console.log(luasSegitiga(50, 50));
console.log(luasSegitiga(10, 20));
console.log(luasSegitiga(5, 4));
console.log(luasSegitiga(10, 50));
console.log(luasSegitiga(5, 4));
console.log(luasSegitiga.simpenan);

//Generalized Functions: membuat function utama dan memodifikasinya dengan berbagai variant call-back
function hitungVolume(panjang, lebar, tinggi, rumusLuas){
  if(typeof rumusLuas === "function"){
    var luas = rumusLuas(panjang, lebar);
    var volume = luas * tinggi;
    return volume;
  }
  else{
    console.log("rumus luas bukan function");
  }
}
function hitungLuasSegitiga(alas, tinggi){
  var luas = (alas * tinggi) / 2;
  return luas;
}
function hitungLuasPersegi(panjang, lebar){
  var luas = panjang * lebar;
  return luas;
}
var volumeBalok = hitungVolume(5, 4, 3, hitungLuasPersegi);
console.log(volumeBalok);
var volumePrisma = hitungVolume(5, 4, 7, hitungLuasSegitiga);
console.log(volumePrisma);

//Closure: Global and Local Variable
var globalVariable = 5;
function simpleFoo(){
  var localVariable = 8;
  globalVariable = 44;
  localVariable = 67;
  console.log("ini global variable: " + globalVariable);
  console.log("ini local variable: " + localVariable);
}
console.log("ini global variable: " + globalVariable);
simpleFoo();
console.log("ini global variable: " + globalVariable);
//console.log("ini local variable: " + localVariable);

//closure fungsi di dalam fungsi
function mamalia(){
  var reproduksi = "melahirkan";
  function kucing(){
    var suara = "meong";
    console.log(suara);
    console.log(reproduksi);
  }
  //console.log(suara);
  console.log(reproduksi);
  kucing();
}
mamalia();

//closure dalam kasus function yang return Function
function counter(start){
  var index = start;
  return function(){
    return index++;
  }
}
var hitungMulaiDariSatu = counter(1);
console.log(hitungMulaiDariSatu());
console.log(hitungMulaiDariSatu());
console.log(hitungMulaiDariSatu());

//function membatasi closure terhadap variable, tetapi code block di dalam js tidak
var list = ["satu", "dua", "tiga"];
for (var index = 0; index < list.length; index++ ){
  console.log(list[index]);
}
console.log(index);

/*Self Invoked Function / IIFE (Immediately Invoked Function Expressions)
  function yang secara otomatis ke invoked pada saat di-define.

  biasanya digunakan untuk function main/ initialization
*/
(function(){
  console.log("I invoked my self");
}());

//Function yang menulis ulang dirinya sendiri
function pengumuman(){
  console.log("The Battle will begin shortly");
  pengumuman = function(){
    console.log("Champions! Prepare yourself, beat your opponent");
  }
}
pengumuman();
pengumuman();
pengumuman();

//percobaan kedua dengan Expressions
function warning(){
  console.log("There is danger ahead");
  warning = function(){
    console.log("Turn back or you will die here!");
  }
}
var peringatan = warning;
peringatan();
warning();

//Recursive function: loop dengan methode function yang invoke dirinya sendiri
function countDownLooper(maximum){
  console.log(maximum);
  if(maximum > 0){
    countDownLooper(maximum - 1) ;
  }
}
countDownLooper(5);

//Currying: fungsi alternative, saat parameter suatu fungsi tidak dilengkapi, maka fungsi akan mengembalikan fungsi lain.
function pangkatAlternative(pangkat, angka){
  if(angka === undefined){
    return function(angkaAlternative){
      return Math.pow(angkaAlternative, pangkat);
    }
  }
  else{
    return Math.pow(angka, pangkat);
  }
}
console.log(pangkatAlternative(3, 2));
var pangkatDua = pangkatAlternative(2);
console.log(pangkatDua(4));
