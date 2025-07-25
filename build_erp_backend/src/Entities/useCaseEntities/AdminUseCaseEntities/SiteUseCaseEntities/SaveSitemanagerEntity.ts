import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addsitemanagerInput } from "../../../Input-OutputEntities/SitemanagerEntities/sitemanager";

export interface ISaveSitemanagerUseCase {
   execute(input: addsitemanagerInput): Promise<commonOutput>
}