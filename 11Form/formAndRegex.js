var formSearch = document.forms['search'];
var inputSearch = formSearch['searchBox'];

//property value digunakan untuk get dan set value dari input element.
inputSearch.value = "Search Here"; 

/*Di bawah ini adalah beberapa contoh event listener yang dirancang untuk form dan elementsnya*/

inputSearch.addEventListener("focus", function(){
  console.log("focused");
  if(inputSearch.value === "Search Here"){
    inputSearch.value = ""
  }
});
inputSearch.addEventListener("blur", function(){
  console.log("blurred");
  if(inputSearch.value === ""){
    inputSearch.value = "Search Here"
  }
});
inputSearch.addEventListener("change", function(){
  console.log("changed");
});
formSearch.addEventListener("submit", searchingNow);
function searchingNow(event){
  console.log("You Searched for: " + inputSearch.value);
  event.preventDefault();
}

//Form hero
var formHero = document.forms.hero;
formHero.addEventListener("submit", makeHero);
function makeHero(event){
  event.preventDefault();
  var hero = {};
  hero.heroName = formHero.heroName.value;
  hero.realName = formHero.realName.value;
  let choosenType = formHero.querySelector('[name="type"]:checked');
  hero.type = choosenType.value;
  hero.powers = [];
  let checkedPowers = formHero.querySelectorAll('[name="powers"]:checked');
  for(let checked of checkedPowers){
    hero.powers.push(checked.value);
  }
  hero.city = formHero.city.value;
  hero.origin = formHero.origin.value;
  alert(JSON.stringify(hero));
}

/*Regular Expression object*/

// 2 cara membuat Regular 13FormAndRegularExpression
var testPatternOne = /\w+ing/; //menggunakan / dan /
var testPatternTwo = new RegExp('\w+ing'); //Dengan membuat object baru

var ingPattern = /.*ing/;

//using test
console.log(ingPattern.test("joke"));
console.log(ingPattern.test("joking"));

//exec test
console.log(ingPattern.exec("joke"));
console.log(ingPattern.exec("joking"));

//Pakai regular expression as a validator forms
var formValidationMachine = document.forms.validationMachine;

formValidationMachine.addEventListener("submit", tryValidate);

