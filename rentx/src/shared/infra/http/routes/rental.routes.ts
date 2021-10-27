import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";

import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRouter.post("/", ensuereAuthenticate, createRentalController.handle);
rentalRouter.post(
  "/devolution/:id",
  ensuereAuthenticate,
  devolutionRentalController.handle
);

export { rentalRouter };
