/* 
  Iterator adalah sebuah object yang mendefinisikan sequence/ sesuatu yang berurutan,
  dimana akan mengembalikan value pada saat methodnya selesai.

  Contoh dibawah ini adalah contoh sederhana sebuah fungsi yang mengembalikan object iterator.
*/
function createRangeIterator(start = 0, end = Infinity, step = 1){
    let nextIndex = start;
    let count = 0;
    let rangeIterator = {
      next: function(){
        let result;
        if(nextIndex < end){
          result = { value: nextIndex, done: false };
          nextIndex += step;
          count++;
          return result;
        }
        return {value: count, done: true};
      }
    };
    return rangeIterator;
  }
  /* 
    Bisa dilihat fungsi next dan object yang di return olehnya dalam field value dan done?
    Itu adalah protocol yang harus diikuti ketika membuat sebuah iterator.
  
    Iterator Protocol: iterator harus memiliki method next() sebagai membernya dan object yang di return dalam method next() harus
      berupa object dengan field value: dan done: , dimana value adalah nilai yang dikembalikan dan done adalah boolean yang mengkonfirmasi apakah
      iteration sudah selesai atau belum.
  */
  
  let ourIterator = createRangeIterator(1, 10, 2);
  
  //Dengan meng-invoke method next(), kita meng-inisiasikan iterator
  let node = ourIterator.next();
  
  while(!node.done){//done menandakan selesainya iterator
    console.log(node);
    node = ourIterator.next();
  }
  
  /*
    Kita bisa mengembakan iterator ke bentuk yang lebih advance lagi, dimana iterator kita bisa memiliki property field sendiri,
    menyimpan value sendiri, dan memiliki data structure sendiri. Oleh karena itu kita akan membuatkan Iterable.
  
    Iterable: adalah object yang dibentuk menjadi data structure tertentu untuk collection yang tersimpan di dalamnya.
      Seluruh iterable memiliki iterator yang berfungsi untuk me-manage mechanisme-nya.
  
    Symbol.iterator: adalah built-in symbol yang digunakan untuk mengembalikan object iterator, atau bisa
      dikatakan kalau Symbol.iterator adalah iterator factory. Symbol.iterator digunakan agar semua iteration method
      bisa secara otomatis menerima iterators.
  
    Iterator dalam Iterable: adalah pointer/reference yang menunjuk value berikutnya dari collection di dalam iterable.
  
    Iteration Protocol: adalah tata cara atau aturan yang harus dipenuhi untuk membuat iterable dan iterator.
    Iterable Protocol: untuk membuat iterable, sebuah iterable harus memiliki method [Symbol.iterator]().
  */
  let myCompetencies = { //myCompetencies adalah iterable
    allCompetencies:{ //allCompetencies adalah collectionnya
      dataBase:["MySQL", "SQL Server", "Oracle DB", "Postgre SQL", "Maria DB", "Cassandra", "Mongo DB"],
      serverSide:["Java", "C#", "PHP", "Ruby", "Node.js", "Phyton", "GO-lang"],
      clientSide:["HTML 5", "CSS3", "ECMA Script", "Angular.JS", "React.JS"]
    },
    [Symbol.iterator](){//[Symbol.iterator adalah iterator factory]
      let categories = Object.values(this.allCompetencies);
      let currentSkillIndex = 0;
      let currentCategoryIndex = 0;
      return{//object yang di return adalah iteratornya.
        next(){
          let skills = categories[currentCategoryIndex];
          let noMoreSkills = !(currentSkillIndex < skills.length);
          if (noMoreSkills){
            currentCategoryIndex++;
            currentSkillIndex = 0;
          }
          let noMoreCategories = !(currentCategoryIndex < categories.length);
          if (noMoreCategories) {
            return {value: undefined, done: true};
          }
          return {value: categories[currentCategoryIndex][currentSkillIndex++], done:false};
        }
      };
    }
  };
  /*
    Perhatikan pada kasus di atas ini, allCompetencies memiliki data structure yang tidak bisa di iterate
    dengan menggunakan for of atau for each biasa, dikarenakan setiap competency berada di array dimana setiap array berada
    di dalam property/field di dalam myCompetencies, dimana setiap properties adalah category dari competencies.
  
    Untuk meng-iterate ini, diperlukan switch dari property ke property, lalu melakukan iteration.
  */
  
  //Sekarang kita bisa melakukan iteration seperti biasa pada my competencies
  console.log("\nSkill-skill dari my competencies:")
  for(let skill of myCompetencies){
    console.log(`Value skill: ${skill}`);
  }
  
  /*
    Hal lain yang bisa dilakukan adalah dengan menggunakan method next() yang dimiliki object iterator 
    satu-persatu.
  */
  let myCompetenciesIterator = myCompetencies[Symbol.iterator](); //Sebelumnya kita harus mengambil dulu object iteratornya.
  
  //gunakan field value untuk mengambil valuenya, dan done untuk mendapatkan konfirmasi apakah iteration sudah berada di ekor.
  console.log(myCompetenciesIterator.next());
  console.log(myCompetenciesIterator.next().value);
  
  //Kita akan gunakan for loop untuk menghabiskan seluruh value pada iterator dan melihat ekor dari iterator
  for(let index = 0; index <= 17; index++){
    let iteratorObject = myCompetenciesIterator.next();
    if(iteratorObject.done){
      //tail pada iterator yang dibuat berakhir setelah satu value terakhir, kalian bisa mengaturnya berbeda.
      console.log(iteratorObject);
    }
  }
  
  //Kita juga bisa menambah categories dan value pada iterable object yang sudah dibuat.
  myCompetencies.allCompetencies.operatingSystem = ["Windows 10", "Windows Server", "OSX", "Linux Fedora"];
  console.log("\nSkill-skill dari my competencies setelah penambahan:")
  for(let skill of myCompetencies){
    console.log(`Value skill: ${skill}`);
  }