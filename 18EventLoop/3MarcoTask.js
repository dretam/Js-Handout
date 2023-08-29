/* 
    Lalu bagaimana cara javascript melakukan asynchronous processes apabila javascript hanya memiliki 1 thread saja?
    Lalu apa yang terjadi saat adanya proses asynchronous di dalam javascript run-time?

    Javascript melakukan asynchronous dengan menggunakan Web.API. Web.API disediakan oleh standard browser untuk melakukan banyak hal.
    Contoh dari Web.API adalah setTimeOut, setInterval, AJAX dengan XMLHttpRequest object, DOM events (Processing HTML DOM), geoLocation, 
    dan lain sebagainya.

    Ingat! Web.API yang disediakan browser atau system bukan merupakan bagian dari feature javascript/ecmascript!
    Sehingga contohnya apabila kita memproses sebuah AJAX yang mengambil sebuah data JSON, yang memprosesnya bukan lah bagian dari 
    feature languagenya.
    
    Untuk lebih detailnya melihat available Web.API yang ada, silahkan check:
    https://developer.mozilla.org/en-US/docs/Web/API
    Link tersebut menunjukan library Web.API apa saja yang bisa digunakan javascript.

    Pada saat proses Asynchronous, Web.API akan mengeluarkan satu processing system yang akan memproses asynchronous task anda.
    Javascript anda yang sebenarnya hanyalah single threaded, meminjam kemampuan Web.API untuk memproses tugas lainnya yang 
    sifatnya asynchronous. 

    Asynchronous dengan menggunakan Web.API ini akan diset di dalam event loop sebagai Macro Task.
    Macro Task adalah tata kelola task untuk asynchronous secara default yang di set dalam javascript run-time.
    Mari kita teliti Macro task lebih mendalam dengan contoh-contoh di bawah ini.
*/

/*
    Example 1:
    Contoh function invitePeople dibawah ini menunjukan proses Macro Task dengan Sync Task pada saat terjadi silih berganti.
    Perhatikanlah, walaupun setTimeout di set 0ms, tetapi seluruh macro task akan terjadi setelah synchronous task.
*/
{
    let invitePeople = () => {
        console.log("SYNC: Invite Jessica to a party");
        setTimeout(() => {
            console.log("ASYNC TIMEOUT: Invite Harrison to a party");
        }, 0);
        console.log("SYNC: Invite Melissa to a party");
        setTimeout(() => {
            console.log("ASYNC TIMEOUT: Invite Robert to a party");
        }, 0);
        console.log("SYNC: Invite Raisa to a party");
    }
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //invitePeople();

    /*
        Kenapa seluruh process async timeout (macro task) bisa terjadi belakangan? Padahal waktu yang dibutuhkan untuk menyelesaikannya hanyalah 0ms?

        Baik synchronous maupun macro task, pada awalnya akan dijalankan dan di masukkan ke dalam call-stack seperti pada umumnya.

        Pada saat setTimeout akan di pop di dalam call-stack, ecmascript segera tahu kalau proses ini adalah macro task, dan belum tentu sudah ready 
        dijalankan saat ini. Walaupun di set dengan waktu 0ms, ecmascript tetap akan meng-kategorikannya sebagai macro task dan belum tentu ready untuk dijalankan.

        Oleh karena itu seluruh proses macro task akan di alokasikan ke Web.API untuk di proses di sana, tak perduli berapa waktu yang dibutuhkan.
        Setelah proses tersebut selesai, Web.API akan mengembalikan macro task satu persatu ke dalam satu antrian yang disebut juga dengan 
        Event Queue/ Macro Task Queue/ Call-Back Queue atau simply Queue saja.
        Seperti dari namanya, Queue ini adalah collection dengan tipe Queue atau List yang memiliki feature seperti antrian.
        Terbalik dari Stack, Queue akan di proses dari yang paling awal masuk (seperti antrian sesungguhnya, siapa cepat dia duluan).

        Dalam proses Queue, sebuah task yang akan diproses bukan di pop, melaikan di shift. 
        Dan pada saat dimasukan akan disebut dengan que.

        Seluruh macro task yang sudah selesai di dalam Web.API akan di que ke dalam Queue, lalu akan di shift kembali ke call-stack ketika
        call-stack sudah kosong, sehingga macro task tidak boleh mendahulukan proses task normal yang sudah di ada di call-stack.

        Ketika system sudah bisa memastikan kalau call-stack benar-benar kosong dan tidak akan terisi lagi dari source code, 
        antrian macro task baru satu persatu akan di shift ke call-stack, dan kali ini sudah dalam keadaan siap untuk dijalankan. 
    */
}//==============================================================================================

