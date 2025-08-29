import { IApproveAttendanceUseCase } from '../../IUseCases/IAttendance/IApproveAttendance';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { AttendanceSuccessMessage } from '../../../Shared/Messages/Attendance.Message';
import { commonOutput } from '../../dto/common';
import { IAttendanceRepository } from '../../../domain/Entities/IRepository/IAttendance';


export class ApproveAttendanceUseCase implements IApproveAttendanceUseCase {
    constructor(
      private _attendanceRepository: IAttendanceRepository,
    ) { }
    async execute(id: string):
      Promise<commonOutput> {
        await this._attendanceRepository.approveAttendanceById(id);
        return ResponseHelper.success(AttendanceSuccessMessage.APPROVE);
    }
}