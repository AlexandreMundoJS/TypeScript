import { Request, Response, Router } from "express";
import { DoctorBusiness } from "../../business/DoctorBusiness";
export class DoctorRouter {
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

  public async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctor = await new DoctorBusiness().add(req.body.doctor, req, res);
      res.status(200).json({
        message: "Doctor added with success",
        doctor: doctor
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: error,
          },
        ],
      });
    }
  }

  private async updateDoctor(req: Request, res: Response) {
    try {
    const doctor = await new DoctorBusiness().update(req.body.doctor, req, res)
    res.status(200).json({
      message: "Doctor updated with success",
      doctor: doctor
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

  private async showDoctor(req: Request, res: Response) {
    try {
      res.status(200).json(await new DoctorBusiness().show(req.params.id));
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

  private async showDoctors(req: Request, res: Response) {
    try {
      res.status(200).json(await new DoctorBusiness().showAll());
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
    this.showDoctor = this.showDoctor.bind(this);
    this.showDoctors = this.showDoctors.bind(this);
    this.createDoctor = this.createDoctor.bind(this);
    this.updateDoctor = this.updateDoctor.bind(this);
  }

  public init(): void {
    this.bindThis();
    this.router.get("/testDoctorRouter", this.testRoute);
    this.router.get("/getDoctor/:id", this.showDoctor);
    this.router.get("/getDoctors", this.showDoctors);
    this.router.post("/createDoctor", this.createDoctor);
    this.router.put("/updateDoctor/:id", this.updateDoctor);
  }
}

const doctorRouter = new DoctorRouter();
doctorRouter.init();

export default doctorRouter.router;
