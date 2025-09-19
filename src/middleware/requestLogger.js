
const onFinished = require('on-finished');
const logger = require('../logger');

module.exports = function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl } = req;
  const ip = req.ip || req.connection?.remoteAddress;

  onFinished(res, function () {
    const duration = Date.now() - start;
    const { statusCode } = res;
    // Avoid logging huge bodies. Log limited info.
    logger.info('http_request', {
      method,
      url: originalUrl,
      statusCode,
      duration,
      ip,
      userAgent: req.headers['user-agent'],
      routeParams: req.params,
      query: req.query
    });
  });

  next();
};
