/*Object di dalam javascript bisa dibuat dengan berbagai cara kurang lebih cara-caranya sebagai berikut*/

/*
  Object literal adalah cara menciptakan object dengan cara membuatnya tanpa menggunakan class, constructor atau
  lewat instantiate.
*/
var suryadi = {
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
console.log(suryadi['level']);//cara lain assessing property di JS
console.log(suryadi.summary());

//adding property or method
suryadi.department = "IT Department";
suryadi.allCompetencies = function(){
  this.competencies.forEach(function(value){
    console.log(value);
  });
};
console.log(suryadi.department);
suryadi.allCompetencies();

//removing property
delete suryadi.level;
console.log(suryadi.level);

/*
  JSON (Javascript Object Notation): adalah cara penulisan object pada javascript dimana object ini bisa di simpan dalam file .json.
  Dan bisa dikirim lewat http request connection.

  JSON adalah seni membuat object literal, dimana seluruh propertynya ditulis dengan string quotes dan seluruh propertynya
  memiliki keterbatasan tipe data, seperti hanya string, number dan boolean.

  JSON tidak bisa memiliki function karena tujuannya sebagai penyimpanan data dan JSON juga bisa memiliki collection berupa array.
*/
var suci = {
    "name": "Suci Mudiati",
    "jabatan": "Manager PMQI"
};
console.log(suci["name"] + " & " + suci["jabatan"]);

var karyawan = {
    "suci": {
        "name": "Suci Mudiati",
        "age": 30,
        "position": "Manager"
    },
    "tania": {
        "name": "Tania Larasati",
        "age": 22,
        "position": "Junior Staff"
    },
    "luthfi": {
        "name": "Muhammad Luthfi",
        "age": 28,
        "position": "Senior QA"
    },
    "krista": {
        "name": "Wulan Krista",
        "age": 28,
        "position": "System Analyst"
    }
};
console.log(karyawan["tania"]["name"]);
console.log(karyawan.luthfi.position);
console.log(karyawan["krista"].name);

//mengubah string dengan format JSON menjadi real object
var martine = '{ "name": "Martine Eka Putra", "jabatan": ".NET Department" }';
console.log(JSON.parse(martine));

//mengubah object jadi string
console.log(JSON.stringify(suci));

/* JSON and Array */
var karyawanArray = [
    {
      "name": "Suci Mudiati",
      "age": 30,
      "position": "Manager"
    },
    {
      "name": "Muhammad Luthfi",
      "age": 28,
      "position": "Senior QA"
    },
    {
      "name": "Wulan Krista",
      "age": 28,
      "position": "System Analyst"
    }
];
console.log(karyawanArray);
console.log(karyawanArray[0].name);

var karyawanJSONArray = {
  "karyawan":[
    {
      "name": "Suci Mudiati",
      "age": 30,
      "position": "Manager"
    },
    {
      "name": "Muhammad Luthfi",
      "age": 28,
      "position": "Senior QA"
    },
    {
      "name": "Wulan Krista",
      "age": 28,
      "position": "System Analyst"
    }
  ]
};
console.log(karyawanJSONArray);
console.log(karyawanJSONArray.karyawan[0].name);

//Nested JSON
employee = {
    "name":"Suci Mudiati",
    "age":30,
    "car": {
        "brand":"Toyota",
        "type":"Avanza Veloz",
        "maximumSpeed":"180km/h"
    }
 }
console.log(employee.car.brand);

employee = {
  "name": "Boby Widjaja",
  "games":[
    {
      "name" : "Diablo 3",
      "type" : "RPG"
    },
    {
      "name" : "Dragon Age 2",
      "type" : "RPG"
    },
    {
      "name" : "Battlefield 3",
      "type" : "FPS"
    },
  ]
}
console.log(employee.games[1].name);