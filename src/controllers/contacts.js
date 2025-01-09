import * as contactServises from '../services/contact.js';
import createError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await contactServises.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactServises.getContactById(contactId);

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const postContactController = async (req, res) => {
  const data = await contactServises.postContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { data } = await contactServises.patchContact(contactId, req.body);

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServises.deleteContact({ _id: contactId });

  if (!data) {
    console.log('Contact not found, throwing error');
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
