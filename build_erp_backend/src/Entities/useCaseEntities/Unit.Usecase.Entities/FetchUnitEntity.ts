import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IFetchUnitUseCaseEntity {
   execute():Promise<commonOutput>
}