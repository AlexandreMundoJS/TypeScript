import { doctor, patient } from "../constants/constants";

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
  serializePatient(patientParam: any): any {
    let missingParams: Array<string> = [];
    patient.forEach((patientKey) => {
      if (typeof patientKey == "string") {
        if (Object.keys(patientParam).indexOf(patientKey) < 0) {
          missingParams.push(patientKey);
        }
      } else {
        let objectProperties = Object.getOwnPropertyDescriptor(
          patientKey,
          Object.getOwnPropertyNames(patientKey)[0]
        );
        if (objectProperties) {
          objectProperties.value.forEach((prop: any) => {
            if (
              Object.keys(
                patientParam[Object.getOwnPropertyNames(patientKey)[0]]
              ).indexOf(prop) < 0
            ) {
              missingParams.push(
                `${Object.getOwnPropertyNames(patientKey)[0]}.${prop}`
              );
            }
          });
        }
      }
    });
    return missingParams;
  }
}
