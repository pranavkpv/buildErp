import { listAddSiteToproject } from '../../../application/Entities/addsitemanagertoproject.entity';
import { IProjectModelEntity } from '../modelEntities/project.entity';
import { ISitemanagerModelEntity } from '../modelEntities/sitemanager.entity';


export interface IAddSiteToProjectRepository {

   getProjectsWithoutSiteManager():
      Promise<IProjectModelEntity[] | []>;

   getProjectsWithSiteManager(page: number, search: string):
      Promise<{ getAddSiteData: listAddSiteToproject[]; totalPage: number }>;

   getUnassignedSiteManagers():
      Promise<ISitemanagerModelEntity[] | []>

}