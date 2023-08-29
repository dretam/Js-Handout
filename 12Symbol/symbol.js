/*
  Symbol adalah tipe data primitive yang ada mulai dari Ecmascript 6, symbol tidak menggunakan instantiate
  setiap kali melakukan value assignment terhadap satu variable, karena Symbol hanyalah function.
*/
let symbolOne = Symbol();
let symbolTwo = Symbol();
let symbolThree = Symbol("X");
let symbolFour = Symbol("X");

//Symbole memiliki tipe data sendiri, yaitu symbol. Jadi ini merupakan tipe data baru pada javascript.
console.log(symbolOne);
console.log(symbolThree);
console.log(typeof symbolThree);

/*
  Seperti yang kalian ketahui, bahwa javascript memiliki data type coercion atau auto convert untuk kebanyakan kasus.
  Misalnya untuk alert, semua object atau variable yang masuk ke alert akan secara otomatis di convert jadi string.
  Tetapi tidak untuk symbol
*/
try{
  alert(symbolThree);
} catch (error){
  console.log("tidak bisa auto convert symbol menjadi string");
}

//Ini baru akan berhasil.
//alert(symbolThree.toString());

/*
  Lalu apa feature dan kegunaan dari Symbol? 
  Symbol akan selalu menghasilkan variable unik setiap kali di generate. Symbol bisa di-ibaratkan seperti UID/GUID (unique identifier)
  pada library di programming language atau procedural query language pada umumnya.
*/
if(symbolOne == symbolTwo){
  console.log("Kedua symbol identik");
} else {
  console.log("Membuktikan symbol tidak pernah identik");
}

if(symbolOne === symbolTwo){
  console.log("Kedua symbol identik");
} else {
  console.log("Membuktikan symbol tidak pernah identik");
}

if(symbolThree === symbolFour){
  console.log("Kedua symbol identik");
} else {
  console.log("Membuktikan symbol tidak pernah identik");
}

if(Symbol('A') === Symbol('A')){
  console.log("Kedua symbol identik");
} else {
  console.log("Membuktikan symbol tidak pernah identik");
}

/* 
  Symbol akan unik setiap kali di-generate oleh function Symbol(), tetapi akan tetap sama apabila di assign dari hasil
  yang sudah di generate.
*/
let symbolFive = symbolFour;

if(symbolFour === symbolFive){
  console.log("Kedua symbol sama.");
} else {
  console.log("Kedua symbol tidak sama.");
}

/*
  Lalu apa saja keterbatasan, aplikasi dan kegunaan Symbol?
  Berikut ini beberapa cara penggunaan atau pemanfaatan symbol.
*/

/* 
  1. FAKE ENUMERATION

  Javascript tidak seperti java yang memiliki enumeration, tetapi feature enumeration ini terkadang sangat diingikan oleh para developers.
  Pada umumnya para javascript developer memilih untuk menggunakan enumeration palsu dengan menggunakan object.
*/
{
  /*
    Privileges di bawah ini adalah enum palsu.
    Cara membuatnya adalah dengan menggunakan setiap field, menjadi 1 enum.
    Ditulis dengan menggunakan UPPERCASE untuk meniru enum pada java.
  */
  let privileges = {
    ADMINISTRATOR: 'admin',
    MODERATOR: 'mod',
    USER: 'usr'
  }
  /*
    tapi bisa diperhatikan enum palsu di atas, value dari field-fieldnya dibuat terpaksa.
    Di sini hanya ingin meng-hardcode bahwa setiap property memiliki nilainya sendiri.
  */

  /*function berikut terlihat seperti benar-benar menggunakan function, padahal sebenarnya setiap case
    membaca value dari object privileges, yaitu 'admin', 'mod', dan 'usr'.
  */
  let accessByPrivileges = userPrivileges => {
    switch(userPrivileges){
      case privileges.ADMINISTRATOR:
        console.log("Welcome Administrator, you can access all menus");
        break;
      case privileges.MODERATOR:
        console.log("Welcome Moderator, you can change view settings in preferences.");
        break;
      case privileges.USER:
        console.log("Welcome User, you can only view the content of this menu.");
        break;
      default:
        console.log("privileges not recognize");
        break;
    }
  }

  //Penggunaan enum seperti layaknya di java.
  let accessingPrivileges = privileges.USER;
  accessByPrivileges(accessingPrivileges);

  /*Tetapi karena isi dari enum adalah hardcode string, bisa saja ada pihak yang menaruh privilegesnya dengan string langsung.
    Sehingga nanti ada orang yang bisa tidak mengikuti tata cara enumeration.
  */
  let hardInput = "admin";
  accessByPrivileges(hardInput);
}

