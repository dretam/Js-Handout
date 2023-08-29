/*
    Indexed DB adalah NoSQL database yang disediakan hampir di semua browser terkenal.
    - menggantikan Web Sql yang sudah rusak
    - lebih hebat dan extreme dari local dan session storage
    - ukuran sampai kurang lebih 50Mb
    - bukan relational database, artinya gak ada query atau relasi
    - hanya bisa diakses pada domain yang sama
*/
let databaseValue = {
    employeeCollection: [
        {employeeNumber: "A1", name: "Ardi Bayu", email: "ardi.bayu@gmail.com", salary: 10000000},
        {employeeNumber: "A2", name: "Shinta Willy", email: "shinta.willy@gmail.com", salary: 15000000}
    ],
    supplierCollection: [
        {company: "Indofood", contact: "Sukardi", city: "Jakarta"},
        {company: "Ace Hardware", contact: "Hartono", city: "Surabaya"}
    ],
    customerCollection: [
        {customerNumber: "A1", name: "Elliot", email: "elliot.alderson@gmail.com"},
        {name: "Darlene", email: "darlene.alderson@gmail.com"},
        {name: "Trenton", email: "trenton@gmail.com"},
        {name: "Mobley", email: "mobley@gmail.com"}
    ]
}

let successConfirmation = object => {
    let output = 
    `
    =================================================
    ${JSON.stringify(object)}
    successfully processed into database
    =================================================
    `;
    console.log(output);
}

 /**
  * Berikut ini beberapa langkah untuk menggunakan Indexed DB
  * (0: Optional) Check apakah ada indexed db di dalam browser atau gak.
  * (1) Open database
  * (2) Buat object store di database.
  * (3) Lakukan operation data manipulation pada database.
  * (4) Gunakan DOM event untuk menunggu operationnya selesai
  */
document.querySelector('.build-indexdb').addEventListener('click', event => {
    console.log("Tersedia Indexed DB di browser kamu.");

    //parameter di kiri adalah nama database dan versi indexed db
    //promiseRequest akan mengembalikan object dengan tipe data IDBOpenDBRequest
    let promiseRequest = indexedDB.open("MyDatabase", 3); 

    promiseRequest.onupgradeneeded = function(event) { 
        console.log("Terjadi penambahan di IndexedDB");

        //pointing database dengan menggunakan object variable
        //object ini adalah object IDBDatabase
        let database = event.target.result;  

        /*
            Kita bisa membuat entity baru di dalam database dengan menggunakan function createObjectStore pada IDBDatabase.
            parameter pertama dari createObjectStore adalah nama entitynya, parameter ke 2 adalah object yang digunakan untuk membuat settingan.

            settingan dibuat dengan 2 properties, yaitu keyPath dan keyGenerator:
            keyPath: apabila kita ingin mengisi entity dengan object tiap rownya, dimana object tersebut memiliki PK atau Index yang ditentukan secara manual.
            authoIncrement: apabila kita ingin mengisi entity dengan object tiap rownya, dimana object tersebut menggunakan auto generated PK.
            keyPath dan keyGenerator: apabila kita ingin agar entity bisa menggunakan PK yang ditentukan secara manual, tetapi saat tidak disupply dia akan auto generate.
        */
       let employeeObjectStore = database.createObjectStore("employees", {keyPath: "employeeNumber"});
       employeeObjectStore.createIndex("name", "name", {unique: false});
       employeeObjectStore.createIndex("email", "email", {unique: true});
       employeeObjectStore.createIndex("salary", "salary", {unique: false});

       let supplierObjectStore = database.createObjectStore("suppliers", {autoIncrement: true});
       supplierObjectStore.createIndex("company", "company", {unique: true});
       supplierObjectStore.createIndex("contact", "contact", {unique: false});
       supplierObjectStore.createIndex("city", "city", {unique: false});

       let customerObjectStore = database.createObjectStore("customers", {keyPath: "customerNumber", autoIncrement: true});
       customerObjectStore.createIndex("name", "name", {unique: false});
       customerObjectStore.createIndex("email", "email", {unique: false});

       this.transaction.oncomplete = event => {
           console.log("Transaction complete!");
           database.close();
       }

    }
});

document.querySelector('.add-employees').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let empoyeeObjectStore = database.transaction("employees", "readwrite").objectStore("employees");
        for(let employee of databaseValue.employeeCollection){
            let request = empoyeeObjectStore.add(employee);
            request.onsuccess = event => {
                successConfirmation(employee);
            }
        }
        database.close();
    }
});

document.querySelector('.get-employees').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let employeeObjectStore = database.transaction("employees", "readwrite").objectStore("employees");
        let request = employeeObjectStore.get("A2");
        request.onsuccess = event => {
            let objectRetrieved = request.result;
            console.log(objectRetrieved);
        }
    }
});

document.querySelector('.delete-employees').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let employeeObjectStore = database.transaction("employees", "readwrite").objectStore("employees");
        let request = employeeObjectStore.delete("A1");
        request.onsuccess = event => {
            console.log("removed success");
        }
    }
});

document.querySelector('.add-suppliers').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let supplierObjectStore = database.transaction("suppliers", "readwrite").objectStore("suppliers");
        for(let supplier of databaseValue.supplierCollection){
            let request = supplierObjectStore.add(supplier);
            request.onsuccess = event => {
                successConfirmation(supplier);
            }
        }
        database.close();
    }
});

document.querySelector('.get-suppliers').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let supplierObjectStore = database.transaction("suppliers", "readwrite").objectStore("suppliers");
        let request = supplierObjectStore.get(2);
        request.onsuccess = event => {
            let objectRetrieved = request.result;
            console.log(objectRetrieved);
        }
    }
});

document.querySelector('.delete-suppliers').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let supplierObjectStore = database.transaction("suppliers", "readwrite").objectStore("suppliers");
        let request = supplierObjectStore.delete(1);
        request.onsuccess = event => {
            console.log("removed success");
        }
    }
});

document.querySelector('.add-customers').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase");
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let customerObjectStore = database.transaction("customers", "readwrite").objectStore("customers");
        for(let customer of databaseValue.customerCollection){
            let request = customerObjectStore.add(customer);
            request.onsuccess = event => {
                successConfirmation(customer);
            }
        }
        database.close();
    }
});

document.querySelector('.get-customers').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let customerObjectStore = database.transaction("customers", "readwrite").objectStore("customers");
        let request = customerObjectStore.get(1);
        request.onsuccess = event => {
            let objectRetrieved = request.result;
            console.log(objectRetrieved);
        }
    }
});

document.querySelector('.delete-customers').addEventListener('click', event => {
    let promiseRequest = indexedDB.open("MyDatabase"); 
    promiseRequest.onsuccess = event => {
        let database = event.target.result;
        let customerObjectStore = database.transaction("customers", "readwrite").objectStore("customers");
        let request = customerObjectStore.delete(3);
        request.onsuccess = event => {
            console.log("removed success");
        }
    }
});