/*
  Pada ECMASCRIPT 6, deklarasi variable tidak hanya bisa dilakukan dengan "var" saja.
  Kita bisa melakukannya dengan "const" atau constant.

  Constant sama dengan programming language seperti java dan C#, dimaksudkan sebagai read-only variable yang harus langsung 
  di initialize atau langsung di assign valuenya.
*/
var normalVariable = "Normal Variable";
const constantVariable = "Constant Variable";

normalVariable = "Update Normal Variable";

/*
  Constant tidak bisa diupdate, sama seperti constant statment pada programming language yang lain.
  Updating constant variable pada javascript akan mengakibatkan run time error.
*/
//constantVariable = "Update Constant Variable";
console.log(normalVariable);
console.log(constantVariable);
console.log(typeof constantVariable); //Constant akan memberikan tipe data yang sama, di sini tidak ada perbedaanya dengan deklarasi var.

/*tidak selayaknya variable yang dideklarasi dengan var pada umumnya, constant bukan merupakan bagian dari window property, 
oleh karna itu hasilnya akan undefined apabila diakses dengan menggunakan window.property*/
console.log("Normal Variable as Window Property: " + window.normalVariable);
console.log("Constant Variable as Window Property: " + window.constantVariable);

/*
  Pada pembelajaran bahasa pemrograman lain, hal di bawah ini tidak boleh dilakukan karena akan terjadinya double declaration.
  Double declaration akan menghasilkan compile error karena setiap variable harus unik.

  Hal ini tidak masalah di javascript, simplenya variable lama akan di gantikan dan di reset ulang dengan variable baru dengan nama yang sama.
  Ini menjadi masalah baru bagi programmer javascript, dimana bugs akan lebih sulit di trace dan penamaan yang sama bisa membingungkan banyak programmer.
  Untuk itu ECMASCRIPT 6 memberikan satu deklarasi baru yang disebut dengan "let".
*/
var something = 6;
var something = 90;

/*
  Let adalah deklarasi yang sifatnya exclusive terhadap setiap code-block. Setiap variable yang dideklarasi oleh let secara global variable,
  nilainya bisa dibaca dan diubah, tetapi apabila di deklarasi ulang di dalam code-block, maka nama variable tersebut akan exclusive dengan code block tersebut.
*/
let sesuatu = 80;
//let sesuatu = 50; // tidak bisa dilakukan dengan let, akan menyebabkan error.

let letVariableOne = "One";
let letVariableTwo = "Two";
let letVariableThree;
var normalVariableX = "X";
var normalVariableY;

/*Seperti yang kalian bisa lihat, seluruh value pada let masih di variable masing-masing sampai saat ini.*/
console.log(letVariableOne);
console.log(typeof letVariableTwo); //typeof pada let juga tidak memiliki perbedaan, seperti layaknya variable biasa.
console.log(letVariableThree); //let tidak seperti pada const, kita bisa membuatnya undefined atau tanpa value dan tanpa tipe data.
console.log("Let Variable as Window Property: " + window.letVariableOne); //Sama seperti dengan const, let bukan merupakan bagian dari window.property.

{//code-block start
  /*Tetapi mencoba mengakses letVariableOne akan menyebabkan error, sedangkan tidak pada letVariableTwo.*/
  //console.log(letVariableOne);
  console.log(letVariableTwo);
  console.log(normalVariableY);
  /*
    Kalau kalian perhatikan nilai letVariableOne di debugger, valuenya kembali undefined, tetapi bukan value undefinednya
    yang menyebabkan error, karena normalVariableY sendiri tidak mengalami masalah apa-apa, tetapi karena adanya 
    deklarasi letVariableOne yang baru akan membuat letVariableOne di reset lagi dan mengakibatkan error kalau letVariableOne tidak pernah di initialize.
  */
 let letVariableOne = "Let One in Block"; //Apabila di deklarasi baru akan membentuk entity baru khusus untuk code-block ini.
 letVariableTwo = "Let Two in Block"; //Tapi kita juga simplenya bisa me-replace nilai let, tapi tidak dengan deklarasi baru.

  //Hal ini tidak akan ada bedanya dengan var, baik dengan deklarasi ulang maupun tidak, hasilnya akan sama saja.
  console.log(normalVariableX);
  var normalVariableX = "Normal X in Block";
  normalVariableY = "Normal Y in Block";
  var normalVariableZ = "Normal variable Z";
}//code-block end

