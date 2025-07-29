import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { sitemanagerOutput } from "../../../Input-OutputEntities/SitemanagerEntities/sitemanager";

export interface IDisplayAllSitemanagerUseCase {
   execute(page:number,search:string): Promise<sitemanagerOutput | commonOutput>
}