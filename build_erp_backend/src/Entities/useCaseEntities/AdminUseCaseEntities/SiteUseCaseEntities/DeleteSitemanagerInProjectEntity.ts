import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteSiteToProjectUseCaseEntity {
   execute(_id:string,sitemanager_id:string): Promise<commonOutput>
}