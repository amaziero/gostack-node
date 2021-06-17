import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRouter = Router();

const createSpecificationRepository = new CreateSpecificationController();

specificationRouter.post("/", createSpecificationRepository.handle);

export { specificationRouter };
