import { Sitemanager } from "../../Input-OutputEntities/SitemanagerEntities/sitemanager";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";
import { ISitemanagerModelEntity } from "../../ModelEntities/Sitemanager.Entity";


export interface IAddSiteToProjectRepository {
   findProjectwithSitemanager(page: number, search: string): Promise<{ getAddSiteData: any[]; totalPage: number }>;
   findProjectWithoutSitemanager(): Promise<IProjectModelEntity[] | []>;
   findSitemanagerExcludeproject():Promise<ISitemanagerModelEntity[] | []>
}