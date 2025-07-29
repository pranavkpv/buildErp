import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { sitemanagerOutput } from "../../../Input-OutputEntities/SitemanagerEntities/sitemanager";


export interface IAddSiteToprojectFetchSitemanagerUseCase {
   execute():Promise<sitemanagerOutput | commonOutput>
}