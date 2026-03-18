import { Router } from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/all", authMiddleware, userController.getAllUsers);
userRouter.get("/company-users", authMiddleware, userController.getUserByCompanyId);
userRouter.post("/reset-password", authMiddleware, userController.resetPassword);

export default userRouter;
