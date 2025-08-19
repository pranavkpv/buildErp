import mongoose from "mongoose";
import { IAttendanceModelEntity } from "../../domain/Entities/modelEntities/attendance.entity";
import { AttendanceSchema } from "../../infrastructure/database/mongoose/schemas/AttendanceSchema";

export interface IAttendanceModel extends IAttendanceModelEntity{ }
export const attendanceDB = mongoose.model("Attendance",AttendanceSchema)