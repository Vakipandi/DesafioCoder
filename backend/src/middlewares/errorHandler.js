import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  req.logger = logger;
  const statusCode = err.statusCode || 500; // Asigna 500 si statusCode es undefined
  if (`${statusCode}`.startsWith('4')) {
    req.logger.ERROR(
      `${req.method} ${req.url} - ${new Date().toLocaleDateString()} - ${
        err.message
      }`
    );
  } else {
    req.logger.FATAL(
      `${req.method} ${req.url} - ${new Date().toLocaleDateString()} - ${
        err.message
      }`
    );
  }
  return res.status(statusCode).json({
    method: req.method,
    path: req.url,
    message: err.message,
  });
};

export default errorHandler;
