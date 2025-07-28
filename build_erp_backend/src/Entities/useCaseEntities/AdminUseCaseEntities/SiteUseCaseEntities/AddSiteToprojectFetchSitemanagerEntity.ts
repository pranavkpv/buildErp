import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { ISitemanagerModelEntity } from "../../../ModelEntities/Sitemanager.Entity";

export interface IAddSiteToprojectFetchSitemanagerUseCase {
   execute():Promise<ISitemanagerModelEntity[] | null | commonOutput>
}