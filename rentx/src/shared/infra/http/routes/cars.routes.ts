import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreatecarController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/listAvaliableCarsController";

import { ensuereAdmin } from "../middleware/ensureAdmin";
import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";

const carRouter = Router();
const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();

carRouter.post(
  "/",
  ensuereAuthenticate,
  ensuereAdmin,
  createCarController.handle
);

carRouter.get("/avaliable", listAvaliableCarsController.handle);

export { carRouter };
