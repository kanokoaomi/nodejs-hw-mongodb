import * as contactServises from '../services/contact.js';
import createError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { sortByList } from '../db/models/contact.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';
import { findContactsByUser } from '../utils/filter/findContactsByUser.js';
import { saveFileToUploads } from '../utils/saveFileToUploads.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parsePaginationParams(req.query, sortByList);
  const { _id: userId } = req.user._id;
  // const contactsByUser = findContactsByUser(userId);
  const data = await contactServises.getContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  // console.log(_id);
  // console.log(id);

  const data = await contactServises.getContact({ _id, userId });

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data,
  });
};

export const postContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const cloudinaryEnable = getEnvVar('CLOUDINARY_ENABLE') === 'true';
  let photo;
  if (req.file) {
    if (cloudinaryEnable) {
      photo = await saveFileToCloudinary(req.file);
    } else {
      photo = await saveFileToUploads(req.file);
    }
  }

  try {
    await contactAddSchema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    throw createError(400, error.message);
  }

  const data = await contactServises.postContact({
    ...req.body,
    photo,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;

  try {
    await contactUpdateSchema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    throw createError(400, error.message);
  }

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
