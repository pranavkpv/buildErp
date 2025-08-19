import { commonOutput } from "../../dto/CommonEntities/common";

export interface IdeleteUnitUseCaseEntity {
   execute(_id:string): Promise<commonOutput>
}