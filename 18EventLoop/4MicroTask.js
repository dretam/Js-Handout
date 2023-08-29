/* 
    Pada chapter sebelumnya sudah dijelaskan dan dibahas mengenai Macro Task. Macro Task ini terkadang merepotkan.
    Bagaimana bila kita ingin sebuah Macro Task terjadi sebelum sebuah proses synchronous tertentu, tetapi ada juga yang
    bisa parallel jalan bersamaan? Untuk melakukan hal tersebut, kita tidak lagi bisa menggunakan Macro Task, tetapi kita harus
    menggunakan Micro Task.

    Micro Task adalah tata kelola di dalam event listener yang lahir karena adanya Promise.
    Micro Task memiliki Queue tersendiri yang secara collection sama seperti queue pada Macro Task, tetapi terpisah dan
    tata kelolanya sedikit berbeda.

    Sama seperti pada Macro Task, Queue Micro Task pada akhirnya akan kembali ke call-stack, tetapi sebelum kembali ke call-stack
    bisa di arrange terlebih dahulu. Baik synchronous dan asychronous bisa dijadikan micro task.

    (Trivia: Disebut micro karena kita bisa melakukan micro management terhadap setiap task.)
*/

/*
    Example 1:
    Sebelumnya kita akan melihat Micro Task by default. By Default sifat Micro Task Queue sama seperti Marco Task Queue,
    mereka akan selalu di shift dan di put kembali ke call-stack setelah call-stack habis.

    Itu membuat seluruh Micro Task akan jalan lebih belakangan dari synchronous task.
*/
{
    let promiseToPay = (name) => {
        return Promise.resolve(`MICRO: ${name} pay his/her debt`).then(message => console.log(message));
    }
    let payment = () => {
        promiseToPay("Sandra");
        console.log("SYNC: Aldo pay his fee");
        promiseToPay("Sylvia");
        console.log("SYNC: Michael pay his fee");
    }
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //payment();
}//==============================================================================================

/*
    Example 2:
    Contoh dibawah ini membuktikan kalau by default Queue dari Micro Task akan lebih di dahulukan dibanding Macro Task.
*/
{
    let promiseToPay = (name) => {
        return Promise.resolve(`MICRO: ${name} pay his/her debt`).then(message => console.log(message));
    }
    let microVsMacro = () => {
        setTimeout(() => {console.log("MACRO: Susan pay her fee eventually")}, 0);
        promiseToPay("Sandra");
        console.log("SYNC: Aldo pay his fee now");
        promiseToPay("Sylvia");
        setTimeout(() => {console.log("MACRO: Sonny pay her fee eventually")}, 0);
        console.log("SYNC: Michael pay his fee now");    
    }
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //microVsMacro();
}//==============================================================================================

/*
    Example 3:
    Pada contoh dibawah ini kita akan membuat micro task dari synchronous task, dimana
    synchronous task tersebut akan di loop sebanyak 5 miliyar kali. Suatu proses yang akan memakan waktu.
    Walaupun proses dihandle secara Micro Task, kinerja akan diproses secara synchronous karena isi dari Promisenya adalah Synchronous.
*/
{
    let infinitePromise = () => {
        return new Promise((resolve, reject) => {
            for(let index = 0; index <= 5000000000; index++ ){}
            resolve("MICRO: A very long Promise is done")
        }).then(message => console.log(message));
    }
    let trafficJam = () => {
        console.log("SYNC: synchronous task 1 is done.");
        setTimeout(() => {console.log("MACRO: setTimout 0 ms is done")}, 0);
        setTimeout(() => {console.log("MACRO: setTimout 3 s is done")}, 3000);
        infinitePromise();
        console.log("SYNC: synchronous task 2 is done.");
    }
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //trafficJam();
}//==============================================================================================

/*
    Example 4:
    Contoh ke empat cukup identik dengan contoh ke tiga, tapi dari contoh ke empat kita bisa melihat
    bahwa lag terjadi pada saat proses membuat object Promisenya, bukan pada saat meng-eksekusinya dengan then.

    Object promise dibuat pada saat run-time pertama kali pada saat thread mengeksekusi construct Promise
    di dalam call-stack. Tindakan then sendiri memasukan Promise tersebut ketika selesai ke dalam
    Micro Task Queue.

    Hasilnya sendiri pun tetap tak berbeda, urutan eksekusinya tetap synchronous > macro task > micro task.
*/
{
    let infinitePromise = () => {
        return new Promise((resolve, reject) => {
            for(let index = 0; index <= 4999999999; index++ ){}
            resolve("MICRO: A very long Promise is done")
        });
    }
    let trafficJam = () => {
        console.log("SYNC: synchronous task 1 is done.");
        setTimeout(() => {console.log("MACRO: setTimout 0 ms is done")}, 0);
        setTimeout(() => {console.log("MACRO: setTimout 3 s is done")}, 3000);
        //durasi hang
        let promiseResult = infinitePromise();
        console.log("SYNC: synchronous task 2 is done.");
        promiseResult.then(message => console.log(message));
    }
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //trafficJam();
}

/*
    Example 5:
    Perhatikan contoh berikut ini, terdapat 3 proses promise di bawah ini:
    immidiatePromise() adalah function akan dieksekusi dengan sangat cepat.
    longerPromise() adalah function akan dieksekusi dengan sedikit lebih lama.
    infinitePromise() adalah function akan dieksekusi dengan sangat lama.

    Tetapi urutan proses dan hasil invocationnya tidak ada perbedaan sama sekali,
    karena seluruh proses di dalam promisenya berlangsung synchronous.
*/
{
    let immidiatePromise = () => {
        return Promise.resolve(`MICRO: immidiate Promise is done.`).then(message => console.log(message));
    }
    let longerPromise = () => {
        return new Promise((resolve, reject) => {
            for(let index = 0; index <= 10000; index++ ){}
            resolve("MICRO: A little bit longer Promise is done.");
        }).then(message => console.log(message));
    }    
    let infinitePromise = () => {
        return new Promise((resolve, reject) => {
            for(let index = 0; index <= 5000000000; index++ ){}
            resolve("MICRO: A very long Promise is done.");
        }).then(message => console.log(message));
    }
    let microOrder = () => {
        console.log("SYNC: synchronous task 1 is done.");
        infinitePromise();
        immidiatePromise();
        longerPromise();    
        console.log("SYNC: synchronous task 2 is done.");
    }   
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //microOrder();
}

/*
    Example 6:
    Tetapi dengan promise, then, atau menggunakan async and await kita bisa mengatur urutan
    task ketika di input ke dalam Micro Task Queue. Lalu yang dilakukan javascript tinggal
    menunggu seluruh synchronous tasks di dalam call-back habis.

    contoh dibawah ini memperlihatkan kalau:
        1. getAllUsers();
        2. getUser(1);

    selalu akan jalan di urutan paling awal karena await.
*/
{
    let getUser = (id) => {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', `https://jsonplaceholder.typicode.com/users/${id}`);
            request.send();
            request.onload = () => {
                if(request.status >= 200 && request.status < 300){
                    resolve(JSON.parse(request.responseText));
                }
            };
        }).then(message => console.log(message));
    }
    let getAllUsers = () => {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://jsonplaceholder.typicode.com/users');
            request.send();
            request.onload = () => {
                if(request.status >= 200 && request.status < 300){
                    resolve(JSON.parse(request.responseText));
                }
            };
        }).then(message => console.log(message));
    }
    let microOrder = async() => {
        await getAllUsers();
        await getUser(1);
        getUser(2);
        getUser(3);
        getUser(4);
    }   
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    microOrder();
}