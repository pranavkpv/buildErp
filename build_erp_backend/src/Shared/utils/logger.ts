import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf, errors, colorize } = format;

const customFormat = printf(({ time, level, message, stack }) => {
    return `[${time}] ${level.toUpperCase()}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(), 
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), 
        customFormat,
    ),
    transports: [
        new transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                errors({ stack: true }),
                customFormat,
            ),
        }),
        new transports.File({
            filename: path.join(__dirname, '../../logs/warn.log'),
            level: 'warn',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                customFormat,
            ),
        }),
        new transports.File({
            filename: path.join(__dirname, '../../logs/combined.log'),
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                customFormat,
            ),
        }),
        new transports.Console(), 
    ],
});

export default logger;