/*
    Example 2:
    Perhatikan lah, pada contoh kedua kali ini kita akan memasukan 1 macam macro task lagi, yaitu dengan menggunakan XMLHttpRequest.
    Kita akan mengambil JSON via internet dari web jsonplaceholder.

    Di sini ada 3 proses ajax dimana yang satu mengambil seluruh data users, mengambil user 1 dan mengambil user 2:
        getAllUsers();
        getUser(1);
        getUser(2);
    
    Kalian bisa perhatikan contoh kalau urutan ketiga macro task ini tidak selalu dalam urutan yang sama setiap dijalankan.
*/
{
    let getUser = (id) => {
        let request = new XMLHttpRequest();
        request.open('GET', `https://jsonplaceholder.typicode.com/users/${id}`);
        request.send();
        request.onload = () => {
            if(request.status >= 200 && request.status < 300){
                console.log(JSON.parse(request.responseText));
            }
        };
    }
    let getAllUsers = () => {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://jsonplaceholder.typicode.com/users');
        request.send();
        request.onload = () => {
            if(request.status >= 200 && request.status < 300){
                console.log(JSON.parse(request.responseText));
            }
        };
    }
    let inviteWithAjax = () => {
        getAllUsers();
        getUser(1);
        getUser(2);
        console.log("SYNC: Invite Jessica to a party");
        setTimeout(() => {
            console.log("ASYNC TIMEOUT: Invite Harrison to a party");
        }, 0);
        console.log("SYNC: Invite Melissa to a party");
        setTimeout(() => {
            console.log("ASYNC TIMEOUT: Invite Robert to a party");
        }, 0);
        console.log("SYNC: Invite Raisa to a party");
    }
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //inviteWithAjax();

    /*
        Seluruh macro task tidak selalu dijalankan dengan urutan yang sama, karena queue akan di que tergantung
        siapa cepat dan siapa duluan. Yang proses Web.API nya selesai lebih dahulu aka masuk ke dalam antrian terlebih dahulu.
        Lalu antrian akan di shift setelah proses terakhir di call-stack selesai, kurang lebih permisalan prosesnya seperti dibawah ini:
        (Saya buat versi lebih singkat dari aslinya saja)

        Step 1:
            Call-back:
            PUT => 1) inviteWithAjax();
            PUT => 2) getAllUsers();
            PUT => 3) request.onload = () => {}

        Step 2:
            Call-back:
            1) inviteWithAjax();
            POP => 2) getAllUsers();
            POP => 3) request.onload = () => {}
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}

        Step 3:
            Call-back:
            1) inviteWithAjax();
            PUT => 2) getUser(1);
            PUT => 3) request.onload = () => {}
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}            

        Step 4:
            Call-back:
            1) inviteWithAjax();
            POP => 2) getUser(1);
            POP => 3) request.onload = () => {}
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {}            

        Step 5:
            Call-back:
            1) inviteWithAjax();
            PUT => 2) getUser(2);
            PUT => 3) request.onload = () => {}
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {}             

        Step 6:
            Call-back:
            1) inviteWithAjax();
            POP => 2) getUser(2);
            POP => 3) request.onload = () => {}
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}            

        Step 7:
            Call-back:
            1) inviteWithAjax();
            PUT => 2) console.log("SYNC: Invite Jessica to a party");
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}              

        Step 8:
            Call-back:
            1) inviteWithAjax();
            POP => 2) console.log("SYNC: Invite Jessica to a party");
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}              

        Step 9:
            Call-back:
            1) inviteWithAjax();
            PUT => 2) setTimeout(() => {console.log("ASYNC TIMEOUT: Invite Harrison to a party")}, 0);
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}              

        Step 10:
            Call-back:
            1) inviteWithAjax();
            POP => 2) setTimeout(() => {console.log("ASYNC TIMEOUT: Invite Harrison to a party")}, 0);
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}  
            PROCESS => 4) inviteWithAjax(); > setTimeout(() => {console.log("ASYNC TIMEOUT: Invite Harrison to a party")}, 0);

        Step 11:
            Call-back:
            1) inviteWithAjax();
            PUT => 2) console.log("SYNC: Invite Melissa to a party");
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}
            Queue:
            QUE => 1) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Harrison to a party");            

        Step 12:
            Call-back:
            1) inviteWithAjax();
            POP => 2) console.log("SYNC: Invite Melissa to a party");        
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}
            Queue:
            QUE => 1) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Harrison to a party");         

        Step 13:
            Call-back:
            1) inviteWithAjax();
            PUT => 2) setTimeout(() => {console.log("ASYNC TIMEOUT: Invite Robert to a party");
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}
            Queue:
            QUE => 1) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Harrison to a party");             

        Step 14:
            Call-back:
            1) inviteWithAjax();
            POP => 2) setTimeout(() => {console.log("ASYNC TIMEOUT: Invite Robert to a party")}, 0); 
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}
            PROCESS => 4) inviteWithAjax(); > setTimeout(() => {console.log("ASYNC TIMEOUT: Invite Robert to a party")}, 0);
            Queue:
            QUE => 1) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Harrison to a party");             

        Step 15:
            Call-back:
            1) inviteWithAjax();
            PUT => 2) console.log("SYNC: Invite Raisa to a party");
            Web.API:           
            PROCESS => 1) inviteWithAjax(); > getAllUsers(); > request.onload = () => {}
            PROCESS => 2) inviteWithAjax(); > getUser(1); > request.onload = () => {} 
            PROCESS => 3) inviteWithAjax(); > getUser(2); > request.onload = () => {}
            Queue:
            QUE => 1) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Harrison to a party");   
            QUE => 2) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Robert to a party");          

        Step 16:
            Call-back:
            POP => 1) inviteWithAjax();
            POP => 2) console.log("SYNC: Invite Raisa to a party");
            Web.API:           
            - 
            Queue:
            QUE => 1) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Harrison to a party");   
            QUE => 2) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Robert to a party");       
            QUE => 3) inviteWithAjax(); > getUser(1); > if(request.status >= 200 && request.status < 300) 
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)   
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)

        Step 17:
            Queue:
            SHIFT => 1) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Harrison to a party");   
            QUE => 2) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Robert to a party");       
            QUE => 3) inviteWithAjax(); > getUser(1); > if(request.status >= 200 && request.status < 300)
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)
            
        Step 18:
            Call-back:
            PUT => 1) inviteWithAjax();
            PUT => 2) console.log("ASYNC TIMEOUT: Invite Harrison to a party");
            Queue:
            QUE => 2) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Robert to a party");       
            QUE => 3) inviteWithAjax(); > getUser(1); > if(request.status >= 200 && request.status < 300)
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)        
            
        Step 19:
            Call-back:
            POP => 1) inviteWithAjax();
            POP => 2) console.log("ASYNC TIMEOUT: Invite Harrison to a party");
            Queue:
            SHIFT => 2) inviteWithAjax(); > console.log("ASYNC TIMEOUT: Invite Robert to a party");       
            QUE => 3) inviteWithAjax(); > getUser(1); > if(request.status >= 200 && request.status < 300)
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)              

        Step 20:
            Call-back:
            PUT => 1) inviteWithAjax();
            PUT => 2) console.log("ASYNC TIMEOUT: Invite Robert to a party"); 
            Queue:     
            QUE => 3) inviteWithAjax(); > getUser(1); > if(request.status >= 200 && request.status < 300)
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)  
            
        Step 21:
            Call-back:
            POP => 1) inviteWithAjax();
            POP => 2) console.log("ASYNC TIMEOUT: Invite Robert to a party"); 
            Queue:     
            SHIFT => 3) inviteWithAjax(); > getUser(1); > if(request.status >= 200 && request.status < 300)
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)         
            
        Step 22:
            Call-back:
            PUT => 1) inviteWithAjax();
            PUT => 2) getUser(1);
            PUT => 3) if(request.status >= 200 && request.status < 300)
            Queue:     
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300) 
            
        Step 23:
            Call-back:
            inviteWithAjax();
            getUser(1);
            POP => 3) if(request.status >= 200 && request.status < 300)
            Queue:     
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)
            
        Step 23:
            Call-back:
            1) inviteWithAjax();
            2) getUser(1);
            PUT => 3) console.log(JSON.parse(request.responseText));
            Queue:     
            QUE => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)  
            
        Step 24:
            Call-back:
            POP => 1) inviteWithAjax();
            POP => 2) getUser(1);
            POP => 3) console.log(JSON.parse(request.responseText));
            Queue:     
            SHIFT => 4) inviteWithAjax(); > getUser(2); > if(request.status >= 200 && request.status < 300)  
            QUE => 5) inviteWithAjax(); > getAllUsers(); > if(request.status >= 200 && request.status < 300)         

        Lalu selanjutnya terjadi Step 25, Step 26 dan terus sampai Queue 5) berhasil di masukan di Call-Stack dan di pop untuk diproses 
    */
}//==============================================================================================

