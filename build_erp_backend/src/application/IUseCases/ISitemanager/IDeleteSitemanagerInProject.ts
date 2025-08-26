import { commonOutput } from "../../dto/common";


export interface IDeleteSiteToProjectUseCase {
   execute(_id:string,sitemanager_id:string): Promise<commonOutput>
}