import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IUploadStatusImageUseCaseEntity {
   execute(url:string[]|string,_id:string,date:string):Promise<commonOutput>
}