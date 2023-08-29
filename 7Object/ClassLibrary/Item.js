class Item{
    constructor(){
    }
    
    /*
      Pada ecmascript versi baru, kita bisa menulis getter setter juga, penulisannya kurang lebih seperti di bawah.
      Menulis get atau set, lalu nama fieldnya. Kedua method ini akan terpanggil ketika anda get atau set fieldnya.
  
      Rasanya getter dan setter tidak begitu berguna pada javascript, mengingat kita bisa menciptakan field dari object literal dan
      tidak ada access modifier pada javascript. Namun getter setter pada js bisa kita interupsi proses fieldnya.
    */
    get name(){
      return this._name;
    }
    set name(value){
      this._name = value;
    }
  
    /*Misalnya kita akan membuat type hanya bisa set only, tidak bisa get, maka saya akan mengembalikan null setiap kali ada
      permintaan get type.
    */
    get type(){
      return null;
    }
    set type(value){
      this._type = value;
    }
  
    /*Atau kita menggunakan get only, tapi tidak bisa set, kita bisa merubah setnya.*/
    get color(){
      return this._color;
    }
    set color(value){
      this._color = null;
    }
  
    /*Atau kita bisa memanipulasinya di tengah get atau end*/
    get brand(){
      return this._brand;
    }
    set brand(value){
      this._brand = value.toUpperCase();
    }
    
    //Note: Kita tidak bisa menggunakan arrowed function notation pada getter setter.
}