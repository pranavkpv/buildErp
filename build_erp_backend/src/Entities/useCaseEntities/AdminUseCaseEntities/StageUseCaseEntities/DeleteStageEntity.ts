import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteStageUseCaseEntity {
   execute(input:{deleteId:string}):Promise<commonOutput>
}