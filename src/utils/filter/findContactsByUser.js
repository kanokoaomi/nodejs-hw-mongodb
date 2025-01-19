import ContactCollection from '../../db/models/contact.js';

export const findContactsByUser = async (userId) => {
  const contactsByUser = await ContactCollection.find({ userId });
  return contactsByUser;
};
