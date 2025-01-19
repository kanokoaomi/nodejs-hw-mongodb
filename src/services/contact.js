import ContactCollection from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  userId,
  page = 1,
  perPage = 6,
  sortBy = 'contactId',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const data = await ContactCollection.find({ userId })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactCollection.countDocuments({ userId });

  // console.log({ page, perPage, skip, limit });
  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);
export const getContact = (filter) => ContactCollection.findOne(filter);

export const postContact = (payload) => ContactCollection.create(payload);

export const patchContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    runValidators: true,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
