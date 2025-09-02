import { IAttendanceModelEntity } from '../../domain/Entities/modelEntities/attendance.entity';
import { IAttendanceMapper } from '../../domain/IMappers/IAttendance.mapper';
import { fetchEditAttendance } from '../Entities/attendance.entity';

export class AttendanceMapper implements IAttendanceMapper {
    tofetchEditAttendanceDTO(attendance: IAttendanceModelEntity): fetchEditAttendance {
        return {
            _id: attendance._id,
            date: attendance.date,
            labourDetails: attendance.labourDetails,
            project_id: attendance.project_id,
        };
    }
}