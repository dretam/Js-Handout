 /* 
    Object Reflection pada programming dikenal juga sebagai cara untuk melihat atau meng-inspeksi atau mengekspose
    semua member (field/ attribute, method) dari sebuah object, dengan menggunakan method/object/atau teknik di 
    yang berasal dari feature languagenya atau method dari librarynya pada saat run-time.
*/
class Employee{
    constructor(name, position, department, birthDate, birthPlace, salary){
      this.name = name;
      this.position = position;
      this.department = department;
      this.birthDate = birthDate;
      this.birthPlace = birthPlace;
      this.salary = salary;
    }
    getName = () => this.name;
    getPosition = () => this.position;
    getDepartment = () => this.department;
    getBirthDate = () => this.birthDate;
    getBirthPlace = () => this.birthPlace;
    getSalary = () => this.salary;
}
class PermanentEmployee extends Employee{
    constructor(name, position, department, birthDate, birthPlace, salary){
        super(name, position, department, birthDate, birthPlace, salary);
        this.annualSalary = this.getAnnualSalary();
    }
    getAnnualSalary = () => 12 * this.salary;
}

{
    let shanty = new Employee("Shanty", "Staff", "IT Department", new Date(27, 10, 1988), "Jakarta", 6000000);
    console.log("====================Employee Member===========================");

    //nama-nama dari member sebuah object bersifat iterable, sehingga kita bisa mengaksesnya dalam bentuk string satu persatu.
    for(let member in shanty){
      console.log(`Member: ${member}, Type: ${typeof shanty[member]}`);
    }
    //Reflection pada js cukup mudah, karena setiap member bisa diakses dengan key string.
    console.log(shanty["position"]);
    console.log(shanty["getName"]);

    //Di bawah ini adalah contoh mengeluarkan seluruh property milih object Permanent Employee
    let michael = new PermanentEmployee("Michael", "Supervisor", "Financial Department", new Date(11, 9, 1992), "Bandung", 8000000);
    console.log("\n====================Permanent Employee Property===========================");
    for(let property in michael){
        if(typeof michael[property] != "function"){
            console.log(`${property}: ${michael[property]}`);
        }        
    }

    Employee.prototype.nomorBPJS = "1234";  
    console.log("====================Own Property===========================");
    for(let member in michael){
        //Has own property bisa menyaring semua yang milik prototype bukan yang di extend pada class.
        if(michael.hasOwnProperty(member)){
            console.log(`${member}: ${michael[member]}`);
        }        
    }
    console.log("===========================================================");    
}


/*
  Property Descriptor: adalah cara untuk melakukan konfigurasi setiap property pada object javascript

  value: isi dari property
  writable: apakah value dari property ini immutable/writeable atau tidak, apabila false maka tidak bisa di set.
  enumerable: apakah property ini akan di proses ketika kita melakukan iteration pada object ini sendiri
  configurable: apakah property ini bisa di delete dan bisa di konfigurasi lewat defineProperty method.
*/
let peter = {
  name: "Peter",
  job: "Programmer",
  age: 33,
  skill: ["Java", "JS", "SQL"]
};
{
  Object.defineProperty(peter, "name", {
    value:"Peter",
    writable: false, //nama tidak bisa di set
    enumerable: false //nama tidak akan di detect dalam object enumerable
  });

  Object.defineProperty(peter, "job", {
    value:"Programmer",
    writable: false, //job tidak bisa di set
    configurable: false //property job tidak bisa dihapus di konfigurasi ulang
  });

  delete peter.job; //job dari peter tidak bisa dihapus
  /*
  mencoba defineProperty dari configurable false akan berakibat error.
  Object.defineProperty(peter, "job", {
    writable: true
  });*/

  peter.name = "Marco"; //nama Peter tidak akan berubah jadi marco karena writable: false
  console.log(peter.name);

  for (const property in peter) { //property name tidak akan muncul karena tidak enumerable
    console.log(`${property}: ${peter[property]}`);
  }
}

