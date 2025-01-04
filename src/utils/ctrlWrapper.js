export const ctrlWrapper = (ctrl) => {
  const fnctn = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fnctn;
};
