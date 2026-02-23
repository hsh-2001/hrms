import { Router } from "express";
import positionController from "../controllers/positionController.js";

const positionRouter = Router();

positionRouter.post("/", positionController.createPosition);
positionRouter.get("/", positionController.getAllPositions);
positionRouter.get("/department/:departmentId", positionController.getPositionsByDepartment);
positionRouter.get("/:id", positionController.getPositionById);
positionRouter.put("/:id", positionController.updatePosition);
positionRouter.delete("/:id", positionController.deletePosition);

export default positionRouter;
