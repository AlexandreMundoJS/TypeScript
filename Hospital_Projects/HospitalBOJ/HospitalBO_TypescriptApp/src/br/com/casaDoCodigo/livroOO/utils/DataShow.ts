import { Appointment } from "../entities/Appointment";
import { Doctor } from "../entities/Doctor";
import { Neurosurgery } from "../entities/Neurosurgery";
import { Patient } from "../entities/Patient";
import { Pharyngoplasty } from "../entities/Pharyngoplasty";
import { Procedure } from "../entities/Procedure";

export class DataShow {
  public DataShow() {}

  public showPatient(patient: Patient) {
    // console.log(patient.getAddress())
    // console.log({
    //   // patient: patient.toString(),
    //   // address: patient.getAddress(),
    // })
    
    return {
      patient: patient.getName(),
      address: patient.getAddress(),
    };


  }

  public showPatients(patients: Array<Patient>) {
    // console.log("PACIENTES", patients);
    // let patientsArray: Array<Patient> = new Array();
    // patients.forEach((patient: Patient) => {
    // });
    // return {
    //   Patients: patientsArray,
    // };
  }
  public showDoctor(doctor: Doctor) {
    return {
      Doctor: doctor.toString(),
      Address: doctor.getAddress(),
    };
  }

  public showDoctors(doctors: Array<Doctor>) {
    doctors.forEach((doctor: Doctor) => {
      return {
        Doctor: doctor,
      };
    });
  }

  public showAppointment(appointment: Appointment) {
    let formater: any = new Date();
    formater = `${
      formater.getMonth() > 8
        ? +formater.getMonth() + 1
        : "0" + formater.getMonth() + 1
    }/${
      formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()
    }/${formater.getFullYear()}`;

    return {
      Appointment: {
        Patient: appointment.getPatient(),
        Doctor: appointment.getDoctor(),
        Date: formater,
        Code: appointment.getCode(),
      },
    };
  }

  public showAppointments(appointmentsList: Array<Appointment>) {
    let formater: any = new Date();
    formater = `${
      formater.getMonth() > 8
        ? +formater.getMonth() + 1
        : "0" + formater.getMonth() + 1
    }/${
      formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()
    }/${formater.getFullYear()}`;

    appointmentsList.forEach((appointment: Appointment) => {
      return {
        Appointment: {
          Patient: appointment.getPatient(),
          Doctor: appointment.getDoctor(),
          Date: formater,
          Code: appointment.getCode(),
        },
      };
    });
  }

  public showPharyngoplasty(pharyngoplasty: Pharyngoplasty) {
    let formater: any = new Date();
    formater = `${
      formater.getMonth() > 8
        ? +formater.getMonth() + 1
        : "0" + formater.getMonth() + 1
    }/${
      formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()
    }/${formater.getFullYear()}`;

    return {
      Pharyngoplasty: {
        Patient: pharyngoplasty.getPatient(),
        Doctor: pharyngoplasty.getDoctors(),
        Date: formater,
        Code: pharyngoplasty.getCode(),
      },
    };
  }

  public showNeurosurgery(neurosurgery: Neurosurgery) {
    let formater: any = new Date();
    formater = `${
      formater.getMonth() > 8
        ? +formater.getMonth() + 1
        : "0" + formater.getMonth() + 1
    }/${
      formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()
    }/${formater.getFullYear()}`;

    return {
      Neurosurgery: {
        Patient: neurosurgery.getPatient(),
        Doctor: neurosurgery.getDoctors(),
        Date: formater,
        Code: neurosurgery.getCode(),
      },
    };
  }

  public showProcedures(procedures: Array<Procedure>) {
    let formater: any = new Date();
    formater = `${
      formater.getMonth() > 8
        ? +formater.getMonth() + 1
        : "0" + formater.getMonth() + 1
    }/${
      formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()
    }/${formater.getFullYear()}`;

    procedures.forEach((procedure: Procedure) => {
      return {
        Procedure: {
          Patient: procedure.getPatient(),
          Doctors: procedure.getDoctors(),
          Date: formater,
          Code: procedure.getCode(),
        },
      };
    });
  }
}
