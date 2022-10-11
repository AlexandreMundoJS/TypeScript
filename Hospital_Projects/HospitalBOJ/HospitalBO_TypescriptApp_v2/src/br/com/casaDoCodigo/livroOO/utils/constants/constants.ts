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
  { plan: ["planName", "monthlyPayment"] },
];

const procedure: Array<any> = [
  "code",
  "patient",
  "doctors",
  "date",
  "room",
  "value",
  "durationTime",
];

const appointment: Array<any> = [
  "code",
  "patient",
  "doctor",
  "date"
]

export { doctor, patient, procedure, appointment };
