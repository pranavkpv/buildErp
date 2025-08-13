import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { changePasswordInput } from "../../../../DTO/SitemanagerEntities/sitemanager";

export interface IUpdateSitemanagerPasswordUseCaseEntity {
   execute(input: changePasswordInput): Promise<commonOutput>
}