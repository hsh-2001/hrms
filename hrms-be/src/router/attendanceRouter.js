import attendanceController from "../controllers/attendanceController.js";
import { Router } from "express";

const attendanceRouter = Router();

attendanceRouter.post("/check", attendanceController.checkAttendance);
attendanceRouter.get("/employee/:employee_id", attendanceController.getAttendanceByEmployeeId);
attendanceRouter.get("/employee/:employee_id/today", attendanceController.getTodayEmployeeAttendance);
attendanceRouter.get("/", attendanceController.getAllAttendances);

export default attendanceRouter;