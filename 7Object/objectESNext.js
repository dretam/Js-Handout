/*
  Masing ingat cara penulisan Object Literal pada pelajarang Javascript sebelumnya?
  Ini adalah penulisan Object Literal pada ECMASCRIPT 5
*/
let suryadi = {
    name: "Suryadi Sulaiman",
    position: "Web Programmer",
    level: "Staff",
    age: 31,
    hiredate: new Date('10 October 2017'),
    competencies: ["C#", ".NET Framework", "HTML", "CSS", "JS", "SQL Server"],
    summary: function(){
      var summary = this.name + " is a(an) " + this.level + " that work as a(an) " +  this.position + ". \n" +
        this.name + " is " + this.age + " years old, which start working here since " + this.hiredate.getDate() + ".";
      return summary;
    }
  };
  console.log(suryadi.name);
  
  {
    /*
      Pada ECMASCRIPT 6, kita bisa melakukannya dengan alternative seperti berikut ini.
    */
    let name = "Melissa Widjaja";
    let position = "Financial Clerk";
    let level = "Staff";
    let age = 25;
    let hiredate = new Date('5 May 2018');
    let competencies = ["Java", "Oracle DB", "ZK"];
    let summary = function(){
      var summary = this.name + " is a(an) " + this.level + " that work as a(an) " +  this.position + ". \n" +
        this.name + " is " + this.age + " years old, which start working here since " + this.hiredate.toDateString() + ".";
      return summary;
    }
    let melissa = {name, position, level, age, hiredate, competencies, summary}; //Lalu kita akan menggabungkannya ke object setelahnya.
    console.log(melissa.position);
    console.log(melissa.summary());
  
    /*
      Kita bisa menyampur konsep pembuatan object dengan metode ES5 dan ES6, dan kita bisa manfaatkan property yang sudah dibuat sebelumnya,
      misalnya position.
  
      metode penambahan seperti ini suka disebut sebagai object Enhancement.
    */
    let rudy = {
      name: "Rudy Harianto",
      position
    }
    console.log(rudy.name + " is a " + rudy.position);  
  }
  
  /*
    Mengadopsi sifat JSON, properties juga bisa ditulis dengan cara seperti dibawah ini
    dengan menggunakan string.
  */
  let johan = {
    ["firstName"]: "Johannes Edenburg",
    ["position"]: "Accounting Clerk"
  }
  console.log(johan.firstName);
  
  //Di sini kita akan membuat 2 contoh object
  let gabriel = {
    name: "Gabriella Santoso",
    department: "Marketing"
  }
  let muriah = {
    name: "Muriarti Sandewi",
    department: "Human Resources"
  }
  
  /*
    Seperti yang kita ketahui bahwa object sifatnya reference type, jadi
    walaupun kita membuat copy object dan kita merubah property dari copy object tersebut, maka
    value dari property object aslinya juga akan ikut berubah.
  */
  let copyGabriel = gabriel;
  copyGabriel.name = "Test Satu";
  console.log(gabriel.name);
  
  /*
    Pada ES6, kita memiliki feature untuk object assign.
    Object assign akan menduplikat object selayaknya dia value type, sehingga value property dari object original dan copy object akan berbeda,
    karena tidak ada reference.
  */
  let copyMuriah = Object.assign({}, muriah);
  copyMuriah.name = "Test Dua";
  console.log(muriah.name);
  
  //object assign juga bisa dimanfaatkan untuk menggabungkan property-property dari banyak object ke dalam satu object.
  let objectSet1 = {
    propertyOne:"propertyOne",
    propertyTwo:"propertyTwo"
  }
  let objectSet2 = {
    propertyThree:"propertyThree"
  }
  let objectSet3 = {
    propertyFour:"propertyFour"
  }
  let objectSet = Object.assign({}, objectSet1, objectSet2, objectSet3);
  console.log(objectSet);
  console.log(objectSet1);
  console.log(objectSet2);
  console.log(objectSet3);
  /*
    assign merupakan method yang terdiri dari 2 macam parameter (target, source1, source2, source3, ...)
    dari semua contoh diatas, parameter target dibuat berupa anonymous object, apabila bukan anoymous object, maka contohnya akan
    seperti di bawah ini.
  */
  let objectSet = Object.assign(objectSet1, objectSet2, objectSet3);
  objectSet1.propertyOne = "Changes";
  console.log(objectSet);
  console.log(objectSet1);
  console.log(objectSet2);
  console.log(objectSet3);