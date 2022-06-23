"use strict";

import {Validate} from "./Controllers/Validator";

let validateCpf = new Validate();
validateCpf.validCpf("03639104099");

let validateCnpj = new Validate();
validateCnpj.validateCnpj("70548113000101")
