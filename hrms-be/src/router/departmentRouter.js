import { Router } from "express";
import departmentController from "../controllers/departmentController.js";

const departmentRouter = Router();

departmentRouter.post("/", departmentController.createDepartment);
departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.get("/:id", departmentController.getDepartmentById);
departmentRouter.put("/:id", departmentController.updateDepartment);
departmentRouter.delete("/:id", departmentController.deleteDepartment);

export default departmentRouter;
