/*
    Promise adalah sebuah object dengan parameter yang menerima callback berupa function dengan parameter resolve dan reject.
    Object promise digunakan untuk membuat "janji"/tagihan terhadap suatu hasil dari proses yang tertunda karena prosesnya bersifat asychronous.
    Bisa dibilang kalau promise adalah proxy yang hasilnya belum diketahui dibuat.

    Resolve/ parameter resolve/ scenario resolve: menggambarkan bahwa apa yang dijanjikan berhasil atau berjalan dengan scenario seharusnya,
    atau bisa dikatakan janjinya dilunasi.

    Reject/ parameter reject/ scenario reject: menggambarkan bahwa apa yang dijanjikan gagal atau tidak sesuai dengan scenario yang seharusnya.
    atau bisa dikatakan proses tidak selesai.

    Oleh karena itu promise memiliki 3 status,
    pending (masih menunggu), fulfilled (resolve), rejected (ditolak)
*/

{
    console.log("Synchronous Task 1");

    /*
        Syntax pada promise diawali dengan instantiate Promise di lanjut dengan method then dan catch yang menerima parameter call-back juga.

        let objectPromise = new Promise(function(resolve, reject){})
                                .then(function(...args){})
                                .catch(function(...args){});

        call back di dalam constructor promise akan menentukan apa yang ingin di proses,
        call back di dalam then akan di invoke dengan resolve() pada proses promise,
        call back di dalam catch akan di invoke dengan reject() pada proses promise.

        Dalam kasus ini baik then dan catch menerima satu parameter string dalam nama message.
    */
    let processingSomething = new Promise((resolve, reject) => {
        true ? resolve('Berhasil') : reject('Gagal');     
    }).then((message) => {
        console.log(`ini di dalam callback then, dengan message: ${message}`);
    }).catch((message) => {
        console.log(`ini di dalam callback catch, dengan message: ${message}`);
    });  

    console.log("Synchronous Task 2");

    /*
        Karena processing something adalah asynchronous, sehingga "Synchronous Task 1" dan "Synchronous Task 2" akan jalan terlebih dahulu.
        Mirip seperti ajax XMLHttpRequest dan setTimeOut, proses dalam Promise bisa jadi membutuhkan waktu, sehingga function yang diinvoke biasa
        akan di proses pada call stack terlebih dahulu.
    */
}

{
    let processingSomething = new Promise((resolve, reject) => {
        false ? resolve('Berhasil') : reject('Gagal');    
    });

    /*
        Call back bisa dipanggil dengan alternatif lain, dimana then dan catch di invoke sebagai method dari object promise yang di invoke setelahnya.
        Sehingga then() dan catch() bisa bervariasi setiap kali di invoke.
    */
    processingSomething.then((message) => {
        console.log(`ini di dalam callback then, dengan message: ${message}`);
    }).catch((message) => {
        console.log(`ini di dalam callback catch, dengan message: ${message}`);
    });

    processingSomething.then((message) => {
        console.log(`RESULT DARI PROCESSING SOMETHING (then()): ${message}`);
    }).catch((message) => {
        console.log(`RESULT DARI PROCESSING SOMETHING (catch()): ${message}`);
    });    
}

{
    let processingSomething = new Promise((resolve, reject) => {
        false ? resolve('Berhasil') : reject('Gagal');    
    });
    
    /*
        Kita juga bisa menulisnya dengan notasi yang lebih pendek, yaitu dengan memasukan fungsi catch sebagai callback terakhir:
            objectPromise.then(function(...args){}, function(...args){})
    */
    processingSomething.then(
        message => {console.log(`Short hand notation for then: ${message}`);},
        message => {console.log(`Short hand notation for catch (tanpa catch phrase): ${message}`);}
    );        
}

{
    /* 
        Promise chain: kita bisa membuat promise chain dengan menuliskan lebih dari satu then.
        value yang di-return oleh then sebelumnya akan menjadi argument untuk parameter then selanjutnya.
    
        Promise chain memiliki banyak then, tetapi hanya satu catch.
        Promise chain harus ditulis dengan notasi lengkap, tidak bisa menggunakan notasi pendek.
    */
    let processingSomething = new Promise((resolve, reject) => {
        true ? resolve('Berhasil') : reject('Gagal');    
    });

    processingSomething.then((message) => {
        console.log(`ini di dalam then yang pertama: ${message}`);
        return 'Berhasil lagi';
    }).then((message) => {
        console.log(`ini di dalam then yang kedua: ${message}`);
        return 'Lagi-lagi berhasil';
    }).then((message) => {
        console.log(`ini di dalam then yang ketiga: ${message}`);        
    }).catch((message) => {
        console.log(`ini di dalam callback catch, dengan message: ${message}`);
    });    
}

