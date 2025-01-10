import createError from 'http-errors';

export const validateBody = (schema) => {
  //   schema.validate(req.body, { abortEarly: false });
  const func = async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      return next(createError(400, error.message));
    }
  };
  return func;
};
