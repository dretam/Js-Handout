/*
  Arrow Function adalah penulisan function dengan arrow expression, yang bentuknya sama dengan lambda expression pada C#
  Kita akan membandingan 2 function, yang pertama dengan function expression yang kedua dengan lambda expression dengan operasi yang sama.
*/
var helloWorld = function(){
    console.log("Hello World");
    console.log("Invoking function");
  };
  var helloWorldArrowed = () => {
    console.log("Hello World");
    console.log("Invoking function");
  };
  helloWorld();
  helloWorldArrowed();
  
  /*Kita juga bisa mengkombinasikan arrowed function dengan callback, sehingga bisa menulis operasi yang lebih rumit*/
  let mailWritter = (toPerson, callback) => {
    console.log("Dear ", toPerson);
    callback();
  }
  let merryChristmas = () => console.log("Merry Christmas for you and your family!");
  mailWritter("Harvey", merryChristmas);
  
  /*Saat function hanya memiliki 1 parameter, kita bisa menghapus bracketnya, 
  tetapi pada saat body dari method memiliki return, kita wajib menggunakan code block*/
  let sayHello = subject => {return `Hello ${subject}`};
  console.log(sayHello("World"));
  
  /*Apabila satu-satunya operasi pada body method adalah return, kita tidak perlu menulis returnnya.*/
  let square = function(side){
    return side * side;
  };
  let arrowedSquare = side => side * side;
  let panjangSisi = 6;
  console.log(`function biasa: ${square(panjangSisi)}`);
  console.log(`dengan =>: ${arrowedSquare(panjangSisi)}`);
  
  /*
    Bisa kalian lihat, untuk function dengan operasi yang pendek, bisa dibuat lebih singkat dengan arrow expression, tetapi keuntungan dari
    arrow expression tidak meliputi itu saja.
  
    arrow function juga bisa mengatasi masalah binding pada this di function callback dalam object method.
  */
  kevin = {};
  kevin.name = "Kevin Pratama";
  kevin.competency = ["C#", "Java", "Javascript", "HTML"];
  
  kevin.summarySkills = function(){
    this.competency.forEach(function(skill){
      console.log(`${this.name} capable how to skill`);
    });
  }
  /*Ini tidak akan bekerja dengan seharusnya, this.name akan kehilangan informasi thisnya.*/
  kevin.summarySkills(); 
  
  /* Dengan menggunakan arrow function, kita tidak perlu lagi menggunakan variable "that" atau menggunakan binding.*/
  kevin.arrowedSummarySkills = function(){
    this.competency.forEach((skill) => console.log(`${this.name} capable how to ${skill}`));
  }
  kevin.arrowedSummarySkills();
  
  /*Untuk penulisan object literal, kita harus menambahkan bracket () lalu setelahnya baru code-block*/
  let getSuryadi = () => ({
    name: "Suryadi Sulaiman",
    position: "Web Programmer",
    level: "Staff",
    age: 31,
    hiredate: new Date('10 October 2017'),
    competencies: ["C#", ".NET Framework", "HTML", "CSS", "JS", "SQL Server"],
    summary: function(){
      let summary = `${this.name} is a(an) ${this.level} that work as a(an) ${this.position}. ${this.name} is ${this.age} 
        years old, which start working here since ${this.hiredate.getDate()}.`;
      return summary;
    }
  });
  console.log(getSuryadi().summary());