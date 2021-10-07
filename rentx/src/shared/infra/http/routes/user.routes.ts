import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensuereAuthenticate } from "@shared/infra/http/middleware/ensureAuthenticated";

import { ensuereAdmin } from "../middleware/ensureAdmin";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updatateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./tpm/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensuereAuthenticate,
  ensuereAdmin,
  uploadAvatar.single("avatar"),
  updatateUserAvatarController.handle
);

export { usersRoutes };
