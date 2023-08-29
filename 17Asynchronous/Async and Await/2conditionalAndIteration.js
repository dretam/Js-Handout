/* Diberikan contoh proses asycn memotong sebuah buah lalu mengubahnya menjadi juice dengan blender. */

//memotong buah dibutuhkan waktu 2 detik
let cutFruit = (fruit) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Cut ${fruit} into slices.`);
            resolve(`sliced ${fruit}`);
        }, 2000);
    })
}

//mem-blend buah yang sudah dipotong membutuhkan waktu 1 detik
let blendFruit = (slicedFruit) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Blend ${slicedFruit}.`);
            resolve(true);
        }, 1000);        
    })
}

//pada umumnya membuat async function proses mengubah buah jadi juice bisa dilihat seperti dibawah ini.
let makeSmoothies = async(fruit) => {
    let sclicedFruit = await cutFruit(fruit);
    blendFruit(sclicedFruit);
}

//Dalam kasus ini setiap buah di hardcode pada argumentnya.
let allSmoothies = async() => {
    makeSmoothies("orange");
    makeSmoothies("strawberry");    
}
allSmoothies();

/*
    Lalu diberikan satu buah tahap lagi, yaitu memilih buah yang ingin di smoothies.
    Sehingga pembuatan smoothie menjadi 3 tahap.
*/
let getFruit = async(name) => {
    let fruits = {
        buah1: 'manggo',
        buah2: 'peach',
        buah3: 'apple',
        buah4: 'cherry',
        buah5: 'grape',
        buah6: 'banana',
        buah7: 'durian',
        buah8: 'mangosteen',
        buah9: 'jack fruit'
    };
    return Promise.resolve(fruits[name]);
}

/*
    Kita bisa menggunakan 2 alternatif di sini, memakai fungsi map dari array atau simplenya dengan for of.
*/

/* 
    Alternatif 1 adalah dengan menggunakan map, disini call back di dalam parameter map akan membuat fungsi
    dimana setiap array requirements akan satu persatu di ambil buahnya, di potong dan di blend.

    Tapi bisa kalian lihat, 1 buah harus terlebih dulu beres menjadi smoothie baru bisa buah yang lain diproses.
*/
{
    let requirements = ['buah1', 'buah2', 'buah3'];
    let smoothies = requirements.map(async(requirement) => {
        let fruit = await getFruit(requirement);
        let sclicedFruit = await cutFruit(fruit);
        let result = await blendFruit(sclicedFruit);
        console.log(`Smoothie selesai ${result}`);
    });
}

/*
    Alternatif 2: dengan menggunakan for of, kita bisa membuat setiap proses smoothies setiap buah berjalan async.
    Tetapi pada alternatif ke 2 setiap requirementnya tetap dibaca secara sync.
*/
{
    let requirements = ['buah4', 'buah5', 'buah6'];
    let fruitLoop = async() => {
        for(let requirement of requirements){
            let fruit = await getFruit(requirement);
            let sclicedFruit = await cutFruit(fruit);
            let result = await blendFruit(sclicedFruit);
            console.log(`Smoothie selesai ${result}`);
        }
    }
    fruitLoop();
}

/*
    Bagaimana bila setiap requirement dibaca secara async? Lalu kapan pun requirement selesai dibaca, buah langsung dicari.
    Lalu setiap kali buah ditemukan, silahkan jalankan proses smoothies secara async?
*/
{
    let requirements = ['buah7', 'buah8', 'buah9'];

    /*
        Awalnya baca dan carilah buah secara async lewat map, tetapi perlu diperhatikan bahwa
        hasil map tersebut adalah promisedFruits, jadi pada line dibawah ini, buah belum tentu sudah ditemukan.

        Isi dari promisedFruits adalah pending getFruit, sehingga kita tidak bisa melakukan proses langsung terhadapnya.
        Karena fungsi map menghasilkan result dalam array juga, berarti promisedFruits adalah array of Promised.
    */
    let promisedFruits = requirements.map(async requirement => getFruit(requirement));
    console.log(promisedFruits);

    /* 
        Pada ecmascript yang baru, kita melakukan Looping terhadap Promised collection, yaitu dengan
        menuliskan for await.
    */
    let fruitLoop = async() => {
        for await(let fruit of promisedFruits){
            let sclicedFruit = await cutFruit(fruit);
            let result = await blendFruit(sclicedFruit);
            console.log(`Smoothie selesai ${result}`);            
        }
    }
    fruitLoop();
}

/* 
    Selain dengan digunakan pada for, await juga bisa digunakan pada if dan else if.
*/
{
    let fruitInspection = async(requirement) => {
        if(await getFruit(requirement) === 'peach'){
            console.log('jarang ditemukan di indonesia.');
        } else if (await getFruit(requirement) === 'durian'){
            console.log('tidak baik utuk penderita tekanan darah tinggi.');
        /*
            perhatikan pada else if yang ini, tidak digunakan await, oleh karena itu case tidak akan pernah kena.
            Dikarenakan getFruit masih berbentuk Promise dan cherry belum ditemukan.
        */
        } else if(getFruit(requirement) === 'cherry'){ 
            console.log('sangat mahal harganya');
        } else {
            console.log('bukan ketiganya');
        }
    }
    fruitInspection('buah2');
    fruitInspection('buah7');
    fruitInspection('buah4');
}