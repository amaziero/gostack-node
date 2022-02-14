import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreatecarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/listAvaliableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensuereAdmin } from "../middleware/ensureAdmin";
import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";

const carRouter = Router();
const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

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

carRouter.post(
  "/images/:id",
  ensuereAuthenticate,
  ensuereAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carRouter };
