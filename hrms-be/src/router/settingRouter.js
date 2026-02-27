import { Router } from "express";
import settingController from "../controllers/settingController.js";
const settingRouter = Router();

settingRouter.get("/company", settingController.getCompanySettings);
settingRouter.get("/company/overview", settingController.getCompanyOverview);
settingRouter.put("/company", settingController.updateCompanySetting);

export default settingRouter;
