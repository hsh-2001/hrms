import { Router } from "express";
import userRouter from "./userRouter.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import rootMiddleware from "../middlewares/rootMiddleware.js";
import employeeRouter from "./employeeRouter.js";
import rootRouter from "./rootRouter.js";
import departmentRouter from "./departmentRouter.js";
import positionRouter from "./positionRouter.js";
import attendanceRouter from "./attendanceRouter.js";
import commonRouter from "./commonRouter.js";
import settingRouter from "./settingRouter.js";
import webSocketRouter from "./webSocketRouter.js";
const router = Router();

router.use("/user", userRouter);
router.use("/common", commonRouter);
router.use("/root", rootMiddleware , rootRouter);
router.use("/employee", authMiddleware , employeeRouter);
router.use("/department", authMiddleware, departmentRouter);
router.use("/position", authMiddleware, positionRouter);
router.use("/attendance", authMiddleware, attendanceRouter);
router.use("/setting", authMiddleware, settingRouter);
router.use("/transaction", webSocketRouter);

export default router;