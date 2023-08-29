/* 
    Rendering Frame adalah mechanisme bagaimana update yang dilakukan javascript anak di update
    pada layar monitor yang ditampilkan HTML dan CSS. Bisa dibilang rendering frame adalah mechanisme
    menggambar di tampilan UI, berdasarkan hasil eksekusi javascript.

    Rendering Frame hanya terdapat di dalam event loop dan javascript run-time untuk javascript
    yang berjalan di client-side, jadi bukan di server-side seperti di Node.JS.

    Banyak dari kalian pasti mengenal istilah FPS (Frame Per Second). Untuk yang gemar bermain video
    game, pernah belajar membuat animasi, atau pernah membaca spesifikasi monitor, pasti pernah mendengar FPS.
    FPS menentukan berapakali tampilan di layar akan di update dalam waktu satu detik. Apabila FPSnya kecil,
    maka kalian akan melihat animasi di layar monitor kalian terputus-putus. (Bukan pengalaman yang menyenangkan).
    Contohnya apabila layar kalian menampilkan 60 FPS, artinya perubahan pada layar monitor kalian sebanyak 60 kali
    dalam waktu 1 detik.

    Setiap kali layar browser kita di update, akan terjadi 3 step ini secara berurutan:
    1. Style Calculation: ini adalah mechanisme yang sangat berhubungan erat dengan CSS. Pada proses ini,
        browser kita akan melihat kondisi style css maupun yang ada pada internal dan inline html.
    2. Layout: ini adalah mechanisme melihat DOM dan layout HTML saat ini.
    3. Pixel Data: adalah peristiwa layar browser di monitor menggambar UI berdasarkan Style Calculation dan Layout
        yang sebelumnya sudah diperoleh dari tahap 1 dan 2.

    Kita tidak akan mengatur seberapa cepat FPS pada layar browser anda dengan javascript, itu ditentukan oleh monitor, 
    GPU dan browser anda. Tetapi kita bisa mengatur apakah javascript yang kita eksekusi akan diupdate layar setiap frame
    atau kita memutuskan untuk skip hasil eksekusi dan kita akan update di layar pada frame-frame berikutnya.

    Kita bisa mengatur hasil eksekusi javascript mana yang akan di proses pada Style Calculation, Layout, dan Pixel Data, yaitu
    dengan menggunakan Request Animation Frame. Tanpa menggunakan Request Animation Frame, javascript bisa melakukan puluhan bahkan
    ratusan update dan hanya merendernya di layar 1 kali, sehingga kita tidak bisa melihat setiap updatenya satu-persatu.
*/
let timeOutProgress = document.querySelector("#timeOut-progress");
let divisionProgress = document.querySelector("#division-progress");
let requestAnimationProgress = document.querySelector("#raf-progress");
let progressButton = document.querySelector(".raf-vs-timeOut button");
let box = document.querySelector("#changing-box");
let resetButton = document.querySelector(".multiple-changes .reset");
let normalButton = document.querySelector(".multiple-changes .normal");
let singleButton = document.querySelector(".multiple-changes .single");
let multipleButton = document.querySelector(".multiple-changes .double");

/*
    Dibawah ini menunjukan perbandingan 3 animasi di dalam HTML progress bar.
    Ketika progress button di click akan terjadi 3 hal, yaitu:
        1. progress bar yang dijalankan dengan timeOut.
        2. progress bar yang dijalankan dengan requestAnimationFrame.
        3. progress bar yang dijalankan dengan timeOut yang mencoba menyamai frekuensi fps layar.
*/

/*
    Progress bar pada timeout biasanya berjalan jauh lebih cepat dari yang lain. Mengapa?
    Karena kecepatan processor komputer kita memutar event loop lebih cepat daripada FPS layar.
    Itu sebabnya berjalan lebih cepat dan sebagian value akan di skip karena bisa jadi value dari progress bar
    sudah bertambah 5, baru di update ke layar.

    Animasi dengan menggunakan timeout akan works, tapi tidak best practice dan tidak akan smooth.
    Ada potensi animasi kalian akan patah-patah.
*/
let timeOutLoop = (index = 0) => {
    timeOutProgress.value = index;
    if(index < 100){
        setTimeout(timeOutLoop.bind(this, ++index), 0);
    }
}

/*
    Request Animation Frame akan membuka pintu rendering detour dan akan memastikan kalau setiap progress
    akan masuk ke setiap frame untuk di render. Hasilnya setiap pertambahan progress akan di update setiap
    frame persecond dimana layar dan gpu computer anda siap melakukannya.
*/
let requestAnimationLoop = (index = 0) => {
    requestAnimationProgress.value = index;
    if(index < 100){
        requestAnimationFrame(requestAnimationLoop.bind(this, ++index));
    }    
}

/*
    Sebagian developer mengakali frame per second dengan mensinkronisasikan waktu timeout dengan waktu frame per second di render.
    tetapi ini ide yang buruk, karena FPS setiap computer bisa berbeda-beda, dan komputer anda pun bisa mengalami fluktuasi
    jumlah frame persecond setiap saatnya. Kalian bisa bandingan dengan yang menggunakan request animation frame akan berbeda.
*/
let divisionLoop = (index = 0) => {
    divisionProgress.value = index;
    if(index < 100){
        setTimeout(divisionLoop.bind(this, ++index), 1000/60);
    }     
}
let animateAllProgressBars = (event) => {
    timeOutLoop();
    requestAnimationLoop();
    divisionLoop();
}
progressButton.addEventListener('click', animateAllProgressBars);

resetButton.addEventListener('click', (event) => {
    box.className = 'phase-1';
    box.removeAttribute("style");    
})

/*
    Pada experiment kali ini diperlihatkan kalau kalian melakukan multiple
    change style pada satu event, maka hanya style terakhir yang akan diupdate
    pada layar. Karena seluruh statement ini selesai, baru javascript akan memasukan
    hasil progress terakhir ke rendering detour.
*/
normalButton.addEventListener('click', () => {
    box.style.backgroundColor = "#c0392b";
    box.style.left = "100px";
    box.style.backgroundColor = "#27ae60";
    box.style.left = "0";
    box.style.backgroundColor = "#8e44ad";
    box.style.left = "200px";
});

/*
    Keseringan satu requestAnimationFrame tidak cukup untuk memperlihatkan updatenya
    dikarenakan waktu rendering detour yang jalan belakangan.
*/
singleButton.addEventListener('click', () => {
    box.style.backgroundColor = "#c0392b";
    box.style.left = "100px";
    requestAnimationFrame(() => {
        box.style.backgroundColor = "#27ae60";
        box.style.left = "0";
    });   
});

/*
    Tapi dengan menggunakan 2 requestAnimationFrame, ini akan bekerja.
    Tapi experiment ini hanya untuk memperlihatkan kalian bagaimana cara kerja event loop
    terhadap rendering.

    Untuk membuat animasi yang bagus, disarankan menggunakan CSS animation atau menggunakan
    javascript animation API library.
*/
multipleButton.addEventListener('click', () => {
    box.style.backgroundColor = "#c0392b";
    box.style.left = "100px";
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            box.style.backgroundColor = "#27ae60";
            box.style.left = "0";
        });
    });
});