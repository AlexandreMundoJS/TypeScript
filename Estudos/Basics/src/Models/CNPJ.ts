"use strict";

class Cnpj {
  public _value: string;

  constructor(value: string) {
    this._value = value;
  }

  public showValue() {
    console.log(this._value);
  }
}

export { Cnpj };
