import { Cpf } from "../Models/CPF";
import { Cnpj } from '../Models/CNPJ';

class Validate {
  validCpf(cpf: string) {
    let cpfValue = new Cpf(cpf);
    let sum: number, rest: number;
    sum = 0;
    if (
      cpfValue._value == "00000000000" ||
      cpfValue._value == "11111111111" ||
      cpfValue._value == "22222222222" ||
      cpfValue._value == "33333333333" ||
      cpfValue._value == "44444444444" ||
      cpfValue._value == "55555555555" ||
      cpfValue._value == "66666666666" ||
      cpfValue._value == "77777777777" ||
      cpfValue._value == "88888888888" ||
      cpfValue._value == "99999999999"
    ) {
      return false;
    } else {
      for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpfValue._value.substring(i - 1, i)) * (11 - i);
      }
      rest = (sum * 10) % 11;
      if (rest == 10 || rest == 11) {
        rest = 0;
      }
      if (rest != parseInt(cpfValue._value.substring(9, 10))) {
        console.log("FALSE");
        return false;
      }
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpfValue._value.substring(i - 1, i)) * (12 - i);
      }

      rest = (sum * 10) % 11;

      if (rest == 10 || rest == 11) {
        rest = 0;
      }

      if (rest != parseInt(cpfValue._value.substring(10, 11))) {
        console.log("FALSE");
        return false;
      }

      console.log("TRUE");
      return true;
    }
  }

  validateCnpj(cnpj: string) {
    let cnpjValue = new Cnpj(cnpj)
    let length: number;
    let numbers: any;
    let digits: string;
    let sum: number;
    let pos: number;
    let result: any;

    if (cnpjValue._value.length !== 14) {
      console.log("FALSE");
      return false;
    }
    if (cnpjValue._value == "") {
      console.log("FALSE");
      return false;
    }
    if (
      cnpjValue._value == "00000000000000" ||
      cnpjValue._value == "11111111111111" ||
      cnpjValue._value == "22222222222222" ||
      cnpjValue._value == "33333333333333" ||
      cnpjValue._value == "44444444444444" ||
      cnpjValue._value == "55555555555555" ||
      cnpjValue._value == "66666666666666" ||
      cnpjValue._value == "77777777777777" ||
      cnpjValue._value == "88888888888888" ||
      cnpjValue._value == "99999999999999"
    ) {
      console.log("FALSE");
      return false;
    }

    length = cnpjValue._value.length - 2;
    numbers = cnpjValue._value.substring(0, length);
    digits = cnpjValue._value.substring(length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) {
      console.log("FALSE");
      return false;
    }

    length = length + 1;
    numbers = cnpjValue._value.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) {
      console.log("FALSE");
      return false;
    }
    console.log("TRUE");
    return true;
  }
}

export { Validate };
