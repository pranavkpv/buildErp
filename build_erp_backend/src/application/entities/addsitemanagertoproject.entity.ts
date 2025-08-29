import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { ISitemanagerModelEntity } from '../../domain/Entities/modelEntities/sitemanager.entity';

export interface AddsitetoprojectInput {
   siteManager_id:string
   selectedproject:string[] | string
}

export interface listAddSiteToproject extends IProjectModelEntity {
   sitemanagerDetails:ISitemanagerModelEntity[]
}
