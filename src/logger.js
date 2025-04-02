import { createLogger, transports, format } from 'winston'

const { combine, errors, timestamp, printf } = format
const { File, Console } = transports

const formatter = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`
})

export const logger = createLogger({
  level: 'debug',
  format: combine(errors(), timestamp(), formatter),
  transports: [
    new File({ filename: '.log/debug.log' }),
    new File({ level: 'error', filename: '.log/errors.log' }),
    new Console(),
  ],
  rejectionHandlers: [new File({ filename: '.log/rejections.log' })],
  exceptionHandlers: [new File({ filename: '.log/exceptions.log' })],
})

/**
 * @type {polka.Middleware}
 */
export const loggerMiddleware = (req, res, next) => {
  logger.debug(`Request path: ${req.path}`)
  next()
  logger.debug(`Response for ${req.path}: ${res.statusCode} ${res.statusMessage}`)
}
