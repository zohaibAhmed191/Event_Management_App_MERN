const routeNotFound = (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
};

const errorhandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: [
      {
        message: err.message,
        status: statusCode,
      },
    ],
  });
};

module.exports = { errorhandler, routeNotFound };
