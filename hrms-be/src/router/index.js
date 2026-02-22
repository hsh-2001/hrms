import { Router } from "express";
import userRouter from "./userRouter.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import rootMiddleware from "../middlewares/rootMiddleware.js";
import employeeRouter from "./employeeRouter.js";
import rootRouter from "./rootRouter.js";
const router = Router();

router.use("/user", userRouter);
router.use("/root", rootMiddleware , rootRouter);
router.use("/employee", authMiddleware , employeeRouter);

export default router;