import { Request, Response, Router } from "express";
import { DoctorBusiness } from "../../business/DoctorBusiness";
import { Doctor } from "../../entities/Doctor";
import { Plan } from "../../entities/Plan";
import { AddressConversor } from "../../utils/AddressConversor";
import { DataShow } from "../../utils/DataShow";
import { DateConversor } from "../../utils/DateConversor";
import { JsonDB, Config } from "node-json-db";
import fs from "fs";
export class DoctorRouter {
  public router: Router;
  public doctorBusiness: DoctorBusiness = new DoctorBusiness();
  private db: any;

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

  public async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      let doctorArray = req.body.doctors;
      let doctorsList: Array<Doctor> = new Array();

      doctorArray.forEach(async (doctor: any) => {
        let newDoctor: Doctor = new Doctor();
        newDoctor.setName(doctor.name);
        newDoctor.setCrm(doctor.crm);
        newDoctor.setAddress(
          new AddressConversor().convertAddress(doctor.address)
        );
        newDoctor.setDateOfBirth(
          new DateConversor().dateConverter(doctor.dateOfBirth)
        );
        newDoctor.setSpecialties(doctor.specialties);
        newDoctor.setHourValue(doctor.hourValue);

        let allDoctors = await this.db.getData("/doctors");
        let canAdd = true;
        allDoctors.forEach((doctor: {id: any})=>{
            if (doctor.id == newDoctor.getCrm()){
                canAdd = false;
            }
        })
        if (canAdd){
            doctorsList.push(newDoctor);
            await this.db.push("/doctors[]", {id: `${newDoctor.getCrm()}`, doctor: newDoctor})
        }
        res.status(200).json({
            message: "Doctors added"
          });    
      });
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

  private async updateDoctor(req: Request, res: Response) {
    try {
      let doctor: Doctor = new Doctor();
      doctor.setCrm(req.body.doctor.crm);
      doctor.setName(req.body.doctor.name);
      doctor.setAddress(
        new AddressConversor().convertAddress(req.body.doctor.address)
      );
      doctor.setDateOfBirth(
        new DateConversor().dateConverter(req.body.doctor.dateOfBirth)
      );
      doctor.setSpecialties(req.body.doctor.specialties);
      doctor.setHourValue(req.body.hourValue);
      let content = JSON.parse(fs.readFileSync('hospitalDataBase.json', 'utf-8'));
      content.doctors.forEach((oldDoctor: any) => {
        if (oldDoctor.id == doctor.getCrm()){
          oldDoctor.doctor = doctor;
        }
      });
      fs.writeFileSync('hospitalDataBase.json', JSON.stringify(content));
      await this.db.reload();
      res.status(200).json({
        message: "doctor address updated",
        doctor: doctor,
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
    let query: any = req.query.id;
    let showDoctor = false;
    let doctorData;
    const doctorsArray = await this.db.getData("/doctors");
    doctorsArray.forEach(async (doctor: { id: any }) => {
      if (doctor.id === query) {
        showDoctor = true;
        doctorData = doctor;
      }
    });

    if (showDoctor) {
      res.status(200).json(doctorData);
    } else {
      res.status(500).json("Error: Doctor not found");
    }
  }

  private async showDoctors(req: Request, res: Response) {
    try {
      let doctors = await this.db.getData("/doctors");
      res.status(200).json({ doctors: doctors });
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
    this.router.get("/getDoctor", this.showDoctor);
    this.router.get("/getDoctors", this.showDoctors);
    this.router.post("/createDoctor", this.createDoctor);
    this.router.put("/updateDoctor", this.updateDoctor);
  }
}

const doctorRouter = new DoctorRouter();
doctorRouter.init();

export default doctorRouter.router;
