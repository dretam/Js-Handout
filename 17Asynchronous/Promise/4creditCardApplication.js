/*
    Dibawah ini adalah contoh pemakaian promise yang kita kombinasikan dengan iterator.
    Di sini iterator bisa memeriksa satu persatu customer yang melakukan permohonan kartu kredit secara asynchronous.
*/

//Class untuk object Customer
class Customer{
    constructor(name, balance, income, idCardNumber){
        this.name = name;
        this.balance = balance;
        this.income = income;
        this.idCardNumber = idCardNumber;
    }
}

//Reject validation adalah feedback untuk pemohon yang gagal melakukan permohonan kartu kredit
class RejectValidation {
    constructor(description, customer, authority, bankName){
        this.description = description;
        this.customer = customer;
        this.authority = authority;
        this.bankName = bankName;
        this.rejectDate = new Date();
    }
}

/* 
    Ini adalah fungsi berisikan promise yang memeriksa satu persatu apakah customer bisa mendapatkan kartu kredit atau tidak.
    Syaratnya customer harus memiliki KTP, tabungannya lebih dari 2 juta, dan pemasukannya lebih dari 1 juta.
*/
let requestCreditCard = customer => {
    let creditCardPromise = new Promise((resolve, reject) => { 
        if(customer.idCardNumber == null){
            reject(new RejectValidation("Tidak ada id card", customer, "Harry Osborn", 'World Bank'));
        } else if(customer.balance < 2000000){
            reject(new RejectValidation("Tabungan tidak mencukupi", customer, "Harry Osborn", 'World Bank'));
        } else if(customer.income < 1000000){
            reject(new RejectValidation("Pendapatan tidak mencukupi", customer, "Harry Osborn", 'World Bank'));
        }
        resolve(customer);
    });
    creditCardPromise.then(
        customer => console.log(`Permintaan credit card untuk: ${customer.name} diterima.`),
        rejection => console.log(rejection)
    );
}

let customersIterable = {
    customers:[
        new Customer("Jack Russel", 1000000, 5000000, "5566789"),
        new Customer("Merry Elizabeth", 20000000, 0, "5667889"),
        new Customer("Corona Ivanovich", 30000000, 15000000, "8979876"),
        new Customer("Sonya Augustian", 20000000, 2000000, null)
    ],
    [Symbol.iterator](){
        let allCustomers = Object.values(this.customers);
        let customerIndex = 0;
        return{
            next(){
                let noMoreCustomers = !(customerIndex < allCustomers.length);
                if (noMoreCustomers){
                    return {value: undefined, done: true};
                }
                let nextCustomer = allCustomers[customerIndex++];
                requestCreditCard(nextCustomer);
                return {value: nextCustomer, done:false};
            }
        };
    }
};    

//Dengan begitu, se-simple menggunakan for of loop, kita bisa memproses permintaan kartu kredit secara asynchronous seluruhnya.
for(let application of customersIterable){}