import express from "express";

import contactsController from "../../contollers/contactsController.js";
import contactsSchema from "../../schemas/contacts-joischeme.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

// contactsRouter.get("/:id", contactsController.getById);

// contactsRouter.post(
//   "/",
//   validateBody(contactsSchema.contactsAddSchema),
//   contactsController.add
// );

// contactsRouter.put(
//   "/:id",
//   validateBody(contactsSchema.contactsAddSchema),
//   contactsController.updateById
// );

// contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
