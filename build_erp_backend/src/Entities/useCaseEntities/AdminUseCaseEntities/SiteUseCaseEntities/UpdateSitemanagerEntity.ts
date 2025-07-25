import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editSitemanagerInput } from "../../../Input-OutputEntities/SitemanagerEntities/sitemanager";

export interface IUpdateSitemanagerUseCase {
   execute(input: editSitemanagerInput): Promise<commonOutput> 
}