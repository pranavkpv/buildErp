import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IUpdateProfileImageUseCaseEntity {
   execute(url:string,_id:string) : Promise<commonOutput>
}