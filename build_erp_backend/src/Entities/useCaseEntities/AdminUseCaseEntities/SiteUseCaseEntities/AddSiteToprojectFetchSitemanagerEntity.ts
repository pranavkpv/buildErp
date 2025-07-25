import { ISitemanagerModelEntity } from "../../../ModelEntities/Sitemanager.Entity";

export interface IAddSiteToprojectFetchSitemanagerUseCase {
   execute():Promise<ISitemanagerModelEntity[] | null>
}