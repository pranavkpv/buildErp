import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IApproveAttendanceUseCaseEntity {
   execute(_id: string): Promise<commonOutput>
}