/*Normalnya ketika kita mau membuat character " dan ' di dalam string, kita harus melakukan escaping character seperti dibawah ini.*/
var escapingSingleQuotation = "escaping \'";
console.log(escapingSingleQuotation);

var escapingDoubleQuotation = "escaping \"";
console.log(escapingDoubleQuotation);

/*Tetapi karena javascript memiliki alternative quotes, kita bisa melakukan trick seperti di bawah ini*/
var escapingTrickSingleQuotes = "escaping '";
var escapingTrickDoubleQuotes = 'escaping "';

//Sisa escaping characters sama seperti bahasa pemrograman pada umumnya
var endOfLine = "testing end of line \ntesting new line";
console.log(endOfLine);

var tabbing = "\t test tabbing";
console.log(tabbing);

//String length
var fewWords = "Going Somewhere";
fewWords.length = 20; //membuktikan immutable property
console.log(fewWords.length);

console.log("Convert to UpperCase " + fewWords.toUpperCase());
console.log("Convert to LowerCase " + fewWords.toLowerCase());
console.log("The fourth character is " + fewWords.charAt(3));
console.log("Index of S is " + fewWords.indexOf('S'));
console.log("Index of e is " + fewWords.indexOf('e'));
console.log("Last index of r is " + fewWords.lastIndexOf('r'));
console.log("Last index of e is " + fewWords.lastIndexOf('e'));

//Jalan lain melakukan concating string variable
var concatingString = "Let's ".concat("show all developers ", "a jolly good time.");
console.log(concatingString);

var trimString = "\t     Terrible      gap, is exist       between words.";
console.log("Before string getting trim:" + trimString);
console.log("After string getting trim:" + trimString.trim());

/*
    Di dalam versi ES6, javascript sudah bisa menggunakan Template Literals/ Template String,
    Ini sama persis dengan string interpolation atau string format pada java dan C#.
*/
//Untuk menggunakan template literals, kita harus menggunakan ` ` bukan '' sebagai string quotes-nya.
let name = "Helena Bonham";
let state = "Colorado";
let sentence = `This is ${name}, and she lives in ${state}`
console.log(sentence);

//Kita juga bisa melakukan operation di dalam literals
let message = `Total harga barang: $${3 * 4.50}`;
console.log(message);

/* Dengan menggunakan template, kita bisa menulis white space seperti di bawah ini, yang tadinya tidak possible dengan "" */
let whiteSpaceString = `
    The future beongs to 
        those
    who belives

in the beauty of their dreams
`;
console.log(whiteSpaceString);

/*Kemampuan lain dari string template adalah tagging featurenya, 
  dimana kita sanggup invoke sebuah function dengan menggunakan string template.
  
  Harus dilakukan adalah menulis nama function di depan templatenya.
  Lalu seluruh isi template akan secara otomatis menjadi arguments.
*/
function tagging(stringArray, amount, conclusion){
    //Seluruh string pada template akan secara otomatis menjadi collection, dan seluruh variable di dalamnya akan menjadi argument lain secara berurutan.
    if(amount < 2000){
        conclusion = "quota anda tidak mencukupi untuk berlangganan dengan plan ini.";
    } else {
        conclusion = "apakah anda mau berlangganan dengan plan ini?"
    }
    return `${stringArray[0]}${amount}${stringArray[1]}${conclusion}`
}
let smsMessage = tagging`Kepada yang terhormat pelanggan kami. kami informasikan pulsa anda yang tersisa ${1000}. 
Dengan sisa quota seperti ini: ${"replaceable conclusion"}`;
console.log(smsMessage);

//Dan disediakan juga beberapa method string yang digunakan untuk mencari string seperti contoh-contoh dibawah ini:
let words = 'If you dream it, you can do it.';

//startsWith: method untuk mencari sekumpulan string di dalam sebuah string yang diawali dengan.
console.log("================== Starts With =====================");
console.log(words.startsWith('If you'));
console.log(words.startsWith('you can do'));
console.log(words.startsWith('you can do', 17)); //17 menunjukan dimulai dari character pada index ke x

//endsWith: method untuk mencari sekumpulan string di dalam sebuah string yang diakhiri dengan.
console.log("================== Ends With =====================");
console.log(words.endsWith('do it.'));
console.log(words.endsWith('you can'));
console.log(words.endsWith('you can', 24)); //18 menunjukan dimulai dari character pada index ke x, lalu dilihat dari belakang.

//includes: apakah mengandung atau memiliki sederetan string ini, tidak perduli di akhir, belakang atau tengah
console.log("================== Includes =====================");
console.log(words.includes('you can'));
console.log(words.includes('it.'));
console.log(words.includes('nonexistent'));