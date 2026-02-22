import { Router } from "express";
import companyController from "../controllers/rootController.js";

const rootRouter = Router();

rootRouter.post("/company", companyController.createNewCompany);
rootRouter.get("/companies", companyController.getAllCompanies);
rootRouter.put("/company/:companyId", companyController.updateCompany);
rootRouter.delete("/company/:companyId", companyController.deleteCompany);

export default rootRouter;