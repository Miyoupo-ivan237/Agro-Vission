function errorMiddleware(error, req, res, next) {
  console.error(error);
  if (res.headersSent) return next(error);
  return res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
}

module.exports = errorMiddleware;
