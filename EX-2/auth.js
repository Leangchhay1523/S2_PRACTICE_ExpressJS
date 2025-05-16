const authenticate = (req, res, next) => {
  const token = "xyz123";
  const reqToken = req.query.token;

  if (!reqToken || reqToken != token) {
    res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

export default authenticate;
