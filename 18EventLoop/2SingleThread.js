/*    
    Sebelum ke pembahasan lebih jauh, ketahuilah kalau javascript hanya memiliki Single-Thread, tidak
    seperti pada C++, C# dan Java yang memiliki Multi-Thread.
    
    Single Thread artinya javascript tidak memiliki kemampuan untuk menjalankan 2 statement/tasks sekaligus.
    Dan itu juga artinya, apabila ada proses di dalam javascript yang tidak berhenti-henti (misalkan infinite loop atau mengambil data yang tidak ada habisnya.)
    Itu artinya javascript akan berhenti, dan seluruh browser anda akan hang atau lag.

    Pada bahasa pemrograman yang memiliki multi-thread, aplikasinya bisa mempuinya lebih dari dari satu stack yang di proses lebih dari satu event loop.
    Tetapi tidak dengan javascript, Silahkan buktikan dengan menggunakan method infiniteLoop di bawah ini.
*/

let infiniteLoop = () => {for(let index = 0; index >= 0; index++){}};

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
    //Uncomment infiniteLoop() untuk membuat browser mu lag, dan proses akan terhenti di line ini.
    //infiniteLoop();
    holidayCallback();
    discountAnnouncement();
}

console.log("Printing holiday card...\n\n\n"); 
holidayCard("John", "Doe", merryChristmas);

/* 
    Inilah yang mengkhawatirkan dari javascript, karena jangan sampai kita membuat proses "Blocking Code"
    yang bisa menghabat jalannya thread dan event loop. 
*/