{
    /*
        Promise.all adalah method yang digunakan untuk menunggu lebih dari satu proses promises asychronous,
        dan seluruhnya harus di resolve untuk mencapai callback di dalam then.

        Apabila ada satu proses yang lebih lambat dari proses yang lainnya, proses yang lainnya akan menunggu yang paling
        lambat. Jadi bisa dikatakan Promise.all adalah method yang melihat then pada saat seluruh hutang promise telah dilunasi.
    */
    let processOne = new Promise((resolve, reject) => {
        true ? resolve('Berhasil di proses 1') : reject('Gagal di proses 1');
    });
    let processTwo = new Promise((resolve, reject) => {
        true ? resolve('Berhasil di proses 2') : reject('Gagal di proses 2'); 
    });
    let processThree = new Promise((resolve, reject) => {
        true ? resolve('Berhasil di proses 3') : reject('Gagal di proses 3');
    });

    Promise.all([processOne, processTwo, processThree]).then((messages) => {
        console.log(`Scenario berhasil: ${messages}`);
    }).catch((message) => {
        console.log(`Scenario gagal: ${message}`);
    });
}
{
    /*
        Perhatikan contoh ke-2 Promise.all di bawah ini, mengalami kegagalan/reject di proses yang kedua.
        Oleh karena itu seluruh proses dari ketiga proses ini akan ikut gagal, dan scenario then tidak
        akan di eksekusi.
    */
    let processOne = new Promise((resolve, reject) => {
        true ? resolve('Berhasil di proses 1') : reject('Gagal di proses 1');
    });
    let processTwo = new Promise((resolve, reject) => {
        false ? resolve('Berhasil di proses 2') : reject('Gagal di proses 2'); 
    });
    let processThree = new Promise((resolve, reject) => {
        true ? resolve('Berhasil di proses 3') : reject('Gagal di proses 3');
    });

    Promise.all([processOne, processTwo, processThree]).then((messages) => {
        console.log(`Scenario berhasil: ${messages}`);
    }).catch((message) => {
        console.log(`Scenario gagal: ${message}`);
    });
}

{
    /* 
        Coba perhatikan contoh Promise.all di bawah ini. then() scenario tidak akan
        di eksekusi sebelum menunggu proses 1 yang terlambat selama kurang lebih 5 detik.
    */
    let processOne = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Berhasil di proses 1 (SLOW RESPOND)') : reject('Gagal di proses 1');
        }, 5000);      
    });
    let processTwo = new Promise((resolve, reject) => {
        true ? resolve('Berhasil di proses 2') : reject('Gagal di proses 2'); 
    });
    let processThree = new Promise((resolve, reject) => {
        true ? resolve('Berhasil di proses 3') : reject('Gagal di proses 3');
    });

    Promise.all([processOne, processTwo, processThree]).then((messages) => {
        console.log(`Scenario berhasil dengan 1 late behind: ${messages}`);
    }).catch((message) => {
        console.log(`Scenario gagal: ${message}`);
    });
}

{
    /* 
        Alternative dari Promise.all adalah Promise.race, seperti namanya race (balapan) dimana proses akan diambil
        dan masuk scenario then hanya untuk juara pertama dari seluruh proses. Yang tertinggal tidak akan dieksekusi ke
        dalam then.
    */
    let processOne = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Dimenangkan proses 1') : reject('Gagal di proses 1');
        }, 5000);    
    });
    let processTwo = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Dimenangkan proses 2') : reject('Gagal di proses 2'); 
        }, 1000);   
    });
    let processThree = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Dimenangkan proses 3') : reject('Gagal di proses 3');
        }, 2000);  
    });

    Promise.race([processOne, processTwo, processThree]).then((messages) => {
        console.log(`Balapan dimenangkan oleh!: ${messages}`);
    }).catch((message) => {
        console.log(`Scenario race gagal: ${message}`);
    });
}

{
    /* 
        Tetapi apabila proses tercepat adalah reject, maka 1 proses yang akan dieksekusi
        promise adalah yang catch.

        Tetapi apabila proses reject bukan yang tercepat, maka scenario tetap berhasil.
    */
    let processOne = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Dimenangkan proses 1') : reject('Gagal di proses 1');
        }, 5000);    
    });
    let processTwo = new Promise((resolve, reject) => {
        setTimeout(function(){
            false ? resolve('Dimenangkan proses 2') : reject('Gagal di proses 2'); 
        }, 1000);   
    });
    let processThree = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Dimenangkan proses 3') : reject('Gagal di proses 3');
        }, 2000);  
    });

    Promise.race([processOne, processTwo, processThree]).then((messages) => {
        console.log(`Balapan dimenangkan oleh!: ${messages}`);
    }).catch((message) => {
        console.log(`Scenario race gagal: ${message}`);
    });
}

{
    /* 
        Di sini scenario gagal jatuh pada yang paling lambat, yaitu proses 1,
        Maka balapan akan tetap dimenangkan proses 2 dengan scenario then.
    */
    let processOne = new Promise((resolve, reject) => {
        setTimeout(function(){
            false ? resolve('Dimenangkan proses 1') : reject('Gagal di proses 1');
        }, 5000);    
    });
    let processTwo = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Dimenangkan proses 2') : reject('Gagal di proses 2'); 
        }, 1000);   
    });
    let processThree = new Promise((resolve, reject) => {
        setTimeout(function(){
            true ? resolve('Dimenangkan proses 3') : reject('Gagal di proses 3');
        }, 2000);  
    });

    Promise.race([processOne, processTwo, processThree]).then((messages) => {
        console.log(`Balapan dimenangkan oleh!: ${messages}`);
    }).catch((message) => {
        console.log(`Scenario race gagal: ${message}`);
    });
}