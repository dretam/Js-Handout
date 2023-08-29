/* 
    Setelah mempelajari banyak feature dari Javascript, pasti akan muncul pertanyaan bagaimana mechanism javascript,
        kapan sebuah process akan dijalankan? Apa yang terjadi pada saat sebuah proses dijalankan.

    Pada javascript, setiap object atau variable yang diciptakan akan masuk ke dalam sebuah sistem penyimpanan memory
        yang disebut dengan Heap (tapi kita tidak akan focus pada Heap di pelajaran ini). 
    
    Sedangkan setiap statement dan function yang di invoke akan masuk ke dalam satu sistem penyimpanan yang disebut juga dengan Call Stack. 
    
    (Trivia: Disebut call stack karena memang merupakan collection dengan tipe data structure stack.
        anda bisa menemukan collection stack pada banyak bahasa pemrograman seperti Java, C++ dan C#.
        Stack adalah List dimana setiap itemnya bisa di-get sekaligus dihapus dengan menggunakan method "Pop".
        Method "pop" akan mengambil item yang terakhir kali di add atau di put.
        Sama persis dengan pop method pada array javascript.)

    Call stack akan dieksekusi satu persatu dengan menggunakan pop dan di tabung dengan menggunakan put. Tetapi pop dan put dari call-stack 
        tidak dilakukan secara manual oleh kita, tetapi dengan Thread. Thread adalah satu "focus" di dalam programming yang digunakan untuk memproses 
        task atau mengeksekusi satu statement. Setiap bahasa programming atau scripting language pasti memiliki Thread.

    Thread akan terus berputar di dalam satu rute lap yang disebut dengan Event Loop. Thread akan berputar X loop per detik sesuai 
        dengan performance komputer dan browser mu. Setiap thread akan mengeksekusi satu statement/task sampai habis atau menaruh task yang akan diselesaikan, 
        lalu berputar di event loop lagi dan kembali menyelesaikan task yang barunya lagi.
        (Imajinasikan task seperti pit stop pada area balap, dan mobil balap akan terus berputar pada lap nya.)

    Bagaimana setiap function dan statement di put ke dalam call-stack dan di pop oleh Thread? Perhatikan contoh di bawah ini.
*/

let personGreeting = name => console.log(`Dear ${name},`); 

let merryChristmas = () => console.log("Merry Christmas and Happy New Year!"); 

let departmentStore = () => console.log("Red and Green Department Store"); 

let thankYou = () => {
    console.log("\n\nThank you and regards");
    departmentStore();
}

let discountAnnouncement = () => {
    console.log("You get 50% discount for this year holiday season in our store");
    thankYou();
}

let holidayCard = (firstName, lastName, holidayCallback) => {
    let fullName = `${firstName} ${lastName}`;
    personGreeting(fullName);
    console.log("We would like to say to you...");
    holidayCallback();
    discountAnnouncement();
}

console.log("Printing holiday card...\n\n\n"); 
holidayCard("John", "Doe", merryChristmas);

/*
    Kalian bisa men-debug dan men-inspect call-stack dengan menggunakan Chrome developer tools (F12),
        lalu cari accordion "Call Stack" di dalam Sources tab ketika kalian sedang debug javascript.

    Beginilah kurang lebih urutan step by step dari call-stack yang dibentuk dan di pop:
        
        Loop 1:
        PUT => 1) console.log("Printing holiday card...\n\n\n");

        Loop 2:
        POP => 1) console.log("Printing holiday card...\n\n\n");

        Loop 3:
        PUT => 1) holidayCard("John", "Doe", merryChristmas);

        Loop 4:
        1) holidayCard("John", "Doe", merryChristmas);
        PUT => 2) let fullName = `${firstName} ${lastName}`;        

        Loop 5:
        1) holidayCard("John", "Doe", merryChristmas);
        POP => 2) let fullName = `${firstName} ${lastName}`;    
        
        Loop 6
        1) holidayCard("John", "Doe", merryChristmas);
        PUT => 2) personGreeting(fullName);

        Loop 7:
        1) holidayCard("John", "Doe", merryChristmas);
        2) personGreeting(fullName);
        PUT => 3) console.log(`Dear ${name},`);

        Loop 8:
        1) holidayCard("John", "Doe", merryChristmas);
        2) personGreeting(fullName);
        POP => 3) console.log(`Dear ${name},`);    

        Loop 9:
        1) holidayCard("John", "Doe", merryChristmas);
        POP => 2) personGreeting(fullName);        
        
        Loop 10:
        1) holidayCard("John", "Doe", merryChristmas);
        PUT => 2) console.log("We would like to say to you...");

        Loop 11:
        1) holidayCard("John", "Doe", merryChristmas);
        POP => 2) console.log("We would like to say to you...");        

        Loop 12:
        1) holidayCard("John", "Doe", merryChristmas);
        PUT => 2) holidayCallback();

        Loop 13:
        1) holidayCard("John", "Doe", merryChristmas);
        2) holidayCallback();
        PUT => 3) console.log("Merry Christmas and Happy New Year!");

        Loop 14:
        1) holidayCard("John", "Doe", merryChristmas);
        2) holidayCallback();
        POP => 3) console.log("Merry Christmas and Happy New Year!");         

        Loop 15:
        1) holidayCard("John", "Doe", merryChristmas);
        POP => 2) holidayCallback();        

        Loop 16:
        1) holidayCard("John", "Doe", merryChristmas);
        PUT => 2) discountAnnouncement();

        Loop 17:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        PUT => 3) console.log("You get 50% discount for this year holiday season in our store");

        Loop 18:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        POP => 3) console.log("You get 50% discount for this year holiday season in our store");        

        Loop 19:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        PUT => 3) thankYou();        

        Loop 20:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        3) thankYou();
        PUT => 4) console.log("\n\nThank you and regards");            

        Loop 21:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        3) thankYou();
        POP => 4) console.log("\n\nThank you and regards");     
        
        Loop 22:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        3) thankYou();
        PUT => 4) departmentStore();       
        
        Loop 23:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        3) thankYou();
        4) departmentStore();          

        Loop 24:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        3) thankYou();
        4) departmentStore();
        PUT => 5) console.log("Red and Green Department Store");         

        Loop 25:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        3) thankYou();
        4) departmentStore();
        POP => 5) console.log("Red and Green Department Store");   
        
        Loop 26:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        3) thankYou();
        POP => 4) departmentStore();        

        Loop 27:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        POP => 3) thankYou();     
        
        Loop 28:
        1) holidayCard("John", "Doe", merryChristmas);
        2) discountAnnouncement();
        POP => 3) thankYou();        
        
        Loop 29:
        1) holidayCard("John", "Doe", merryChristmas);
        POP => 2) discountAnnouncement();        

        Loop 30:
        POP => 1) holidayCard("John", "Doe", merryChristmas);        

        Semuanya selesai dalam 30 kali putaran.
*/