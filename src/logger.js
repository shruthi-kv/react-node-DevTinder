// src/logger.js
require('dotenv').config();
const winston = require('winston');
require('winston-cloudwatch');
const os = require('os');

const {
  ENABLE_CLOUDWATCH,
  AWS_REGION,
  AWS_LOG_GROUP,
  AWS_LOG_STREAM_PREFIX,
  LOG_LEVEL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
} = process.env;

const transports = [
  // Console transport (always)
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, ...meta }) => {
        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `${timestamp} [${level}] ${message}${metaStr}`;
      })
    )
  })
];

// Add CloudWatch transport only if enabled
if (ENABLE_CLOUDWATCH === 'true') {
  const streamName = `${AWS_LOG_STREAM_PREFIX || 'app'}-${os.hostname()}-${process.pid}`;

  transports.push(
    new winston.transports.CloudWatch({
      logGroupName: AWS_LOG_GROUP || 'my-backend-app',
      logStreamName: streamName,
      awsRegion: AWS_REGION || 'us-east-1',
      jsonMessage: true,
      // optional - provide credentials for local dev (safer: use ~/.aws/credentials or env vars).
      awsAccessKeyId: AWS_ACCESS_KEY_ID,
      awsSecretKey: AWS_SECRET_ACCESS_KEY,
      awsSessionToken: AWS_SESSION_TOKEN,
      // retry options, etc.
    })
  );
}

const logger = winston.createLogger({
  level: LOG_LEVEL || 'info',
  defaultMeta: { service: 'my-backend' },
  transports
});

// Gracefully flush CloudWatch logs on exit (winston-cloudwatch exposes 'flush' method on transport)
function flushAndExit(code = 0) {
  const cwTransport = logger.transports.find(t => t.name === 'CloudWatch');
  if (cwTransport && typeof cwTransport.kthxbye === 'function') {
    // winston-cloudwatch v0.2.x has kthxbye() to flush
    cwTransport.kthxbye(() => {
      process.exit(code);
    });
  } else {
    setTimeout(() => process.exit(code), 1000);
  }
}

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException', { message: err.message, stack: err.stack });
  flushAndExit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection', { reason });
  flushAndExit(1);
});

module.exports = logger;