/*
    Pada ECMASCRIPT 5, terdapat beberapa reflection dengan menggunakan Object, misalnya Object.getOwnPropertyDescriptor.
    atau Objects.keys.

    Sekarang di ECMASCRIPT 6, kita bisa menggunakan method-method pada Reflect API library untuk
    melakukan aktifitas-aktifitas pada reflection.
*/
{
    /*
        Reflect.apply method: method ini digunakan untuk invoke function yang diberikan kepada satu object,
        dengan alternatif parameter dalam bentuk collection yang di spread.

        Reflect.apply(functionName, object, arrayArgs);
    */
    let printProgrammerCompetencies = function(competency1, competency2, competency3){
        return `${this.name} is a ${this.level} with ${competency1}, ${competency2}, ${competency3}`;
    }
    let john = {name: "John Voltage", level:"Senior Programmer"};
    let competencies = ["Java Programming", "HTML", "Javascript"];
    let summary = Reflect.apply(printProgrammerCompetencies, john, competencies);
    console.log(summary);

    /*
        Bila kalian belajar ECMA script versi sebelumnya, kalian akan tahu bahwa ada yang mirip dengan fungsi Reflect.apply,
        yaitu fungsi apply yang mirip seperti call.
    */
    let applyResult = printProgrammerCompetencies.apply(john, competencies);
    console.log(applyResult);

    /*
        Lalu apa perbedaan keduanya? Parameter collection pada apply bersifat optional,
        apabila tidak di masukan sebagai argument, makan hasil setiap parameternya hanya akan undefined.

        Sedangkan pada Reflect.apply, parameternya keharusan, sehingga apabila tidak ingin diberikan sama sekali,
        tetapi harus diisi dengan empty array [].
    */
    applyResult = printProgrammerCompetencies.apply(john);
    console.log(applyResult);

    //summary = Reflect.apply(printProgrammerCompetencies, john);
    //console.log(summary);

    let printEmployee = function(){
        return `${this.name} adalah seorang ${this.level}`;
    }
    summary = Reflect.apply(printEmployee, john, []);
    console.log(summary);

    console.log("===========================================================");    
}

{
    /*
        Reflect.set digunakan set sebuah property secara normal.
        return value dari Reflect.set adalah boolean yang menyatakan apakah process set berhasil atau tidak.
    */
    let desy = {};
    let property = "name";
    let propertyValue = "Desy Ratnasari";

    let hasil = Reflect.set(desy, property, propertyValue);
    console.log(desy);
    console.log(hasil);

    /*Reflect.get digunakan get value dari sebuah property.*/
    let name = Reflect.get(desy, 'name');
    console.log(name);

    console.log("===========================================================");      
}

{
    /*Reflect.defineProperty adalah cara menambahkan property dan valuenya dengan menggunakan Reflect API*/
    let desy = {};
    let property = "name";
    let propertyValue = "Desy Ratnasari";
    Reflect.defineProperty(desy, property, {value: propertyValue});
    let hasilDefineProperty = Reflect.defineProperty(desy, "birthDate", {value: new Date(1988, 11, 27)});
    console.log(`Hasil define property: ${hasilDefineProperty}`);

    //Reflect.defineProperty sama seperti pada Object.defineProperty, hanya saja berasal dari library Reflect.
    Object.defineProperty(desy, 'jenisKelamin', {value: "perempuan"});
    console.log(desy);

    /*
        Reflect.defineProperty(object, fieldName:string, {value: value, writable: boolean, enumerable: boolean, configurable: boolean}).
        value: adalah value atau isi dari field tersebut.
        writeable: menunjukan apakah value dari property ini bisa diubah. (by default: true)
        enumerable: menunjukan apakah value ini bisa di enumerate atau tidak. (by default: false)
        configurable: apakah fieldnya bisa diubah configurasinya atau bisa dihapus atau tidak.
    */
    Reflect.defineProperty(desy, 'nomorKTP', {value: "120068834", writable: false});
    Reflect.defineProperty(desy, 'citizenship', {value:'Indonesia', enumerable:true});
    Reflect.defineProperty(desy, 'kotaKelahiran', {value: "Jakarta", configurable:false});

    //nomorKTP tidak bisa diubah karena tidak writable
    desy.nomorKTP = '111';
    console.log(desy.nomorKTP);

    //hasilnya akan false karena gagal diubah valuenya.
    let hasilSet = Reflect.set(desy, 'nomorKTP', '111');
    console.log(`Hasil setnya: ${hasilSet}`);
    console.log(desy.nomorKTP);

    //Hanya citizenship yang bisa di inspect dengan iteration
    for(let property in desy){
        console.log(`${property}: ${desy[property]}`);
    }

    delete desy.kotaKelahiran;
    console.log(desy.kotaKelahiran);

    console.log("===========================================================");  
}

{
    /* 
        Reflect.construct adalah fungsi pada Reflect API yang digunakan untuk menggunakan constructor function
        dengan supply value dalam array secara berurutan.
    */
    function constructEmployee(name, position, department){
        this.name = name;
        this.position = position;
        this.department = department;
    }

    let arrayOfValue = ["Desy", "Senior Programmer", "IT Programmer"];
    const desy = Reflect.construct(constructEmployee, arrayOfValue);
    console.log(desy);
}