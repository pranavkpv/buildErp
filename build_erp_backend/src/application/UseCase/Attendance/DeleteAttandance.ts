import { IDeleteAttendanceUseCase } from '../../IUseCases/IAttendance/IDeleteAttendance';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { AttendanceSuccessMessage } from '../../../Shared/Messages/Attendance.Message';
import { IAttendanceRepository } from '../../../domain/Entities/IRepository/IAttendance';
import { commonOutput } from '../../dto/common';


export class DeleteAttendanceUseCase implements IDeleteAttendanceUseCase {

    constructor(
    private _attendanceRepository: IAttendanceRepository,
    ) { }
    async execute(id: string):
    Promise<commonOutput> {
        await this._attendanceRepository.deleteAttendanceById(id);
        return ResponseHelper.success(AttendanceSuccessMessage.DELETE);
    }
}