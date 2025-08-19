import { commonOutput } from "../../dto/CommonEntities/common";

export interface IDisplayAllUnitUseCaseEntity {
   execute(page:number,search:string): Promise<commonOutput>
}