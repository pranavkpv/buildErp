
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity"
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity"


export class AddSiteToprojectFetchProjectUseCase implements IAddSiteToprojectFetchProjectUseCase{
   private addSiteToprojectRepository : IAddSiteToProjectRepository
   constructor(addSiteToprojectRepository : IAddSiteToProjectRepository){
      this.addSiteToprojectRepository = addSiteToprojectRepository
   }
   async execute(): Promise<IProjectModelEntity[] | null >{
      const result = await this.addSiteToprojectRepository.findProjectWithoutSitemanager()
      return result
   }
}