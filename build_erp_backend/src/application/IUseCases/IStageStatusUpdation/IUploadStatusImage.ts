import { commonOutput } from '../../dto/common';


export interface IUploadStatusImageUseCase {
   execute(url:string[]|string,id:string,date:string):Promise<commonOutput>
}