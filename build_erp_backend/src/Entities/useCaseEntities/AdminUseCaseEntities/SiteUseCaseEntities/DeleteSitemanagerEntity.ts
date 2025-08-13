import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteSitemanagerUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}