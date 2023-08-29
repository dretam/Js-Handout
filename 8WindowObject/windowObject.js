/*
  Window object adalah global object yang diberikan oleh browser kepada javascript yang dijalankan di dalamnya, yang
  berfungsi sebagai library yang menyediakan seluruh function yang dibutuhkan untuk melakukan operasi javascript pada
  client side.*/
console.log(window);

//Sebenarnya, var adalah tindakan set property pada window object. (tidak termasuk let dan const)
var something = 8;
console.log(window.something);

console.log(window.x); //x belum di declare tapi bekerja

//parsing dan isNaN juga merupakan function milik window object
console.log(window.parseInt(4.2));
console.log(window.isNaN(4.2));

/*
  Karena seluruh nama fungsi yang sudah di reserve di dalam window object bersifat global,
  javascript tidak mengharuskan kalian untuk
*/

//Jenis-jenis dialog dari window object di layar browser.
alert("Hello World");
var booleanAnswer  = confirm("Do you wish to continue?");
var stringAnswer = prompt("Say something please");
console.log("Do you wish to continue answer: ", booleanAnswer);
console.log("Say something please answer: ", stringAnswer);

//Macam-macam property window
console.log(navigator.userAgent);
console.log(location.href);
console.log(location.protocol);
console.log(location.host);
console.log(location.port);
console.log(location.pathname);
console.log(location.search);
console.log(location.hash);
console.log(location.origin);

//refresh button
if(stringAnswer === "reload"){
  location.reload();
}

//hard refresh ctrl+f5
if(stringAnswer === "hardreload"){
  location.reload(true);
}

//go to google
if(stringAnswer === "google"){
  location.assign("https://www.google.co.id/");
}

//new window
//window.open(URL, name, specs, replace)
if(stringAnswer === "windowpopup"){
  googlePopUp = open("https://www.google.co.id/", 'Google', 'width=400,height=400,resizeable=yes');
}
//googlePopUp.close() untuk nutup windownya

/*Screen Information*/

//full screen total berikut OS nya
var fullwidth = screen.width;
var fullHeight = screen.height;
console.log(fullwidth + " x " + fullHeight);

//full browser layar terkecuali semua element dari OS
var availableWidth = screen.availWidth;
var availableHeight = screen.availHeight;
console.log(availableWidth + " x " + availableHeight);

//full browser layar, seharusnya sama dengan available resize
var availableWidth = outerWidth;
var availableHeight = outerHeight;
console.log(availableWidth + " x " + availableHeight);

//viewport width and height
window.addEventListener("resize", function(event){
  console.log(innerWidth + " x " + innerHeight);
});

//Timing function
var timeID = setTimeout(function(){
              console.log("Time's Up!");
            }, 5000);

//membatalkan time out
clearTimeout(timeID);

//Interval function
var intervalID = setInterval(function(){
  console.log("De ja vu");
}, 2000)

//membatalkan Interval
clearInterval(intervalID);
