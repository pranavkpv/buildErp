import { commonOutput } from "../../../dto/CommonEntities/common";
import { sitemanagerOutput } from "../../../dto/SitemanagerEntities/sitemanager";

export interface IDisplayAllSitemanagerUseCaseEntity {
   execute(page:number,search:string): Promise<sitemanagerOutput | commonOutput>
}