const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize({ all: true })
  ),
  defaultMeta: { service: 'artimind-backend' },
  transports: [new winston.transports.Console()],
})

export default logger
