import mongoose from "mongoose";
import { IAttendanceModelEntity } from "../../Entities/ModelEntities/Attendance.Entity";
import { AttendanceSchema } from "../Schema/AttendanceSchema";

export interface IAttendanceModel extends IAttendanceModelEntity{ }
export const attendanceDB = mongoose.model("Attendance",AttendanceSchema)