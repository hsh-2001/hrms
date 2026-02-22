import { Router } from "express";
import employeeController from "../controllers/employeeController.js";

const employeeRouter = Router();

employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.get("/", employeeController.getAllEmployees);

export default employeeRouter;