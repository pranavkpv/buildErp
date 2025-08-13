import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IdeleteUnitUseCaseEntity {
   execute(_id:string): Promise<commonOutput>
}