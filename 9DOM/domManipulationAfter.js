/*
    Window object juga memberikan kita sebuah property dengan nama document.
    document adalah seluruh html document yang ada pada halaman ini, atau bisa dikatakan sebagai root DOM beserta seluruh
    element di dalam nya.
*/
console.log(window.document);
console.log(typeof document); //Seluruh DOM element di dalam halaman html akan memiliki tipe data object.

/*
    Seperti CSS, javascript juga membutuhkan selector untuk bisa memanipulasi DOM di dalam HTML.
    Javascript melakukan seleksi dengan menggunakan beberapa method.
    Method selector pada javascript akan mengembalikan 2 macam alternative, baik 1 DOM atau HTML Collection (array berupa multiple DOm).
*/
//Seleksi menggunakan nama id, selector ini akan selalu mengembalikan DOM tunggal.
var unikNode = document.getElementById("unik");
console.log(unikNode);

//getElementsByTagName menggunakan nama html element untuk men-seleksi, dan akan selalu mengembalikan HTML Collection.
var allDivs = document.getElementsByTagName("div");
console.log(allDivs);
var allLinks = document.getElementsByTagName("a");
console.log(allLinks);
console.log(allLinks[0]);

//getElementByClassName menggunakan nama class untuk menseleksi, dan akan selalu mengembalikan HTML Collection.
var leftContainer = document.getElementsByClassName("left-container");
console.log(leftContainer);

/*
    Bila kalian memahami CSS dan JQuery selector, kalian bisa menggunakan method querySelector atau querySelectorAll
    untuk melakukan seleksi DOM. String parameter di dalam fungsi akan berisi notasi selector CSS, seperti . untuk class selector
    , # untuk id selector, berikut juga attribute dan complex selector juga akan berfungsi di sini.
*/
//querySelector method akan mengembalikan DOM HTML tunggal, apabila ditemukan lebih dari satu element yang match dengan selector
//akan dipilih yang paling pertama.
var specialID = document.querySelector("#special");
console.log(specialID);

//querySelectorAll adalah versi HTML Collection dari method querySelector
var linkInLeftContainer = document.querySelectorAll(".left-container a");
console.log(linkInLeftContainer);

var unikContainer = document.getElementById("unik-container")
/*
    Kita juga bisa melakukan seleksi lain secara relative dari posisi dom yang sudah kita dapat.
    Misalnya kita ingin memiliki html di bawah, di sebelah atau di atas dari dom yang kita punya, tidak perduli
    element apa pun itu atau memiliki attribute apa pun element tersebut.
*/

//memilih semua child nodes dari element yang dipilih, yang dikembalikan berupa HTML Collection.
var unikContainerChildren = unikContainer.childNodes;
console.log(unikContainerChildren);

//memilih 1 single element pertama dari child element
var unikContainerFirstChild = unikContainer.firstChild;
console.log(unikContainerFirstChild);

//memilih 1 single element terakhir dari child element
var unikContainerLastChild = unikContainer.lastChild;
console.log(unikContainerLastChild);

//parent node sangat berguna untuk melakukan seleksi element yang menjadi container atau parent dari element yang kita pilih.
//parent node sangat berguna dikarenakan querySelector tidak memiliki kemampuan untuk memilih parent dari sebuah element.
var parentOfUnikNode = unikNode.parentNode;
console.log(parentOfUnikNode);

//mendapat satu element tepat setelah dom yang dipilih.
var nextOfUnikNode = unikNode.nextSibling;
console.log(nextOfUnikNode);

//mendapat satu element tepat sebelum dom yang dipilih.
var previousOfUnikNode = unikNode.previousSibling;
console.log(previousOfUnikNode);

//cara mendapatkan text content dari sebuah element
var specialNode = document.getElementById("special");
console.log(specialNode.textContent);

//Mendapatkan value dari HTML attribute dari HTML DOM yang saat ini sedang dipilih.
var specialLink = specialID.getAttribute("href");
console.log(specialLink);
var specialName = specialID.getAttribute("name");
console.log(specialName);

/*
    Untuk set html attribute baru, kita bisa menggunakan method setAttribute
    Note: menggunakan setAttribute bukan menambah attribute value, tapi secara total akan me-replace atau akan
        set ulang html attribute tersebut.
*/
var snipeNode = document.getElementById("snipe");
snipeNode.setAttribute("class", "general-text");

/*
    Ketimbang menggunakan method getAttribute("class") atau getAttribute("id"), kita bisa 
    menggunakan property className dan id untuk get dan set id dan class
*/
console.log(snipeNode.className);
console.log(snipeNode.id);
snipeNode.className = "new-class";
console.log(snipeNode.className);

/*
    karena setAttribute adalah method yang digunakan untuk me-replace atau menambahkan seluruh attribute yang di set,
    berarti kita tidak bisa menggunankan setAttribute untuk menambahkan, menghapus atau men-toggle class name.

    Gunakan property collection classList untuk menambah, menghapus dan men-toggle.
*/
var targetNode = document.getElementById("target");
targetNode.classList.add("class-three");
targetNode.classList.remove("class-one");

//Toggle adalah cara untuk menambah dan menghapus class dengan perintah yang sama sesuai dengan kondisi class saat ini.
targetNode.classList.toggle("class-four"); //toggle di sini akan bersifat add, karena class-four tidak ditemukan di target
targetNode.classList.toggle("class-four"); //toggle di sini akan bersifat remove, karena class-four sudah ada di dalam target saat ini.

//method contains digunakan untuk check apakah node punya class tersebut atau gak. (dikembalikan dalam boolean)
console.log(targetNode.classList.contains("class-two")); 

/*Kita bisa membuat html element baru lewat javascript, setiap html element baru yang 
    diciptakan, akan di muat dalam heap memory, layaknya sebuah object.*/
var newParagraph = document.createElement("p");
newParagraph.textContent = "Transition 1";
console.log(newParagraph);

/*Kita bisa menambahkan element baru di sebuah existing dom dengan menggunakan method appendChild.
  Note: appendChild bekerja dengan existing DOM di document atau di dalam heap.*/
var middleContainerNode = document.querySelector(".middle-container");
middleContainerNode.appendChild(newParagraph);
var newParagraphTwo = document.createElement("p");
var newTextNodeTwo = document.createTextNode("Transition 3");
newParagraphTwo.appendChild(newTextNodeTwo);

/*insertBefore adalah appendChild dengan kemampuan menyisipkan element tepat
    di satu posisi satu sebelum child element di dalam parent element yang menjadi tujuan.*/
middleContainerNode.insertBefore(newParagraphTwo, newParagraph);

//digunakan untuk me-remove html element
middleContainerNode.removeChild(newParagraph);

/*
    innerHTML adalah feature berupa property yang menarik seluruh isi DOM dari dari selected html,
    dimana data type innerHTML adalah string. Jadi kita bisa get 
*/
var middleInnerHtml = middleContainerNode.innerHTML;
console.log(middleInnerHtml);

//Replacing innerHTML
var newInnerHTML = '<p class="ordinary-group">Experimental Paragraph One</p>';
middleContainerNode.innerHTML = newInnerHTML;

//Updating inline style
var bottomOne = document.getElementById("bottom-one");
bottomOne.style.backgroundColor = "red";
bottomOne.style.color = "white";