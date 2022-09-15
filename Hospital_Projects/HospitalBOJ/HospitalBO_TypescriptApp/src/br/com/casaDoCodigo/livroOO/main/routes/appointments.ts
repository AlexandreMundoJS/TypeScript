import { Appointment } from "../../entities/Appointment";
import { Request, Response, Router } from "express";
import { JsonDB, Config } from "node-json-db";
import { DateConversor } from "../../utils/DateConversor";
import fs from "fs";

export class AppointmentRouter {
  public router: Router;
  public db: any;

  public constructor() {
    this.router = Router();
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  private testRoute(req: Request, res: Response) {
    try {
      res.status(200).json("Test route working");
    } catch (err) {
      res.status(500).json(`Error on test route ${err}`);
    }
  }

  public async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      let appointment: Appointment = new Appointment();
      let allAppointments = await this.db.getData("/appointments");
      let canAdd = true;
      appointment.setCode(allAppointments.length + 1);
      appointment.setPatient(req.body.appointment.patient);
      appointment.setDoctor(req.body.appointment.doctor);
      appointment.setDate(
        new DateConversor().dateConverter(req.body.appointment.date)
      );

      allAppointments.forEach((appointmentElement: { code: any }) => {
        if (appointmentElement.code == appointment.getCode()) {
          canAdd = false;
        }
      });
      if (canAdd) {
        await this.db.push("/appointments[]", appointment, true);
        res.status(200).json({
          message: "appointment added",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `Error in request ${err}`,
          },
        ],
      });
    }
  }

  private async showAppointment(req: Request, res: Response) {
    let query: any = req.query.code;
    let showAppointment = false;
    let appointmentData;
    const appointmentsArray = await this.db.getData("/appointments");
    appointmentsArray.forEach(async (appointment: { code: any }) => {
      if (appointment.code == query) {
        showAppointment = true;
        appointmentData = appointment;
      }
    });

    if (showAppointment) {
      res.status(200).json(appointmentData);
    } else {
      res.status(500).json("Error: appointment not found");
    }
  }

  private async showAppointments(req: Request, res: Response) {
    try {
      let appointments = await this.db.getData("/appointments");
      res.status(200).json({ appointments: appointments });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `Error in request ${err}`,
          },
        ],
      });
    }
  }

  private bindThis(): void {
    this.testRoute = this.testRoute.bind(this);
    this.showAppointment = this.showAppointment.bind(this);
    this.showAppointments = this.showAppointments.bind(this);
    this.createAppointment = this.createAppointment.bind(this);
  }

  public init(): void {
    this.bindThis();
    this.router.get("/testAppointmentRouter", this.testRoute);
    this.router.get("/getAppointment", this.showAppointment);
    this.router.get("/getAppointments", this.showAppointments);
    this.router.post("/createAppointment", this.createAppointment);
  }
}

const appointmentRouter = new AppointmentRouter();
appointmentRouter.init();

export default appointmentRouter.router;
