import { commonOutput } from "../../../dto/CommonEntities/common";
import { changePasswordInput } from "../../../dto/SitemanagerEntities/sitemanager";

export interface IUpdateSitemanagerPasswordUseCaseEntity {
   execute(input: changePasswordInput): Promise<commonOutput>
}