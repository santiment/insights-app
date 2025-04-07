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

function formatMem(mem) {
  return `${(mem / 1024 / 1024).toFixed(2)}MB`
}

export function memUsageMessage() {
  const used = process.memoryUsage()
  return `[MEMORY]: RSS=${formatMem(used.rss)}, Heap Used=${formatMem(
    used.heapUsed,
  )}, Heap Total=${formatMem(used.heapTotal)}, External=${formatMem(
    used.external,
  )}, Array Buffers=${formatMem(used.arrayBuffers)}MB`
}