function tryValidate(event){
  event.preventDefault();
  var inputOne = formValidationMachine.inputOne.value;
  var inputTwo = formValidationMachine.inputTwo.value;
  var inputThree = formValidationMachine.inputThree.value;
  var inputFour = formValidationMachine.inputFour.value;
  var inputFive = formValidationMachine.inputFive.value;
  var inputSix = formValidationMachine.inputSix.value;
  var inputSeven = formValidationMachine.inputSeven.value;
  var inputEight = formValidationMachine.inputEight.value;
  var inputNine = formValidationMachine.inputNine.value;
  var inputTen = formValidationMachine.inputTen.value;
  var inputEleven = formValidationMachine.inputEleven.value;
  var inputTwelve = formValidationMachine.inputTwelve.value;
  var inputThirteen = formValidationMachine.inputThirteen.value;
  var inputFourteen = formValidationMachine.inputFourteen.value;
  var inputFifteen = formValidationMachine.inputFifteen.value;
  var inputSixteen = formValidationMachine.inputSixteen.value;

  console.log("=============================================");

  var inputOnePattern = /ing/; //semua kata dimana terdapat unsur "ing" di dalamnya
  inputOnePattern.test(inputOne) ? console.log("input one match!") : console.log("input one not match...");

  var inputTwoPattern = /[aeiou]/; //salah satu huruf di dalam [] ada di dalam input
  inputTwoPattern.test(inputTwo) ? console.log("input two match!") : console.log("input two not match...");

  var inputThreePattern = /[A-Z]/; // at least terdiri dari salah satu huruf capital
  inputThreePattern.test(inputThree) ? console.log("input three match!") : console.log("input three not match...");

  var inputFourPattern = /[0-9]/; // at least terdiri dari satu numerical
  inputFourPattern.test(inputFour) ? console.log("input four match!") : console.log("input four not match...");

  var inputFivePattern = /[^aeiuo]/; //kalau semua wordnya terdiri dari sesuatu di dalam bracket gak akan match
  inputFivePattern.test(inputFive) ? console.log("input five match!") : console.log("input five not match...");

  var inputSixPattern = /[^a-z]/; //kata di dalamnya tidak boleh semuanya terdiri dari huruf lower case
  inputSixPattern.test(inputSix) ? console.log("input six match!") : console.log("input six not match...");

  var inputSevenPattern = /[Jj][aeiou]v[aeiou]/; //kombinasi
  inputSevenPattern.test(inputSeven) ? console.log("input seven match!") : console.log("input seven not match...");

  var inputEightPattern = /java/i; //i adalah case Insensitive, gak perduli huruf besar atau kecil
  inputEightPattern.test(inputEight) ? console.log("input eight match!") : console.log("input eight not match...");

  var inputNinePattern = /java/g; //global, digunakan untuk match function, bandingkan dengan yang non global di input 10
  console.log(inputNine.match(inputNinePattern));

  var inputTenPattern = /java/;
  console.log(inputTen.match(inputTenPattern));

  //multiline, mengeliminasi eksistensi \n atau new line character di dalam string
  var multilineString = "java\nscript";
  var multilinePattern = /^script/m;
  multilinePattern.test(multilineString) ? console.log("multiline match!") : console.log("multiline not match...");

  /*
    Metacharacters:

    . matches any character
    \w matches any word character, and is equivalent to [A-Za-z0-9_]
    \W matches any non-word character, and is equivalent to [^A-Za-z0-9_]
    \d matches any digit character, and is equivalent to [0-9]
    \D matches any non-digit character, and is equivalent to [^0-9]
    \s matches any whitespace character, and is equivalent to [ \t\r\n\f]
    \S matches any non-whitespace character, and is equivalent to [^ \t\r\n\f]
  */

  var inputElevenPattern = /j.v./;
  inputElevenPattern.test(inputEleven) ? console.log("input eleven match!") : console.log("input eleven not match...");

  var inputTwelvePattern = /\wing/;
  inputTwelvePattern.test(inputTwelve) ? console.log("input twelve match!") : console.log("input twelve not match...");

  /*
    Modifiers, dikondisikan pada suatu character sebelumnya:

    ? matches zero or one occurrence of the pattern
    * matches zero or more occurrences of the pattern
    + matches one or more occurrences of the pattern
    {n} matches n occurrences of the pattern
    {n,} matches at least n occurrences of the pattern
    {,m} matches at most m occurrences of the pattern
    {n,m} matches at least n and at most m occurrences of the pattern
    ^ specifies that the pattern must come at the beginning
    $ specifies that the pattern must come at the end
  */

  var inputThirteenPattern = /bos*/; //huruf s bisa tidak ada sama sekali atau bisa banyak, tapi bo harus ada
  inputThirteenPattern.test(inputThirteen) ? console.log("input thirteen match!") : console.log("input thirteen not match...");

  var inputFourteenPattern = /bos?/; //huruf s bisa tidak ada sama sekali atau cuma satu, ada banyak akan salah, tapi bo harus ada
  inputFourteenPattern.test(inputFourteen) ? console.log("input fourteen match!") : console.log("input fourteen not match...");

  var inputFifteenPattern = /bos+/;
  inputFifteenPattern.test(inputFifteen) ? console.log("input fifteen match!") : console.log("input fifteen not match...");

  var inputSixteenPattern = /J[aeiou]+\w*ing/;
  inputSixteenPattern.test(inputSixteen) ? console.log("input sixteen match!") : console.log("input sixteen not match...");

  console.log("=============================================");
}
