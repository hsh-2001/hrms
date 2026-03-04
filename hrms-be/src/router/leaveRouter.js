import leaveController from "../controllers/leaveController.js";
import { Router } from "express";

const leaveRouter = Router();

leaveRouter.get("/types", leaveController.getLeaveTypeByCompanyId);
leaveRouter.post("/types", leaveController.createLeaveType);
leaveRouter.put("/types/:id", leaveController.updateLeaveType);
leaveRouter.delete("/types/:id", leaveController.deleteLeaveType);

leaveRouter.get("/requests", leaveController.getAllLeaveRequestsByCompanyId);
leaveRouter.get("/requests/:id", leaveController.getLeaveRequestById);
leaveRouter.post("/requests", leaveController.createLeaveRequest);
leaveRouter.put("/requests", leaveController.updateLeaveRequest);
leaveRouter.delete("/requests/:id", leaveController.deleteLeaveRequest);

leaveRouter.get("/employee/:employee_id/requests", leaveController.getLeaveRequestsByEmployeeId);
leaveRouter.get("/employee/:employee_id/balance", leaveController.getLeaveBalance);

export default leaveRouter;
