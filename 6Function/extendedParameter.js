/*
  Seperti yang ada pada C#, pada ecmascript versi 6 ke atas, function sudah bisa
  menggunakan default parameter.

  Default parameter adalah parameter yang mendapatkan satu default value apabila
  parameter tersebut tidak dipass oleh argument pada saat invoke functionnya.
*/
let calculation = (angkaPertama, angkaKedua = 2) => {
    return angkaPertama * angkaKedua;
  }
  console.log(calculation(7, 3));
  console.log(calculation(5)); //Default parameter 2 bertindak di sini.
  
  //Rest Parameter: parameter yang bisa merubah muliple parameter menjadi array
  //Rest parameter hanya bisa dipakai 1 dan harus ditulis terakhir atau hanya satu-satunya parameter yang dipakai.
  let printAndCalculate = (firstArg, ...secondArg) => {
    console.log("Argument pertama: " + firstArg);
    console.log(secondArg);
    console.log(firstArg * secondArg.length)
  }
  printAndCalculate(6, "Satu", "Dua", "Tiga");
  
  //Spread Operator: adalah parameter yang sifatnya kebalikan dari Rest parameter, Spread operator bisa menyebarkan array pada multiple parameter.
  let penjumlahan = (firstArg, secondArg, thirdArg) => {
    var sum = firstArg + secondArg + thirdArg;
    console.log(`Hasil arraynya ${firstArg}, ${secondArg}, ${thirdArg}`);
    console.log(`Hasil penjumlahan: ${sum}`);
  }
  let arrayNumber = [23, 12, 40];
  penjumlahan(...arrayNumber);
  
  let anotherArray = [10, 15];
  penjumlahan(10, ...anotherArray);
