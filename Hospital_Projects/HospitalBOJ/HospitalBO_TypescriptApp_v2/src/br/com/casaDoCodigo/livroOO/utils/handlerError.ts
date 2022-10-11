export class ErrorHandler {
    appointmentsError(): string {
        return "Appointment not finded"
    }
    proceduresError(): string{
        return "Procedure not finded"
    }
    patientsError(): string{
        return "There's no patient in database."
    }
    patientNotFinded(): string{
        return "There's no patient with this code"
    }
    doctorsError(): string {
        return "There's no doctor in database";
    }
    doctorNotFinded(): string {
        return "There's no doctor with this code.";
    }
}