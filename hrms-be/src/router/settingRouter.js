import { Router } from "express";
import settingController from "../controllers/settingController.js";
const settingRouter = Router();

settingRouter.get("/company", settingController.getCompanySettings);
settingRouter.get("/company/overview", settingController.getCompanyOverview);
settingRouter.put("/company", settingController.updateCompanySetting);
settingRouter.get("/company/roles-permissions", settingController.getCompanyRolesAndPermissions);
settingRouter.put("/company/roles-permissions", settingController.updateRoleAndPermissions);
settingRouter.put("/company/user-role", settingController.updateUserRole);

export default settingRouter;
