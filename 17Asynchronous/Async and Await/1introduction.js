/*
    Dibawah ini adalah simulasi (pura-puranya saja) contoh kasus asynchronous proses dari mendownload beberapa file dari 
    lokasi host yang berbeda-beda.

    Setiap file di download dalam 3 tahap:
        1 Request untuk men-download: atau permintaan untuk mendownload.
        2 Proses mendownload
        3 Download selesai dan ekstraksi file.
*/

/*Function yang membuat dan mengembalikan promise untuk request download.*/
let getRequestPromise = ({fileName, host}) => {
    return new Promise((resolve, reject) => {
        if(fileName === undefined || host === undefined){
            console.log('Request cannot be indentified.');
            reject(false);
        } else {
            setTimeout(() => {
                console.log(`Requesting ${host} to download ${fileName}`);
                resolve({approval: true, fileName: fileName});
            }, 3000);
        }
    });
}

/* Fungsi untuk membuat promise notifikasi kalau proses download baru saja dimulai.*/
let getDownloadPromise = ({approval, fileName}) => {
    return new Promise((resolve, reject) => {
        if(approval){
            setTimeout(() => {
                console.log(`Downloading ${fileName} in process, please wait.`);
                resolve({approval: true, fileName: fileName});
            }, 2000);
        } else {
            console.log('Download process rejected');
            reject(false);
        } 
    });
}

/*Fungsi untuk membuat promise untuk file selesai di download dan ekstraksinya.*/
let getExtractPromise = fileName => {
    return Promise.resolve(`Download ${fileName} complete! extracting files now.`);
}

/*
    Perhatikan ketiga proses di atas, semua harus dilakukan secara berurutan, normalnya kalian harus lakukan dengan
    then seperti di bawah ini. 
*/
let target = {fileName: 'Visual Studio', host: 'Microsoft Network'};
getRequestPromise(target).then(request => {
    let download = getDownloadPromise(request);
    return download;
}).then(download => {
    let extract = getExtractPromise(download.fileName);
    return extract;
}).then(extract => {
    console.log(extract);
}).catch(rejected => {
    console.log(`Hasilnya: ${rejected}`);
})

/* 
    Tapi penggunaan then dan then dan catch seperti ini bisa membingungkan, terutama kalau prosesnya banyak.
        Oleh karena itu ecmascript membuatkan async dan await untuk kalian.

    async dan await adalah syntactic sugar (atau pemanis syntax) yang gunanya untuk membuat code lebih enak di tulis dan dibaca.
        async dan await akan menggantikan multiple dan catch yang ada, dan membuat code terlihat seperti syncrhonous programming.

    Dengan adanya async function kita bisa menulis asynchronous proses serasa menulis sychronous function, dikarenakan syntax await 
        yang bisa ditulis di dalam async function. 

    Dengan await kita bisa menunggu satu proses asynchronous untuk selesai terlebih dahulu, baru proses lanjutannya akan jalan.
        Konsepnya sama seperti dengan menulis then, lalu then, dan then lagi. Tetapi dengan adanya async dan await, kita tidak
        perlu berhadapan dengan then yang bertumpuk-tumpuk.
*/
async function downloadingFile(target){
    try{
        let request = await getRequestPromise(target);
        let download = await getDownloadPromise(request);
        let extract = await getExtractPromise(download.fileName);
        console.log(extract);
    } catch(rejected){ 
        console.log(`Hasilnya: ${rejected}`);
    }
    /* Salah satu hal yang luar biasa dari feature async function juga adalah kita bisa menggunakan*/
}
let secondTarget = {fileName: 'Intelli J', host: 'Jet Brains Site'};
downloadingFile(secondTarget);

/*Kita juga bisa membuat async function dalam function expression dan arrow function syntax*/
let downloadingFile2 = async function(target){
    try{
        let request = await getRequestPromise(target);
        let download = await getDownloadPromise(request);
        let extract = await getExtractPromise(download.fileName);
        console.log(extract);
    } catch(rejected){ 
        console.log(`Hasilnya: ${rejected}`);
    }    
}
let thirdTarget = {fileName: 'VS Code', host: 'Microsoft Network'};
downloadingFile2(thirdTarget);

let downloadingFile3 = async(target) => {
    try{
        let request = await getRequestPromise(target);
        let download = await getDownloadPromise(request);
        let extract = await getExtractPromise(download.fileName);
        console.log(extract);
    } catch(rejected){ 
        console.log(`Hasilnya: ${rejected}`);
    }    
}
let fourthTarget = {fileName: 'Notepad++', host: 'Don Ho Site'};
downloadingFile3(fourthTarget);