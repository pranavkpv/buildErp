import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { sitemanagerOutput } from "../../../../DTO/SitemanagerEntities/sitemanager";


export interface IAddSiteToprojectFetchSitemanagerUseCaseEntity {
   execute():Promise<sitemanagerOutput | commonOutput>
}