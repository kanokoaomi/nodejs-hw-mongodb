import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    // return next(createError(404, `${id} is not valid`));
    return res.status(404).json({
      status: 404,
      message: `${contactId} is not valid`,
    });
  }
  next();
};
