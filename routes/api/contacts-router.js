import express from "express";

import contactsController from "../../contollers/contactsController.js";
import contactsSchema from "../../schemas/contacts-joischeme.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, isEmptyBody, isValidId } from "../../middleware/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchema.contactsUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
