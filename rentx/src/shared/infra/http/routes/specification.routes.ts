import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationRepository = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationRepository.handle);

export { specificationRoutes };
