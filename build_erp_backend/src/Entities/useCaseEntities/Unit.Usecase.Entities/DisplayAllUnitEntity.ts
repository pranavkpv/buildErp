import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IDisplayAllUnitUseCaseEntity {
   execute(page:number,search:string): Promise<commonOutput>
}