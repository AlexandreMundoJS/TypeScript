import { Request, Response, Router } from "express";
import { AppointmentBusiness } from "../../business/AppointmentBusiness";

export class AppointmentRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
  }

  private testRoute(req: Request, res: Response) {
    try {
      res.status(200).json("Test route working");
    } catch (err) {
      res.status(500).json(`Error on test route ${err}`);
    }
  }

  private async showAppointment(req: Request, res: Response) {
    try {
      res.status(200).json({
        appointment: await new AppointmentBusiness().show(req.params.id)
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `${error}`,
          },
        ],
      });
    }
  }

  public async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment = await new AppointmentBusiness().add(
        req.body.appointment,
        req,
        res
      );
      res.status(200).json({
        message: "Appointment added with success",
        appointment: appointment,
      });
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
  public async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment = await new AppointmentBusiness().update(
        req.body.appointment,
        req,
        res
      );
      res.status(200).json({
        message: "Appointment update with success",
        appointment: appointment,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `${err}`,
          },
        ],
      });
    }
  }

  private async showAppointments(req: Request, res: Response) {
    try {
      const appointments = await new AppointmentBusiness().showAll();
      res.status(200).json({ appointments: appointments });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `${err}`,
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
    this.updateAppointment = this.updateAppointment.bind(this);
  }

  public init(): void {
    this.bindThis();
    this.router.get("/testAppointmentRouter", this.testRoute);
    this.router.get("/getAppointment/:id", this.showAppointment);
    this.router.get("/getAppointments", this.showAppointments);
    this.router.post("/createAppointment", this.createAppointment);
    this.router.put("/updateAppointment", this.updateAppointment);
  }
}

const appointmentRouter = new AppointmentRouter();
appointmentRouter.init();

export default appointmentRouter.router;
