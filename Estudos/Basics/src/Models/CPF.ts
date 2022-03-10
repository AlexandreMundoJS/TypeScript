"use strict";

class Cpf {
  public _value: string;

  constructor(value: string){
    this._value = value;
  }
 
  public showValue(){
      console.log(this._value);
  }
}

export {Cpf};
