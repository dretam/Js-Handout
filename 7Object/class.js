/*
   Berbeda pada generasi Ecma Script versi sebelumnya, pada generasi 6 ke atas, kita bisa mendeklarasi class.
   Pada ecma script sebelumnya, kita hanya bisa membuat classless constructor atau constructor tanpa class yang dimana
   constructornya sebenarnya adalah fungsi yang menghasilkan object.
*/

//Penulisan nama class menggunakan Pascal Case seperti biasa.
class Student{

    /*
      Pada ecmascript, constructor ditulis literal, dan cara penggunaanya pun sama persis seperti bahasa oop seperti java dan c#.
      Yang membedakan adalah kita tidak perlu menulis deklarasi field/property. Pada saat ditulis di constructor, field tercipta dengan sendirinya.
    */
    constructor(name, faculty, major, semester, birthDate){
      this.name = name;
      this.faculty = faculty;
      this.major = major;
      this.semester = semester;
      this.birthDate = birthDate;
    }
  
    /*Kita bisa menulis function langsung di dalam code-block class tanpa menggunakan kata function, 
    dan function itu menjadi milik classnya, sama seperti java.*/
    calculateAge(){
      let today = new Date();
      let age =  today.getFullYear() - this.birthDate.getFullYear();
      if(today.getMonth() < this.birthDate.getMonth()){
        --age;
      }
      return age;
    }
  }
  
  let aditya = new Student("Aditya", "Information Technology", "Enterprise System Developer", 2, new Date(1992, 9, 21));
  console.log(`Aditya Name: ${aditya.name}`);
  console.log(`Aditya Faculty: ${aditya.faculty}`);
  console.log(aditya.calculateAge());
  
  //Untuk check classnya, kita masih menggunakan instanceof
  console.log(aditya instanceof Student);
  
  //Contoh membuat object lain dari class Employee.
  let shanty = new Employee("Shanty", "Staff", "IT Department", new Date(27, 10, 1988), "Jakarta", 6000000);
  console.log(`Shanty Position: ${shanty.position}`);
  console.log(`Shanty Department: ${shanty.department}`);
  shanty.printPersonalInformation();
  
  let donny = new Customer("Donny Darko", "Male", new Date(27,10,1988), "Jakarta", "K002A44D", 3500000);
  console.log(`Donny Name: ${donny.name}`);
  console.log(`Donny Customer Number: ${donny.customerCode}`);
  donny.birthPlace = "Washington";
  console.log(`Donny Birth Place: ${donny.birthPlace}`);
  donny.printBiodata();
  donny.checkBalance();
  
  //Sama seperti concept pada polymorphism di dalam Java, donny termasuk ke dalam Customer dan Person
  console.log(donny instanceof Customer);
  console.log(donny instanceof Person);
  
  let iphone = new Item();
  iphone.name = "Iphone 6s";
  iphone.type = "6s";
  iphone.color = "Gray";
  iphone.brand = "Apple";
  console.log(`Item name: ${iphone.name}`);
  console.log(`Item type: ${iphone.type}`);
  console.log(`Item color: ${iphone.color}`);
  console.log(`Item brand: ${iphone.brand}`);
  
  //Kita bisa menggunakan for in untuk melakukan object reflection pada satu object.
  console.log("====================Employee Property===========================")
  for(let property in shanty){
      if(typeof shanty[property] != "function"){
          console.log(`${property}: ${shanty[property]}`);
      }
  }