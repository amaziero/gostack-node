import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRouter } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRouter } from "./password.routes";
import { rentalRouter } from "./rental.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRoutes } from "./user.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/rentals", rentalRouter);
router.use("/cars", carRouter);
router.use("/password", passwordRouter);
router.use(authenticateRoutes); // short sintax when route is not needded

export { router };
