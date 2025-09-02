import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';

const { combine, timestamp, printf, errors, colorize } = format;

const RETENTION_DAYS = 5;
const LOGS_DIR = path.join(__dirname, '../logs');

if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const cleanupOldLogs = () => {
    fs.readdir(LOGS_DIR, (err, files) => {
        if (err) return console.error("Error reading log directory:", err);
        const now = Date.now();
        files.forEach(file => {
            const filePath = path.join(LOGS_DIR, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return console.error("Error getting file stats:", err);
                const ageInDays = (now - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);
                if (ageInDays > RETENTION_DAYS) {
                    fs.unlink(filePath, err => {
                        if (err) console.error("Error deleting old log file:", err);
                        else console.log(`Deleted old log file: ${file}`);
                    });
                }
            });
        });
    });
};

cleanupOldLogs();
setInterval(cleanupOldLogs, 24 * 60 * 60 * 1000);

const customFormat = printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        customFormat
    ),
    transports: [
        new transports.File({
            filename: path.join(LOGS_DIR, 'error.log'),
            level: 'error',
        }),
        new transports.File({
            filename: path.join(LOGS_DIR, 'warn.log'),
            level: 'warn',
        }),
        new transports.File({
            filename: path.join(LOGS_DIR, 'combined.log'),
        }),
        new transports.Console(),
    ],
});

export default logger;
