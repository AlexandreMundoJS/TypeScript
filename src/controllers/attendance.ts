import Attendances from "../models/attendances";
import express, {Request, Response, NextFunction} from "express";
const routes = express.Router();

routes.post("/addAttendance", (req: Request, res: Response) => {
//   console.log(req)
  Attendances.add(req.body, res);
});
routes.get("/getAttendances", (req: Request, res: Response) => {
  Attendances.list(res);
});

export default routes;