/*
    Example 3:
    Diperlihatkan mechanism Queue, dimana membuktikan siapa yang lebih cepat diproses, maka akan lebih cepat
    di que, dan siapa yang lebih dulu di que akan lebih dulu di shift.

    Pada contoh dibawah ini, saya menghitung lama millisecond yang dibutuhkan untuk menyelesaikan kedua function di
    bawah ini, yang satu adalah ajax, yang kedua adalah timeOut. Yang timeOut akan selalu lebih dulu selesai, dikarenakan waktu yang relative lebih singkat.
    Bahkan ketinggal 1 ms saja akan menentukan urutan macrotask dijalankan.
*/
{
    let measureGetUser = (start) => {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
        request.send();
        request.onload = () => {
            if(request.status >= 200 && request.status < 300){
                console.log(JSON.parse(request.responseText));
                console.log(`   --Ellapsed in: ${Date.now() - start} ms`);
            }
        };    
    }
    let measureZeroTimeout = (start) => {
        setTimeout(() => {
            console.log("ASYNC TIMEOUT: Invite Harrison to a party");
            console.log(`   --Ellapsed in: ${Date.now() - start} ms`);
        }, 0);    
    }
    let start = Date.now();
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //measureGetUser(start);
    start = Date.now();
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    //measureZeroTimeout(start);
}//==============================================================================================

/* 
    Example 4:
    Ini mencontohkan dimana macro task membawa banyak sync task di dalamnya, menghasilkan call stack yang panjang.
    Kalian juga bisa membuat nested macro task, menghasilkan sebuah task yang bulak balik antrian.
*/
{
    let getUser = (id) => {
        let request = new XMLHttpRequest();
        request.open('GET', `https://jsonplaceholder.typicode.com/users/${id}`);
        request.send();
        request.onload = () => {
            if(request.status >= 200 && request.status < 300){
                console.log(JSON.parse(request.responseText));
            }
        };
    }
    let departmentStore = () => console.log("Red and Green Department Store"); 
    let thankYou = () => {
        console.log("Thank you and regards");
        departmentStore();
    }
    let discountAnnouncement = () => {
        console.log("You get 50% discount for this year holiday season in our store");
        thankYou();
    }
    let syncInsideAsync = () => {
        getUser(1);
        setTimeout(() => {
            discountAnnouncement();
        }, 0);
        console.log("SYNC: Invite Jessica to a party");
    }
    //Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
    syncInsideAsync();
}//==============================================================================================
