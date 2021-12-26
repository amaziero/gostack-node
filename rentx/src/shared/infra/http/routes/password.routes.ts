import { Router } from "express";

import { ResetPassworUserController } from "@modules/accounts/useCases/resetPassworUser/ResetPassworUserController";
import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";

const passwordRouter = Router();

const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();
const resetPassworUserController = new ResetPassworUserController();

passwordRouter.post("/forgot", sendForgotPasswordEmailController.handle);
passwordRouter.post("/reset", resetPassworUserController.handle);

export { passwordRouter };
