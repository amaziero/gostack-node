import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensuereAdmin } from "../middleware/ensureAdmin";
import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";

const specificationRoutes = Router();

const createSpecificationRepository = new CreateSpecificationController();

specificationRoutes.use(ensuereAuthenticate);
specificationRoutes.post(
  "/",
  ensuereAdmin,
  createSpecificationRepository.handle
);

export { specificationRoutes };
