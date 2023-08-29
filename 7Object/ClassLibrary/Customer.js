
/*Sama seperti pada Java, kita bisa inherit Class lain dengan menggunakan keyword extends*/
class Customer extends Person{

    constructor(name, gender, birthDate, birthPlace, customerCode, balance){
      //Constructor inheritancenya pun memiliki syntax yang sama dengan java, yaitu super() menandakan invocation terhadap super constructor.
      super(name, gender, birthDate, birthPlace);
      this.customerCode = customerCode;
      this.balance = balance;
    }
  
    //Kita bisa melakukan override seperti biasa.
    printBiodata = () => console.log(`Nama Customer: ${this.name}\nJenis Kelamin: ${this.gender}\nTanggal Lahir: ${this.birthDate}\nTempat Lahir: ${this.birthPlace}`);
    checkBalance = () => console.log(`Customer ID: ${this.customerCode}\nBalance: ${this.balance}`);
}