import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IGetAllProjectListInUserUseCaseEntity {
   execute():Promise<commonOutput>
}