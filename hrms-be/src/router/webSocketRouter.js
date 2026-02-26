import webSocketController from "../controllers/webSocketController.js";
import { Router } from "express";

const webSocketRouter = Router();

webSocketRouter.get("/", webSocketController.getTransactions);
webSocketRouter.get("/:id", webSocketController.getTransactionById);

export default webSocketRouter;
