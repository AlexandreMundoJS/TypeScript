const doctor: Array<string> = [
  "crm",
  "specialties",
  "hourValue",
  "name",
  "dateOfBirth",
  "address",
];
const patient: Array<any> = [
  "cpf",
  "name",
  "address",
  "dateOfBirth",
  {"plan" : ["planName", "monthlyPayment"]},
];

export { doctor, patient };
