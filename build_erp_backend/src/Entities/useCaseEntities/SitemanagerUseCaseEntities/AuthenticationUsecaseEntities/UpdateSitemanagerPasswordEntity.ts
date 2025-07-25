import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { changePasswordInput } from "../../../Input-OutputEntities/SitemanagerEntities/sitemanager";

export interface IUpdateSitemanagerPasswordUseCase {
   execute(input: changePasswordInput): Promise<commonOutput>
}