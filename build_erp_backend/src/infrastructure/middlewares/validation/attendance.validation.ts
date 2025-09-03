import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { AttendanceFailedMessage } from '../../../Shared/Messages/Attendance.Message';


export const validateAttendance = (req: Request, res: Response, next: NextFunction): void => {
    const { selectedProject, selectedDate, row } = req.body;
    if (!selectedProject) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: AttendanceFailedMessage.PROJECT_NAME_REQUIRED });
        return;
    }
    if (!selectedDate) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: AttendanceFailedMessage.DATE_REQUIRED });
        return;
    }
    if (row.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: AttendanceFailedMessage.LABOUR_ADD });
        return;
    }
    for (const element of row) {
        if (!element.labour_type) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: AttendanceFailedMessage.LABOUR_ADD });
            return;
        }
        if (element.wage < 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: AttendanceFailedMessage.LABOUR_WAGE_MINUS });
            return;
        }
        if (element.number <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: AttendanceFailedMessage.LABOUR_NUMBER_MINUS });
            return;
        }
        if (element.total !== element.wage * element.number) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: AttendanceFailedMessage.MISTAKE_TOTAL });
            return;
        }
    }
    next();
};