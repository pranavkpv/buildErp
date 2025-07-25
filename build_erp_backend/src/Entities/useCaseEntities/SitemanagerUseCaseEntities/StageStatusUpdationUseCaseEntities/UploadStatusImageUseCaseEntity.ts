import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IUploadStatusImageUseCase {
   execute(url:string[]|string,_id:string,date:string):Promise<commonOutput>
}