// We can use Namespaces like: Validation 
// or subnamespaces like: Validation.valid
namespace Validation.valid {
  export interface IValidator {
    isValid(s: string): boolean;
  }
  export class OnlyLettersValidator implements IValidator {
    lettersRegexp = /^[A-Za-z]+$/;
    isValid(s: string) {
      return this.lettersRegexp.test(s);
    }
  }
}

let validator: { [s: string]: Validation.valid.IValidator } = {};
validator["Letters only"] = new Validation.valid.OnlyLettersValidator();

let strings = ["Hello", "98052", "101"];

for (let s of strings){
    for (let name in validator){
        console.log(`"${s}" - ${validator[name].isValid(s) ? "matches" : "does not match"} ${name}`)
    }
}