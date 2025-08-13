import { listingInput } from "../../../DTO/CommonEntities/common";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";
import { ISitemanagerModelEntity } from "../../ModelEntities/Sitemanager.Entity";


export interface IAddSiteToProjectRepositoryEntity {
   findProjectwithSitemanager(input:listingInput): Promise<{ getAddSiteData: any[]; totalPage: number }>;
   findProjectWithoutSitemanager(): Promise<IProjectModelEntity[] | []>;
   findSitemanagerExcludeproject():Promise<ISitemanagerModelEntity[] | []>
}