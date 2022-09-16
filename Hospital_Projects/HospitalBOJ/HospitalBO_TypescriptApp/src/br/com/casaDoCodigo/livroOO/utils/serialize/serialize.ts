import { doctor } from "../constants/constants";

export class Serialize {
  serializeDoctor(docParam: any): any {
    let missingParams: Array<string> = [];
    doctor.forEach((doctorKey) => {
      if (Object.keys(docParam).indexOf(doctorKey) < 0) {
        missingParams.push(doctorKey);
      }
    });
    return missingParams;
  }
}
