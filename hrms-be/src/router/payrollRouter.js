import payrollController from "../controllers/payrollController.js";
import { Router } from "express";

const payrollRouter = Router();

payrollRouter.get("/", payrollController.getEmployeePayroll);
payrollRouter.get("/components", payrollController.getPayrollComponents);
payrollRouter.post("/", payrollController.upsertEmployeePayroll);
payrollRouter.post("/components", payrollController.upsertPayrollComponents);
payrollRouter.post("/components/employee", payrollController.upsertEmployeePayrollComponent);
payrollRouter.get("/components/employees", payrollController.getAllEmployeePayrollComponents);
payrollRouter.get("/reports", payrollController.getPayrollReports);

export default payrollRouter;
