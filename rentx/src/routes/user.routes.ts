import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensuereAuthenticate } from "../middleware/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updatateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensuereAuthenticate,
  uploadAvatar.single("avatar"),
  updatateUserAvatarController.handle
);

export { usersRoutes };
