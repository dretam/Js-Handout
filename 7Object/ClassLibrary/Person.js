class Person{
    constructor(name, gender, birthDate, birthPlace){
      this.name = name;
      this.gender = gender;
      this.birthDate = birthDate;
      this.birthPlace = birthPlace;
    }
  
    printBiodata = () => console.log(`Nama: ${this.name}\nJenis Kelamin: ${this.gender}\nTanggal Lahir: ${this.birthDate}\nTempat Lahir: ${this.birthPlace}`);
}