/*
  Perhatikan hasil di bawah ini. normalVariableX akan direplace dengan variable di dalam code-block seperti yang kita sudah ketahui sebelumnya.

  Let sifatnya berbeda dengan prinsip ini, hasil dari letVariableOne akan kembali seperti pada global variablenya, itu karena letVariableOne yang ada di luar
  dan di dalam scope berbeda satu sama lain.

  Ini membuat debugging let akan lebih mudah, terutama di javascript environment dimana compiler, transpiler dan debugging tidak se-conveniet di java.
  Tetapi perhatikan hasil letVariableTwo, tanpa deklarasi baru, konsep local dan global variable terjadi seperti biasanya, 
  oleh sebab itu hasil dari letVariableTwo akan di update.
 */
console.log("Normal variable X: " + normalVariableX);
console.log("Let variable one: " + letVariableOne);
console.log("Let variable two: " + letVariableTwo);
console.log("Normal variable Z: " + normalVariableZ);

{
  /*
    Kesimpulannya seperti contoh di bawah ini, deklarasi yang beda scope tidak akan dikenali oleh scope lain.
    Membuat let sifatnya sedikit lebih mirip deklarasi variable pada java.
  */
  //let contohLet = "Contoh Let";
}
//console.log(contohLet);

/* 
  Kita akan melakukan experiment lain yang membedakan antara var dan let.
  Di bawah ini kita akan membuat array, dimana array tersebut adalah collections yang berisikan functions yang print out sebuah variable.
  Yang pertama kita akan membuatnya untuk print variable dengan var, yang kedua dengan let.
*/

/*
  Membuat fungsi dan menambahkan nya dengan callback ke dalam array, dimana fungsi tersebut
  print out var variable satu persatu.
*/
var arrayFunctionVar = [];
for(var indexV = 0; indexV < 10; indexV++){
  arrayFunctionVar.push(
    function(){
      console.log(indexV);
    }
  );
}
//indexV terakhir bernilai 10 karena indexL sempat dijumlahkan, baru dicegah masuk ke dalam code block.
console.log("Index terakhir: " + indexV);

/*
  Membuat fungsi dan menambahkan nya dengan callback ke dalam array, dimana fungsi tersebut.
  print out let variable satu persatu.
*/
var arrayFunctionLet = [];
for(let indexL = 0; indexL < 10; indexL++){
  arrayFunctionLet.push(
    function(){
      console.log(indexL);
    }
  );
}
//Seperti biasanya, indexL tidak akan bisa diraih karena deklarasinya di dalam code-block.
//console.log("Index terakhir: " + indexL);

console.log("Hasilnya dengan var:");
iterate(arrayFunctionVar);
console.log("Hasilnya dengan let:")
iterate(arrayFunctionLet);

/* 
  Fungsi ini akan menginvoke seluruh isi fungsi array satu persatu.
  Hasil dari var adalah 10 semua, sedangkan let mulai dari 0 - 9

  Var menghasilkan 10 karena pada saat function di simpan dalam array, index tidak disimpan secara value, melainkan hanya referensinya saja.
  Hasilnya ketika di invoke, function akan print index terakhirnya saja, yaitu 10.

  Sedangkan untuk let, index disimpan berkali dan dibuatkan terpisah independent untuk setiap scope, sehinga hasilnya masih 0 - 9.
*/
function iterate(arrayArg){
  arrayArg.forEach(function(value){
    value();
  });
}

/*Gunakanlah let sebanyak-banyaknya untuk menghindari kekeliruan terutama di situasi code-block dalam scope berlebih.*/