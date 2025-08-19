import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IApproveAttendanceUseCaseEntity {
   execute(_id: string): Promise<commonOutput>
}