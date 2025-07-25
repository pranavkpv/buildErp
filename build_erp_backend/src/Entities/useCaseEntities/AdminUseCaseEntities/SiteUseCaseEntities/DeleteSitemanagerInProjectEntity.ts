import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteSiteToProjectUseCase {
   execute(_id:string,sitemanager_id:string): Promise<commonOutput>
}