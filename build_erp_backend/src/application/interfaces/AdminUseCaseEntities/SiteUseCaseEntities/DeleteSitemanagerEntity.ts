import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteSitemanagerUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}