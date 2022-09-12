"use strict";
// We can use Namespaces like: Validation 
// or subnamespaces like: Validation.valid
var Validation;
(function (Validation) {
    var valid;
    (function (valid) {
        class OnlyLettersValidator {
            constructor() {
                this.lettersRegexp = /^[A-Za-z]+$/;
            }
            isValid(s) {
                return this.lettersRegexp.test(s);
            }
        }
        valid.OnlyLettersValidator = OnlyLettersValidator;
    })(valid = Validation.valid || (Validation.valid = {}));
})(Validation || (Validation = {}));
let validator = {};
validator["Letters only"] = new Validation.valid.OnlyLettersValidator();
let strings = ["Hello", "98052", "101"];
for (let s of strings) {
    for (let name in validator) {
        console.log(`"${s}" - ${validator[name].isValid(s) ? "matches" : "does not match"} ${name}`);
    }
}
