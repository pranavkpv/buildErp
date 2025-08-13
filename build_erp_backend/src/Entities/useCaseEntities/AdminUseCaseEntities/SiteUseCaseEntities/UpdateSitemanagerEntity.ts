import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { editSitemanagerInput } from "../../../../DTO/SitemanagerEntities/sitemanager";

export interface IUpdateSitemanagerUseCaseEntity {
   execute(input: editSitemanagerInput): Promise<commonOutput> 
}