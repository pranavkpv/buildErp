import { fetchEditAttendance } from "../../application/entities/attendance.entity";
import { IAttendanceModelEntity } from "../Entities/modelEntities/attendance.entity";

export interface IAttendanceMapper {
   tofetchEditAttendanceDTO(attendance:IAttendanceModelEntity):fetchEditAttendance
}