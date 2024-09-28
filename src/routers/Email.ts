import { Router } from "express";
import EmailController from "../controllers/EmailController";

const emailRouter = Router();
const emailController = new EmailController();

emailRouter.post("/schedule", emailController.create);
emailRouter.get("/cron/execute", emailController.cron);

export default emailRouter;
