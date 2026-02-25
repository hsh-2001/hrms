import commonController from "../controllers/commonController.js";
import { Router } from "express";

const commonRouter = Router();

commonRouter.post("/verify-location", commonController.verifyLocation);

export default commonRouter;