//Dengan menggunakan Symbol, kita bisa mengatasi masalah di atas. Teknik ini sering disebut Symbol as a Concept
{
  let privileges = {
    ADMINISTRATOR: Symbol('admin'),
    MODERATOR: Symbol('mod'),
    USER: Symbol('usr')
  }  

  let accessByPrivileges = userPrivileges => {
    switch(userPrivileges){
      case privileges.ADMINISTRATOR:
        console.log("Welcome Administrator, you can access all menus");
        break;
      case privileges.MODERATOR:
        console.log("Welcome Moderator, you can change view settings in preferences.");
        break;
      case privileges.USER:
        console.log("Welcome User, you can only view the content of this menu.");
        break;
      default:
        console.log("privileges not recognize");
        break;
    }
  }

  let accessingPrivileges = privileges.USER;
  accessByPrivileges(accessingPrivileges);

  //Ini tetap tidak akan bisa, jadi fungsi enumerationnya sempurna.
  let hardInput = Symbol('admin');
  accessByPrivileges(hardInput);
}

/* 
  2. PRIVATE PROPERTY KEYS
    
  Symbol dapat kita manfaatkan sebagai property/field atau method untuk object, atau sering disebut sebagai property keys.
  Property keys ditulis dengan [] pada property sebuah object.
*/
let surya = {};
{
  //Dengan mendeklarasi keys dengan let pada satu code-block, memungkinkan kita untuk membuat private member pada satu class.
  let studentID = Symbol();
  surya = {
    [studentID]: 3445689,
    firstName: "Suryadi",
    lastName: "Sudrajat"
  };
}
console.log(surya);
//studentID bersifat private, sehingga tidak mungkin untuk get atau set studentID di luar jangkauan deklarasinya.
//console.log(surya[studentID]);
{
  /*
    Dengan sifat unik Symbol, developer lain pada code-block lain tidak mungkin secara tidak sengaja menulis field atau method yang sama,
    dan mengakibatkan value pada existing property yang ada tertimpa.

    Walapun pada contoh di bawah kita menulis studentID lagi, tetapi studentID yang paling pertama tidak akan ditimpa.
  */
  let studentID = Symbol();
  surya[studentID] = 8888;
  console.log(surya);
}

/*
  3. IGNORED FIELD IN JSON

  Property keys dengan symbol pada suatu object tidak akan ikut di convert ke dalam string dengan method
  JSON.stringify(). Ini bisa dimanfaatkan, apabila ada property yang ingin dihilangkan pada saat proses AJAX.
*/
{
  let employeeID = Symbol();
  let jack = {
    [employeeID]: 8894080,
    firstName: "Jack",
    lastName: "Skellington"
  };
  console.log(jack);
  console.log(`Hasil convert dengan stringify ${JSON.stringify(jack)}`);
}

/*
  4. UNABLE TO FOR...IN

  Symbol yang digunakan sebagai index pada array tidak bisa di iterate
  dengan menggunakan for in iteration.
*/
{
  let groupOfPeople = [];
  groupOfPeople[Symbol("1345")] = "Alex";
  groupOfPeople[Symbol("6778")] = "Melissa";
  groupOfPeople[Symbol("4552")] = "George";

  let somePeople = [];
  somePeople["1345"] = "Alex";
  somePeople["6778"] = "Melissa";
  somePeople["4552"] = "George";    

  console.log("for in iteration untuk groupOfPeople")
  for(let person in groupOfPeople){
    console.log(person);
  }     
  console.log("for in iteration untuk somePeople");
  for(let person in somePeople){
    console.log(person);
  }   
}

/*
  5. UNIQUE LOG OR TRANSACTION

  Kita bisa memanfaatkan Symbol untuk mengisi log collection dalam map atau array dengan key yang selalu
  unik dan kita tidak perlu mengarang keynya atau sengaja membuat auto increment number.
*/
{
  let logs = new Map();
  logs.set(Symbol("error"), "There is an error in...");
  logs.set(Symbol("transaction"), "Transaction happen on...");
  logs.set(Symbol("error"), "There is an error in...");
  logs.set(Symbol("transaction"), "Transaction happen on...");
  logs.set(Symbol("update"), "Update in...");
  logs.set(Symbol("update"), "Update in...");

  for(let log of logs){
    console.log(log);
  }
}
