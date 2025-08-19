import { commonOutput } from "../../../dto/CommonEntities/common";
import { saveSitemanagerInput } from "../../../dto/SitemanagerEntities/sitemanager";


export interface ISaveSitemanagerUseCaseEntity {
   execute(input: saveSitemanagerInput): Promise<commonOutput>
}