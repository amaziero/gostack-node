import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";

import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";

const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.post("/", ensuereAuthenticate, createRentalController.handle);

export { rentalRouter };
