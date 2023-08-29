//Code berikut tidak akan membuat perubahan, karena DOM belum selesai di proses
var bottomTwo = document.getElementById("bottom-two");
if(bottomTwo != null){
  bottomTwo.style.backgroundColor = "purple";
}

document.addEventListener("DOMContentLoaded", function(event) {
  var bottomThree = document.getElementById("bottom-three");
  bottomThree.style.backgroundColor = "purple";
}); //Setelah matinya IE8, methode ini aman digunakan, karena cuma gak jalan di IE lama saja.

/*
  Di atas merupkan alternative penulisan di dalam jquery:

  Alt 1: $(document).ready(function(){});

  Alt 2: $(function(){});

  Alt 3: jQuery(document).ready(function(){});

  Alt 4: (function($){})(jQuery);
*/

//Akan lebih dijelaskan pada Chapter 12 Event Handler
