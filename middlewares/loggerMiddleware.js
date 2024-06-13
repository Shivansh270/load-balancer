import logger from "../utils/logger.js";

export const loggerMiddleware = (req, res, next) => {
  logger.info(
    `Received request from ${req.ip} - ${req.method} ${req.originalUrl}`
  );
  next();
};
