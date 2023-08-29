/*
    Proxy adalah cara yang digunakan untuk meng-custom operasi yang biasa dilakukan pada object,
    contohnya seperti property lookup, assignment, enumeration, function invocation.

    Untuk membuat sebuah property object, diperlukan 4 hal:
        1. Proxy object adalah object utama yang digunakan untuk meng-custom operasi yang biasa dilakukan pada object..
        2. Handler adalah object yang berisikan method-method traps, setiap proxy object membutuhkan handler untuk customisasinya.
        3. Traps adalah method yang dibuat di dalam object handler yang gunanya untuk mengakses property pada sebuah object.
            Method-method traps sudah ditentukan untuk sebuah handler yang bisa dikenali proxy.
        4. Target atau object target adalah object utama yang menjadi sasaran yang ingin di tangani handler.
*/
{
    //personHandler adalah sebuah handler
    let personHandler = {
        /*
            get di sini adalah traps milik personHandler. traps get akan dijalankan
            setiap ada aktifitas mengambil value dari sebuah field.
        */
        get: function(target, property){
            if(property in target){
                return target[property];
            } else {
                return "Field/Property tidak ditemukan";
            }
        }
    };
    
    //charlie adalah target object dalam contoh ini.
    let charlie = {name: "Charlie Sheen", gender: "Male", birthDate: new Date(1976, 4, 21)};

    //charlieProxy adalah object proxy yang digunakan untuk menghubungkan target object dengan
    let charlieProxy = new Proxy(charlie, personHandler);

    /*
        Setiap tindakan get dibawah ini akan menggunakan method traps yang ada pada handler,
        selama kita menggunakan object proxy.

        Perhatikan untuk yang property birthCity, akan dikembalikan dalam string "Field/Property tidak ditemukan".
    */
    console.log(charlieProxy.name);
    console.log(charlieProxy.gender);
    console.log(charlieProxy.birthDate);
    console.log(charlieProxy.birthCity);

    //Cobalah inspect dan lihat isi dari object proxy.
    console.log(charlieProxy);
    console.log("===========================================================\n\n");
}

{
    /*
        Di sini kita membuat sebuah handler dengan get trap dan set trap.

        Dimana get trap kita akan menghitung berapa kali value dari property name dan citizen di ambil.
        Dan apabila property tidak dikenali, maka yang akan kembali adalah string "Unidentify property"

        Untuk set, setiap terjadinya set, akan langsung diberi kabar kalau set name dan citizenship berhasil.
        Apabila merupakan field baru, maka akan ada pemberitahuannya juga. Sama seperti get, set juga menghitung berapakali terjadi.
     */
    let personHandler = {
        getNameCounter: 0,
        getCitizenshipCounter: 0,
        setNameCounter: 0,
        setCitizenshipCounter: 0,
        get: function(target, property, proxyObject){ //Setiap trap memiliki parameters yang sudah ditentukan, tetapi tidak harus dipakai semua.
            switch(property){
                case "name":
                    this.getNameCounter++;                   
                    break;
                case "citizenship":
                    this.getCitizenshipCounter++;
                    break;
                default:
                    return "Unidentify property";
            }
            return target[property];
        },
        set: function(target, property, value){
            switch(property){
                case "name":
                    this.setNameCounter++;                   
                    console.log("Changing name complete!");
                    break;
                case "citizenship":
                    this.setCitizenshipCounter++;
                    console.log("Changing citizenship complete!");
                    break;
                default:
                    console.log("New Property has been set!");
                    break;
            }            
            target[property] = value;
        }

    };

    let chris = { name: "Christopher Paolini", citizenship: "Brazil", gender: "Male"};
    let chrisProxy = new Proxy(chris, personHandler);

    let stephen = { name: "Stephen King", citizenship: "USA", gender: "Male" };
    let stephenProxy = new Proxy(stephen, personHandler);

    console.log(`Mendapatkan nama chris dengan proxy: ${chrisProxy.name}`);
    console.log(`Mendapatkan nama chris dengan proxy: ${chrisProxy.name}`);

    //Get name dengan chris biasa tidak akan mendapatkan effect apa-apa dari handler.
    console.log(`Mendapatkan nama chris dengan object target: ${chris.name}`);
    console.log(`Berapa kali nama di get?: ${personHandler.getNameCounter}`);

    console.log(`Mendapatkan nama stephen dengan proxy: ${stephenProxy.name}`);
    console.log(`Berapa kali nama di get?: ${personHandler.getNameCounter}`);
    //getNameCounter akan menghitung semua get name, selama berasal dari handler yang sama.

    console.log(`Mendapatkan citizenship chris dengan proxy: ${chrisProxy.citizenship}`);
    console.log(`Berapa kali citizen di get?: ${personHandler.getCitizenshipCounter}`);

    chrisProxy.citizenship = "Mexico";
    console.log(`Perubahan value dari citizenship akan terjadi juga pada object chris yang sebenarnya: ${chris.citizenship}`);
    console.log(`Perubahan yang terjadi pada citizenship ${personHandler.setCitizenshipCounter}`);

    chrisProxy.name = "Chris Evans";
    chrisProxy.birthDate = new Date(1986, 9, 12);
    console.log(`Tanggal ulang tahun chris: ${chris.birthDate.toDateString()}`);

    /*
        Keuntungan dari proxy adalah, kita bisa selalu menggunakannya dan tidak menggunakannya setiap saat.
        Apabila semua feature proxy diberikan di dalam objectnya langsung, maka setiap object harus menggunakannya.
        Pada proxy, bila anda tidak ingin menggunakan handlernya, anda tinggal langsung kembali ke object targetnya, 
        dan semua update yang dilakukan pada proxy akan tercatat juga di object target.
    */

    console.log("===========================================================\n\n");
}

