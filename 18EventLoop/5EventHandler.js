/*
    Terkadang Queue dan Call Stack bisa bertindak berbeda dalam situasi dan kondisi
    tertentu dalam Event Listener. 

    Pada contoh dibawah kita akan membuatkan 2 buah buttons, dimana setiap button
    mendapatkan lebih dari satu listener.
*/

let microButton = document.querySelector("#micro");
let macroButton = document.querySelector("#macro");

microButton.addEventListener('click', () => {
    Promise.resolve('Microtask 1').then(message => console.log(message));
    console.log('Synchronous 1');
});

microButton.addEventListener('click', () => {
    Promise.resolve('Microtask 2').then(message => console.log(message));
    console.log('Synchronous 2');
});
/*
    Seperti yang sudah pernah dijelaskan sebelumnya, kalau by default queue micro task
    pasti jalan lebih belakangan dari synchronous task, tetapi apabila kalian click button
    pada layar browser anda, resultnya pada console adalah:

    Synchronous 1
    Microtask 1
    Synchronous 2
    Microtask 2
*/

//Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
//microButton.click();

/*
    Tapi cobalah uncomment code di atas, sehingga kalian trigger event handlernya dengan
    menggunakan function invocation, hasilnya akan berbeda:

    Synchronous 1 
    Synchronous 2
    Microtask 1
    Microtask 2    

    Kenapa hal ini terjadi? Itu dikarenakan call-stack yang berbeda yang dibentuk dari click button
    dan invoke click().

    Perhatikan call-stack pada browser, ketika di invoke microButton.click(); akan tetap berada di call-stack dengan urutan terakhir,
    sedangkan pada click button secara langsung, call-stack langsung melihat perintah di dalam listener.

    Ingat! Queue micro task tidak bisa shift dan put ke dalam call-stack sebelum call-stack benar-benar habis, ini yang menyebabkan
    urutannya berbeda.
*/

/*
    Lakukan lah experiment yang kalian lakukan barusan dengan menggunakan Macro Task.
    Macro Task tidak akan ada bedanya antara click button atau invocation.

    Apa pun yang terjadi Macro Task akan jalan lebih belakangan.
*/
macroButton.addEventListener('click', () => {
    setTimeout(() => {console.log("Macrotask 1")}, 0);
    console.log('Synchronous 1');
});
macroButton.addEventListener('click', () => {
    setTimeout(() => {console.log("Macrotask 2")}, 0);
    console.log('Synchronous 2');
});
//Uncomment Invocation dibawah ini untuk menjalankan contoh fungsinya.
//macroButton.click();

/*
    Mengapa ini bisa terjadi? Bukankah Macro Task juga menunggu seluruh process synchronous untuk habis?
    Di sinilah perbedaan management Queue pada Macro dan Micro Task.

    Antrian pada Macro Task memiliki sebuah "pintu", dimana antrian tidak boleh shift sebelum pintu dibuka kan.
    Antrian pada Micro Task akan langsung mengantri dibelakang sychronous task secara langsung tanpa proses mengantri.

    Antara 2 event listener ini, micro task mengira bahwa proses sychronous benar-benar habis pada proses click.
    Sedangkan Macro Task Que menunggu waktu yang tepat sampai js stop beroperasi dan men-shift setiap tasknya satu persatu.
*/