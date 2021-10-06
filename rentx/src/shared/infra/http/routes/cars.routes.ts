import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreatecarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/listAvaliableCarsController";

import { ensuereAdmin } from "../middleware/ensureAdmin";
import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";

const carRouter = Router();
const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRouter.post(
  "/",
  ensuereAuthenticate,
  ensuereAdmin,
  createCarController.handle
);

carRouter.get("/avaliable", listAvaliableCarsController.handle);

carRouter.post(
  "/specifications/:id",
  ensuereAdmin,
  createCarSpecificationController.handle
);

export { carRouter };