{
    /* 
        Kali ini kita akan mencoba beberapa traps dan akan kita uji coba-kan dengan
        object yang dibuat dengan Employee class.
    */
    class Employee{
        constructor(employeeID, name, position, department, birthDate, birthPlace, salary){
            this._employeeID = employeeID;
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

    /* 
        Dalam kasus ini kita akan membuat sebuah handler class, sehingga kita bisa membuat banyak handler object yang berbeda-beda
        yang disediakan untuk setiap target object.
     */
    class EmployeeHandler{
        constructor(mutationNotification, promotionNotification){
            /*
                mutationNotification adalah kata-kata yang digunakan apabila karyawan dipindahkan departmentnya.
                promotionNotification adalah kata-kata yang digunakan apabila karyawan berubah posisinya.
            */
            this.mutationNotification = mutationNotification;
            this.promotionNotification = promotionNotification;

            /*
                Counter saya ciptakan untuk array dimana bisa menghitung setiap aktifitas get dan set
                dari setiap field yang ada.
            */
            this.setPropertyCounter = [];
            this.getPropertyCounter = [];
        }
        //traps get di-trigger pada saat mendapatkan satu value dari field
        get = (target, property) => {
            /*Ini adalah trik yang digunakan untuk mengambil handler di dalam proxy.*/
            if(property === '[[Handler]]'){
                return this;
            }
            if(!(property in target)){
                console.log("There is no such property in this object");
                return;
            }
            if(this.getPropertyCounter[property] === undefined){
                this.getPropertyCounter[property] = 1;
            } else {
                this.getPropertyCounter[property]++;
            }
            console.log(`${property} property, has been get ${this.getPropertyCounter[property]} times.`);
            return target[property];
        }
        //traps set di-trigger pada saat mengubah atau membuat satu value dari field.
        set = (target, property, value) => {
            if(!(property in target)){
                console.log(`Set a new property ${property}`);
            }
            if(this.setPropertyCounter[property] === undefined){
                this.setPropertyCounter[property] = 1;
            } else {
                this.setPropertyCounter[property]++;
            }          
            console.log(`Updating ${property} value, successfull.`);
            if(property == "department"){
                console.log(this.mutationNotification);
            }
            if(property == "position"){
                console.log(this.promotionNotification);
            }
            console.log(`${property} property, has been set ${this.setPropertyCounter[property]} times.`);
            target[property] = value;
        }
        //traps has di-trigger pada saat pengecekan existensi property di dalam object.
        has = (target, property) => {
            /*
                mendeteksi penulisan underscore di depan field,
                ini adalah naming convention di sebagian bahasa pemrograman, bahwa underscore menyatakan private field.
            */
            if (property[0] === "_"){
                console.log(`${property} property in this object is private.`);
                return false;
            } 
            if(!(property in target)) {
                console.log(`There is no such ${property} property in this object.`);
                return false;
            }
            console.log(`You found ${property} property in this object.`);
            return property in target;
        }
        //traps delete di-trigger pada saat penghapusan satu property.
        deleteProperty = (target, property) => {
            if(property in target){
                delete target[property];
            } else {
                console.log(`There is no such ${property} property in this object.`);
            }
        }
    }

    /*Ini adalah class khusus untuk handlin function.*/
    class PersonFunctionHandler{
        constructor(){
            this.invokeFunction = [];
        }
        /* apply adalah traps yang di-trigger saat target method di invoke */
        apply = (method, thisArg, argumentsList) => {
            console.log(`Method ${method.name} dijalankan dengan argument: ${argumentsList}.`);
            if(this.invokeFunction[method.name] === undefined){
                this.invokeFunction[method.name] = 1;
            } else {
                this.invokeFunction[method.name]++;
            }       
            switch(method.name){
                case "calculateAge":
                    return `${method(...argumentsList)} tahun`;
                case "calculateAnnualSalary":
                    return formatNumber(method(...argumentsList));
                default:
                    return method(...argumentsList);
                    break;
            }
        }
    };

    //function untuk format uang.
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    function penjumlahan(numberOne, numberTwo, numberThree){
        return numberOne + numberTwo + numberThree;
    }

    /*
        Sekarang dua object yang berbeda, adrian dan maria bisa mendapatkan handler yang total berbeda.
        Dari notification dan counternya akan berbeda.
    */
    var adrian = new Employee(345597, "Adrian Maulana", "Senior Programmer", "IT Department", new Date(1988, 10, 27), "Jakarta", 12000000);
    var adrianProxy = new Proxy(adrian, new EmployeeHandler("This employee has been mutate to other Department", "This employee has been promoted"));

    var maria = new Employee(778991, "Maria Magdalena", "Financial Officer", "Financial Department", new Date(1958, 10, 5), "Bandung", 8000000);
    var mariaProxy = new Proxy(maria, new EmployeeHandler("Changing department...", "Congratulations for the promotion"));

    console.log("========================GET FIELDS=========================");
    console.log(adrianProxy.name);
    console.log(adrianProxy.name);
    console.log(adrianProxy.department);
    console.log(adrianProxy.position);
    console.log(adrianProxy.position);
    console.log(adrianProxy.position);
    console.log(adrianProxy["[[Handler]]"].getPropertyCounter); //trick untuk mendapatkan handler

    console.log(mariaProxy.name);
    console.log(mariaProxy.position); 
    console.log(mariaProxy["[[Handler]]"].getPropertyCounter); //counter pada maria tidak akan bercampur dengan handler milik adrian.
    console.log(mariaProxy.unknown);

    console.log("\n=========================SET FIELDS==========================");    
    adrianProxy.name = "Adrien Brody";
    adrianProxy.name = "Adrian Hartono";
    adrianProxy.department = "Product Developer";
    adrianProxy.position = "Project Manager";
    adrianProxy.maritalStatus = "Single";
    console.log(adrianProxy["[[Handler]]"].setPropertyCounter);

    console.log("\n=========================CHECK PROPERTY IN==========================");
    console.log('name' in adrianProxy);
    console.log('unknown' in adrianProxy);
    console.log('_employeeID' in adrianProxy);

    console.log("\n=========================DELETE PROPERTY==========================");
    delete adrianProxy.position;
    delete adrianProxy.unknown;

    console.log("\n=========================FUNCTION INVOCATION==========================");
    let adrianCalculateAgeProxy = new Proxy(adrian.calculateAge, new PersonFunctionHandler());
    console.log(adrianCalculateAgeProxy());
    let adrianCalculateAnnualSalaryProxy = new Proxy(adrian.calculateAnnualSalary, new PersonFunctionHandler());
    console.log(adrianCalculateAnnualSalaryProxy());

    let penjumlahanProxy = new Proxy(penjumlahan, new PersonFunctionHandler());
    console.log(penjumlahanProxy(5, 8, 12));
}
