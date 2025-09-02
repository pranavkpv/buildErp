import mongoose from 'mongoose';
import { AttendanceSchema } from '../../infrastructure/database/schemas/AttendanceSchema';


export const attendanceDB = mongoose.model('Attendance',AttendanceSchema);