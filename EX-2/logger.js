const logMiddleware = (req, res, next) => {
  const { method, path } = req;
  const queryParams = req.query;
  const isoTimeStamp = new Date().toISOString();
  console.log(
    `${isoTimeStamp} - ${method} - ${path} - ${JSON.stringify(queryParams)}`
  );
  next();
};

export default logMiddleware;
