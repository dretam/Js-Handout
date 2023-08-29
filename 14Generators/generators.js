/*
  Generators: adalah fungsi yang bisa berhenti di tengah perjalanannya, lalu lanjut lagi
    dari tempat terakhirnya berhenti. Bisa dikatakan kalau generator adalah fungsi yang sifatnya seperti iterator.
*/

//generator ditulis dengan penulisan function dan * 
function* generatorSample(){
    console.log("Hello World");
  }
  {
    let sampleResult = generatorSample();
    console.log("First result: ");
    //Akan dilihat sebagai suspended object, atau object yang ditunda.
    console.log(sampleResult);
    
    //Sama seperti iterator, gunakan next() method untuk meng-invoke atau meng-eksekusinya.
    let nextResult = sampleResult.next();
    console.log("Result after next:");
  
    /*
      Hasil return dari generator memiliki protocol yang sama dengan iterator,
      yaitu object dengan field/property value dan done.
    */
    console.log(nextResult);
    console.log("================================");
  }
  
  /* 
    yield digunakan untuk memberhentikan dan melanjutkan generator,
    saat di invoke dengan next() method atau dengan loop.
  
    Bisa dikatakan yield seperti return statement, hanya saja bisa dilanjutkan.
  */
  function* sampleYield(){
    console.log('Message Before Yield');
    yield "The Return";
  }
  {
    let generator = sampleYield();
    console.log("Generator object: ");
    console.log(generator);
  
    /*
      next() yang pertama akan meng-eksekusi seluruh isi method,
      dan mengembalikan The Return dalam object dengan iterator protocol.
    */
    console.log("Result after next:");
    let nextResult = generator.next();
    console.log(nextResult);
  
    /*
      next() yang kedua tidak menghasilkan apa-apa, karena setelah yield,
      fungsi generatornya tidak berisikan apa-apa.
    */
    console.log("Result after 2nd next:");
    let afterNextResult = generator.next();
    console.log(afterNextResult);
    console.log("================================");
  }
  
  /* 
    Sekarang diberikan contoh lain, dimana setelah statement yield,
    masih ada beberapa line statement.
  */
  function* anotherSampleYield() {
    console.log('First Console Log');
    console.log('Second Console Log');
    yield "The Return";
    console.log('Third Console Log');
    console.log('Fourth Console Log');
  }
  {
    let generator = anotherSampleYield();
    console.log(generator.next());
    console.log(generator.next());  
    console.log("================================");
  }
  
  /* 
    Dibawah diberikan contoh kombinasi yield dan return.
    Seperti yang kalian tahu, return menandakan selesainya jalan eksekusi sebuah function.
    Jadi hasil dari return akan selalu memiliki done property = true.
  */
  function* yieldWithReturn(){
    console.log('Message Before Yield');
    yield "The Yield";
    console.log('Message Before Return');
    return 8 * 2;
  }
  {
    let generator = yieldWithReturn();
    let nextResult = generator.next();
    console.log(nextResult);
    let final = generator.next()
    console.log(final);
    console.log("================================");
  }
  
  //Contoh lain dengan banyak yield dan satu return.
  function* multipleYield(){
    console.log("Ini message pertama");
    yield "Yield 1";
    console.log("Ini message kedua");
    yield "Yield 2";
    console.log("Ini message ketiga");
    yield "Yield 3";
    console.log("Message sebelum return");
    return "Return";
  }
  {
    let generator = multipleYield();
    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next());
    console.log("================================");
  }
  {
    //Sama seperti iterator, generator juga bisa di iterate dengan for of
    let generator = multipleYield();
    for(let everyGenerate of generator){
      console.log(everyGenerate);
    }  
    console.log("================================");
  }
  
  /*
    Setelah yield berakhir, generator akan menerima parameter untuk persiapan eksekusi berikutnya.
    Parameter yang diterima dan di simpan ke dalam satu variable, bisa terus disimpan untuk eksekusi berikutnya.
    
    Tapi parameter tidak akan diterima sebelum satu fungsi yield di jalankan, karena kemampuan yield yang
    lainnya selain mengembalikan nilai adalah membuat parameter untuk eksekusi berikutnya.
  
    Argument bisa diaplikasikan pada parameter bracket fungsi next();
  */
  function* assigningYield(){
    console.log("First execution");
    let assignment = yield "Hello";
    console.log(assignment);
  }
  {
    let generator = assigningYield();
    console.log(generator.next());
    console.log(generator.next("World")); //di sini World dimasukan ke dalam variable assignment
    console.log("================================");
  }
  
  /*Di sini diberikan contoh multiple assignment pada yield.*/
  function* assignMultipleYield(){
    let paramOne, paramTwo, paramThree;
    paramOne = yield `\nHello ${paramOne}`; //paramOne di sini akan undefined, karena ini adalah yield yang pertama.
    
    /*Di sini, proses
      "yield `${paramOne}, I should give you.`;" --> akan dijalankan terlebih dahulu, sebelum assignment ke paramTwo.
  
      pada saat "yield `${paramOne}, I should give you.`;" dijalankan, paramOne diterima di baris atas dan 
      kembali di aplikasikan di sini.
    */
    paramTwo = yield `${paramOne}, I should give you.`;
    paramThree = yield `${paramTwo}. But that slippery slope.`;
    yield `You're only ${paramThree}`;
  }
  {
    let generator = assignMultipleYield();
  
    /*Friend tidak akan masuk ke dalam generator sama sekali, karena parameter
      belum tercipta sebelum eksekusi yield pertama dijalankan.*/
    console.log(generator.next("Friend").value);
    console.log(generator.next("May be").value);
    console.log(generator.next("a name").value);
    console.log(generator.next("in my head.").value);
    console.log("================================");
  }
  
  /*Kita juga bisa membuat generator dengan menggunakan iteration.
    Generator akan mengingat last value yang di loop di dalamnya.
  */
  function* sampleYieldIteration(){
    for(let index = 1; index < 4; index++){
      yield index;
    }
  }
  {
    let generator = sampleYieldIteration();
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next());
    console.log("================================");
  }
  
  /*
    Dengan membuat infinite loop, kita bisa membuat generator yang tidak pernah
    done atau selesai mengenerate, karena yieldnya akan terus dihasilkan.
  */
  function* infiniteCoordinateMovement(){
    let x = 0;
    let y = 0;
    while(true){
      yield {x:x, y:y};
      x += 2;
      y += 1;
    }
  }
  {
    let generator = infiniteCoordinateMovement();
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log("================================");
  }
  
  /*
    Selayaknya fungsi, generator juga bisa menerima parameter.
    Parameter ini akan diterima sekali saja ketika pembuatan object generator oleh
    fungsi generator ini.
  */
  function* withParameter(maxNumber){
    let step = 0;
    while(step <= maxNumber){
      yield step;
      step += 2;
    }
  }
  {
    let generator = withParameter(12);
    for(let execution of generator){
      console.log(execution);
    }
    console.log("================================");
  }
  
  /*
    Fungsi generator bisa juga ditulis dengan function declaration.
    Tetapi fungsi generator tidak bisa ditulis dengan arrow function.
  */
  let generatorDeclaration = function*(){
    console.log('Message Before Yield');
    yield "The Return";  
  }
  {
    let generator = generatorDeclaration();
    console.log(generator.next());
    console.log(generator.next());
    console.log("================================");
  }
  
  /*
    Fungsi generator juga bisa diaplikasikan sebagai method
    milik sebuah Class atau sebuah object. Contohnya seperti di bawah ini.
  */
  class Person{
    constructor(name, gender, birthDate, birthPlace){
      this.name = name;
      this.gender = gender;
      this.birthDate = birthDate;
      this.birthPlace = birthPlace;
    }
  
    *printBiodata(){
      yield `My name is ${this.name}`;
      yield `My gender is ${this.gender}`;
      yield `My birth date on ${this.birthDate.toDateString()}`;
      yield `I born at ${this.birthPlace}`;
    }
  }
  {
    let alex = new Person("Alex", "Male", new Date(1988, 10, 27), "Jakarta");
    let generator = alex.printBiodata();
    for(let biodata of generator){
      console.log(biodata);
    }
    console.log("================================");
  }
  
  let alex = {
    name: "Alex",
    gender: "Male",
    birthDate: new Date(1988, 10, 27),
    birthPlace: "Jakarta",
    *printBiodata(){
      yield `My name is ${this.name}`;
      yield `My gender is ${this.gender}`;
      yield `My birth date on ${this.birthDate.toDateString()}`;
      yield `I born at ${this.birthPlace}`;
    }  
  }
  {
    let generator = alex.printBiodata();
    for(let biodata of generator){
      console.log(biodata);
    }
    console.log("================================"); 
  }
  