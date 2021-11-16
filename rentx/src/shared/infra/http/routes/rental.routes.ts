import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController";

import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRouter.post("/", ensuereAuthenticate, createRentalController.handle);
rentalRouter.post(
  "/devolution/:id",
  ensuereAuthenticate,
  devolutionRentalController.handle
);

rentalRouter.get(
  "/user",
  ensuereAuthenticate,
  listRentalsByUserController.handle
);

export { rentalRouter };
