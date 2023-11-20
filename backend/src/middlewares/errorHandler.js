import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  req.logger = logger;
  if (`${err.statusCode}`.startsWith('4')) {
    req.logger.ERROR(
      `${req.method}  ${req.url} - ${new Date().toLocaleDateString()} - ${
        err.message
      }`
    );
  } else {
    req.logger.FATAL(
      `${req.method}  ${req.url} - ${new Date().toLocaleDateString()} - ${
        err.message
      }`
    );
  }
  return res.status(err.statusCode).json({
    method: req.method,
    path: req.url,
    message: err.message,
  });
};

export default errorHandler;
