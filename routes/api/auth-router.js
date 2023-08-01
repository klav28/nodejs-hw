import express from "express";

import usersController from "../../contollers/usersController.js";
import usersSchema from "../../schemas/users-joischeme.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId } from "../../middleware/index.js";

import authenticate from "../../middleware/auth.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(usersSchema.usersSchema),
  usersController.registerUser
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(usersSchema.usersSchema),
  usersController.signinUser
);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.post("/signout", isEmptyBody, usersController.signoutUser);

usersRouter.patch(
  "/:id/subscription",
  isValidId,
  isEmptyBody,
  validateBody(usersSchema.usersUpdateSubscriptionSchema),
  usersController.updateSubscriptionUser
);

export default usersRouter;
