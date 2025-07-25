import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IUploadEstimateImageUseCase{
   execute(url:string,_id:string):Promise<commonOutput>
}