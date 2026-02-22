import { Router } from "express";
import employeeController from "../controllers/employeeController.js";

const employeeRouter = Router();

employeeRouter.post("/", employeeController.createEmployee);

export default employeeRouter;