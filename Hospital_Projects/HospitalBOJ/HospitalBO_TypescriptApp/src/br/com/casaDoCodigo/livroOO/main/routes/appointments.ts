import { Appointment } from "../../entities/Appointment";
import { Request, Response, Router } from "express";
import { JsonDB, Config } from "node-json-db";
import { DateConversor } from "../../utils/DateConversor";
import fs from "fs";
import { AppointmentBusiness } from "../../business/AppointmentBusiness";

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
      new AppointmentBusiness().add(req.body.appointment, req, res);
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
    try {
      res.status(200).json(await new AppointmentBusiness().show(req.params.id));
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `Error in request ${error}`,
          },
        ],
      });
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
    this.router.get("/getAppointment/:id", this.showAppointment);
    this.router.get("/getAppointments", this.showAppointments);
    this.router.post("/createAppointment", this.createAppointment);
  }
}

const appointmentRouter = new AppointmentRouter();
appointmentRouter.init();

export default appointmentRouter.router;
