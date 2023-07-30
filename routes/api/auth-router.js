import express from "express";

import usersController from "../../contollers/usersController.js";
import usersSchema from "../../schemas/users-joischeme.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId } from "../../middleware/index.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(usersSchema.usersRegisterSchema),
  usersController.registerUser
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(usersSchema.usersRegisterSchema),
  usersController.signinUser
);

usersRouter.post("/signout", isEmptyBody, usersController.signoutUser);

export default usersRouter;
