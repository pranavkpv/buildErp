import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { saveSitemanagerInput } from "../../../../DTO/SitemanagerEntities/sitemanager";


export interface ISaveSitemanagerUseCaseEntity {
   execute(input: saveSitemanagerInput): Promise<commonOutput>
}