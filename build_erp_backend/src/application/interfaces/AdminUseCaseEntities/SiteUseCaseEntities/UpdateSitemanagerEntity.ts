import { commonOutput } from "../../../dto/CommonEntities/common";
import { editSitemanagerInput } from "../../../dto/SitemanagerEntities/sitemanager";

export interface IUpdateSitemanagerUseCaseEntity {
   execute(input: editSitemanagerInput): Promise<commonOutput> 
}