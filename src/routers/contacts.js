import express from 'express';
import {
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
  postContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { contactAddSchema } from '../validation/contacts.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(postContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(contactAddSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
