import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteStageUseCaseEntity {
   execute(input:{deleteId:string}):Promise<commonOutput>
}