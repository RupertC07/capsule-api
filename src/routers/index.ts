import express from "express";
import testRouter from "./Test";
import emailRouter from "./Email";

const routes = express.Router();

routes.use("/", testRouter);
routes.use("/email", emailRouter);

export default routes;
