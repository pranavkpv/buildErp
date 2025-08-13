import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { sitemanagerOutput } from "../../../../DTO/SitemanagerEntities/sitemanager";

export interface IDisplayAllSitemanagerUseCaseEntity {
   execute(page:number,search:string): Promise<sitemanagerOutput | commonOutput>
}