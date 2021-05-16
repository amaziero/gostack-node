import { response, Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationRouter = Router();
const specificationsRepository = new SpecificationsRepository();

specificationRouter.post("/", (request, _response) => {
  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  );

  const { name, description } = request.body;

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationRouter };
