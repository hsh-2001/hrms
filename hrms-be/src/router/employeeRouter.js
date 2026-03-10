import { Router } from "express";
import employeeController from "../controllers/employeeController.js";

const employeeRouter = Router();

employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.put("/", employeeController.updateEmployee);
employeeRouter.get("/fuzzy-search", employeeController.getEmployeeByFuzzySearch);

export default employeeRouter;