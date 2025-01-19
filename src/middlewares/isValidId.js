import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return res.status(404).json({
      status: 404,
      message: `${contactId} is not valid`,
    });
  }
  next();
};
