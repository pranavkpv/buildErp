import { listAddSiteToproject } from "../../../application/entities/addsitemanagertoproject.entity";
import { IProjectModelEntity } from "../../Entities/modelEntities/project.entity";
import { ISitemanagerModelEntity } from "../../Entities/modelEntities/sitemanager.entity";


export interface IAddSiteToProjectRepository {
   findProjectWithoutSitemanager(): Promise<IProjectModelEntity[] | []>;
   findProjectwithSitemanager(page:number,search:string): Promise<{ getAddSiteData: listAddSiteToproject[]; totalPage: number }>;
   findSitemanagerExcludeproject():Promise<ISitemanagerModelEntity[] | []>
}