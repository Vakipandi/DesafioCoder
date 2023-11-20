import logger from '../config/logger.js';

const notFoundHandler = (req, res, next) => {
   if(!req.logger){
    req.logger = logger;
}
  req.logger.ERROR(
    `${req.method} ${
      req.url
    } - ${new Date().toLocaleDateString()} - not found path`
  );
  return res.status(404).json({
    method: req.method,
    path: req.url,
    message: 'not found',
  });
};

export default notFoundHandler;
