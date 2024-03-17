import { Router } from "express";
import getAllCapturedController from "../controllers/captured/getAllCapturedController";
import addCapturedController from "../controllers/captured/addCapturedController";
import getAllFavoriteController from "../controllers/favorite/getAllFavoriteController";
import addFavoriteController from "../controllers/favorite/addFavoriteController";

const apiRouter = Router();

apiRouter.get("/pokemon/captured", getAllCapturedController);
apiRouter.post("/pokemon/captured", addCapturedController);

apiRouter.get("/pokemon/favorite", getAllFavoriteController);
apiRouter.post("/pokemon/favorite", addFavoriteController);

export default apiRouter;
