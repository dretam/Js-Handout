
let students = [
    {name:'Jack Russel', major:'Information Technology'},
    {name:'Maria Sinegan', major:'Finance'},
    {name:'Andrea Sigil', major:'Design'}
];
let studentsNode = document.querySelector(".student-list");

let addStudent = (newStudent) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            students.push(newStudent);
            resolve();
        }, 2000);
    })
}

//print seluruh nama siswa ke HTML
let getStudents = () => {
    let output = '';
    for(student of students){
        output = output.concat(`<li data-major="${student.major}">${student.name}</li>`);
    }
    studentsNode.innerHTML = output;
}

//print seluruh nama siswa ke HTML setelah 2 detik
let printStudentsTimeOut = () => {
    setTimeout(()=> {
        let output = '';
        for(student of students){
            output = output.concat(`<li data-major="${student.major}">${student.name}</li>`);
        }
        studentsNode.innerHTML = output;
    }, 2000)
}

{
    /*
        Code di dalam comment ini akan menghasilkan masalah, dikarenakan proses synchronous yang dihasilkan
        dari getStudent mendahului promise dari addStudent, sehingga Daniel Laruso tidak akan ikut di print.
    */
    /*
    addStudent({name: 'Daniel Laruso', major: 'Sport and Martial Art'}).then();
    printStudents();
    */

    /*
        Dengan then kita bisa menunggu Daniel untuk di tambahkan terlebih dahulu, sehingga proses
        printStudents akan menunggu list student ditambahkan terlebih dahulu, walaupun printStudent memilliki timeout
        yang relative lambat (ada proses).
    */
    addStudent({name: 'Daniel Laruso', major: 'Sport and Martial Art'}).then(printStudentsTimeOut);
}

/*
    Kita bisa membuat promise dengan berbagai alternatives dan dengan berbagai return dan delay.
    Promise all bisa dimanfaatkan juga untuk memastikan kalau seluruh hasil akan dikembalikan dalam waktu yang bersamaan (tidak susul menyusul)
*/
let constructedPromise = new Promise((resolve, reject) => {
    resolve('Promise ini dibuat dengan Promise constructor');
})
//Promise.resolve adalah cara singkat untuk menghasilkan promise sekaligus untuk meresolvenya bila tidak ada proses di dalamnya.
let staticPromise = Promise.resolve('Promise ini tidak dibuat dengan constructor');
let simpleVariable = 'Simple Variable';
let fetchPromise = fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
let timeoutPromise = new Promise(function(resolve){
    setTimeout(resolve, 1000, 'Promise ini terjadi setelah 2 detik');
})

Promise.all([constructedPromise, staticPromise, simpleVariable, fetchPromise, timeoutPromise]).then(values => console.log(values));