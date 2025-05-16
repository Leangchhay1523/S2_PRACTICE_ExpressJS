const checkIsNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

const validateQuery = (req, res, next) => {
  const { minCredits, maxCredits } = req.query;

  if (minCredits || maxCredits) {
    if (
      !checkIsNumber(minCredits) ||
      !checkIsNumber(maxCredits) ||
      parseInt(minCredits) > parseInt(maxCredits)
    ) {
      return res.status(404).json({ message: "Bad Request" });
    }
  }

  next();
};
export default validateQuery;
