import Attendances from "../models/attendances";
import express, {Request, Response, NextFunction} from "express";
const routes = express.Router();

routes.post("/addAttendance", (req: Request, res: Response) => {
  Attendances.add(req.body, res);
});
routes.get("/getAttendances", (req: Request, res: Response) => {
  Attendances.list(res);
});
routes.put("/changeAttendance/:id", (req: Request, res: Response)=>{
  Attendances.change(req.params.id, req.body, res);
})
routes.delete("/deleteAttendance/:id", (req: Request, res: Response)=>{
  Attendances.delete(req.params.id, res);
})

export default routes;
