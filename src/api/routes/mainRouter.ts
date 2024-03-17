import { Router } from "express";
import verifyAuth from "../middlewares/verifyAuth";
import apiRouter from "./apiRouter";
import authController from "../controllers/authController";

const mainRouter = Router();

mainRouter.post("/register", authController.register);
mainRouter.post("/login", authController.login);

mainRouter.use("/api", [verifyAuth], apiRouter);

export default mainRouter;
