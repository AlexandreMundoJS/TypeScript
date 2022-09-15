"use strict";

import express, { Application, NextFunction, Request, Response } from "express";
import PatientRouter from "./routes/patient";
import DoctorRouter from "./routes/doctor";
import ProcedureRouter from "./routes/procedures";
import AppointmentRouter from "./routes/appointments";
export default class App {
  public express: Application;

  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      next();
    });
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private routes(): void{
    this.express.use('/v1/adminHospital/patients/', PatientRouter);
    this.express.use('/v1/adminHospital/doctors/', DoctorRouter);
    this.express.use('/v1/adminHospital/procedures/', ProcedureRouter);
  }
}
