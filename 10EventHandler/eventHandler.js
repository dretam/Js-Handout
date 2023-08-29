/*
  Event handling adalah kemampuan sebuah aplikasi untuk mengeksekusi fungsi yang sudah di buat sebelumnya,
  dimana fungsi akan dieksekusi pada saat event (kejadian) tertentu terjadi. Sehingga event tersebut akan menjadi
  trigger dipanggilnya fungsi ini.

  Event listener atau method addEventListener adalah fungsi yang dimiliki oleh setiap object html element dan window object
  yang digunakan untuk memasangkan satu atau lebih event handler di element html atau pada aplikasi sendiri.

  Event jenisnya bermacam-macam, mulai dari click pada mouse, press pada keyboard, selesainya document html di load, dan lain sebagainya.
  Untuk mengetahui lebih lagi tentang macam-macam event, silahkan liat referensi event pada mdn website.

  https://developer.mozilla.org/en-US/docs/Web/Events
*/
var buttonOneNode = document.querySelector("#button-one");
var blankParagraphNode = document.querySelector("#blank-paragraph");

//check lewat developer tools pada browser untuk melihat event handler yang di attach kepada setiap element.
buttonOneNode.addEventListener("click", function(){
  console.log("button one is clicked!");
  blankParagraphNode.textContent = "Hello World!";
  blankParagraphNode.style.backgroundColor = "green";
  blankParagraphNode.style.color = "white";
});

buttonFourNode = document.getElementById("button-four");
/*
  seluruh function callback yang menjadi parameter dari addEventListener akan di bind dan menerima
  parameter berupa event object. Selalu gunakan event object untuk lebih best practicenya.
  Sebagian browser di sebagian versinya cukup peka dan bermasalah apabila function callback tidak menerima event parameter.

  event object bisa digunakan untuk berbagai macam feature, kurang lebih seperti contoh-contoh di bawah ini.
*/
buttonFourNode.addEventListener("click", function(event){
  //identifikasi jenis dan terget dari event dan element
  console.log(event.type);
  console.log(event.target);
});

coordinateScannerNode = document.getElementById("coordinate-scanner");
coordinateScannerNode.addEventListener("click", function(event){
  //deteksi lokasi coordinate pixel
  console.log("screen: ", event.screenX + "," + event.screenY);
  console.log("page: ", event.pageX + "," + event.pageY);
});

//contoh lain mouse event, double clicked
buttonFiveNode = document.getElementById("button-five");
buttonFiveNode.addEventListener("dblclick", function(event){
  console.log("double click is hit!");
});

/*
  keypress adalah event yang mendapat trigger dari character yang diketik dari keyboard
  Note: keypress membaca character, bukan command dari keyboard seperti shift, alt, capslock, option, dan lain-lain...
*/
addEventListener("keypress", function (event){
  console.log(`You pressed the ${event.key} character.`);
});

/*
  keydown adalah event yang mendapat trigger dari tombol apa pun yang ditekan pada keyboard.
  Lain dengan keypress, keydown bisa membaca command seperti shift, alt, capslock, dan lain sebagainya.
*/
addEventListener("keydown", function (event){
  console.log(`You press the ${event.key} button.`);
});

//keyup sama seperti keydown, hanya saja triggernya pada saat key di lepas, bukan pas ditekan.
addEventListener("keyup", function(event){
  console.log(`You release the ${event.key} button.`);
});

var buttonSixNode = document.getElementById("button-six");
buttonSixNode.addEventListener("touchend", function(event){
  console.log("You touch my heart...");
});

//Event handler bisa ditambahkan, tentu saja bisa dihapus.
var buttonSevenNode = document.getElementById("button-seven");
buttonSevenNode.addEventListener("click", removeEvent);
//gunakan method removeEvent untuk menghapus event handler
function removeEvent(event){
  console.log("test click");
  buttonSevenNode.removeEventListener("click", removeEvent);
}

/*
  Event prevent default sangat berguna, preventDefault adalah method yang
  digunakan untuk mencegah perintah event listener default yang tertera pada html element, seperti submit
  yang secara default men-submit isi form dan anchor tag yang secara default me-request link.

  feature ini bisa digunakan untuk mencegah html me-request http ke sebuah server.
*/
var buttonEightNode = document.getElementById("button-eight");
buttonEightNode.addEventListener("click", function(event){
  console.log("initialization.. then stopped!");
  event.preventDefault();
});

//Berikut ini adalah contoh bind pada penggunakan addEventListener method
var buttonNineNode = document.getElementById("button-nine");
buttonNineNode.addEventListener("click", buttonNineRespond.bind(this, "Ben", blankParagraphNode));
function buttonNineRespond(name, node){
	console.log("Hello " + name);
	node.textContent = "Callback Style";
}

/* 
  Ketika membuat satu element berada di dalam dom html lainnya, event listener tertempel pada dom child element dan parent element sekaligus.
  Event listener lain akan ikut ke trigger dan mengakibatkan Event Propagation.

  Event propagation (propagate = ikut-ikutan): adalah suatu event lain yang ikut ke trigger tanpa sengaja mengikuti sebuah event yang dimaksud
  kan untuk terjadi.

  kita bisa menggunakan stopPropagation() method untuk mencegah ini terjadi.
*/

/*Bubbling Propagation: adalah dimana event pada parent element ikut ke trigger karena event pada child element terjadi.*/
var carrierNode = document.getElementById("carrier-ship");
var fighterNode = document.getElementById("jet-fighter");
carrierNode.addEventListener("click", function(event){
  console.log("Carrier launch!");
});
//carrier ikut ke trigger pada saat fighter di click
fighterNode.addEventListener("click", function(event){
  console.log("Fighter Launch!");
  event.stopPropagation();// menghentikan propagation
});

/*
  Kita bisa merubah bubbling propagation menjadi capturing propagation dengan menambahkan parameter boolean dengan argumen
  Capturing Propagation: adalah event pada child element ikut ke trigger karena event pada parent element terjadi.
*/
var motherNode = document.getElementById("mother-ship");
var ufoNode = document.getElementById("flying-ufo");
motherNode.addEventListener("click", function(event){
  console.log("Mother ship launch!");
}, true);
//carrier ikut ke trigger pada saat fighter di click
ufoNode.addEventListener("click", function(event){
  console.log("Flying UFO Launch!");
}, true);