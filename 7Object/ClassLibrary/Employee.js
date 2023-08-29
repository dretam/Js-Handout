class Employee{
    constructor(name, position, department, birthDate, birthPlace, salary){
      this.name = name;
      this.position = position;
      this.department = department;
      this.birthDate = birthDate;
      this.birthPlace = birthPlace;
      this.salary = salary;
    }
  
    calculateAge = () => {
      let today = new Date();
      let age = today.getFullYear() - this.birthDate.getFullYear();
      if(today.getMonth() < this.birthDate.getMonth()){
        --age;
      }
      return age;
    }
  
    calculateAnnualSalary = () => {
      let annualSalary = 12 * this.salary;
      return annualSalary;
    }
  
    printPersonalInformation = () => console.log(`Nama karyawan ini: ${this.name}, posisinya: ${this.position}, departmentnya: ${this.department}, birthDate: ${this.birthDate.toDateString()}`);
}
  