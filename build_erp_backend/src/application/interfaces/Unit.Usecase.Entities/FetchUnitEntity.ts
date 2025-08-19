import { commonOutput } from "../../dto/CommonEntities/common";

export interface IFetchUnitUseCaseEntity {
   execute():Promise<commonOutput>
}