import { IAddSiteToProjectRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { projectOutput } from "../../DTO/ProjectEntities/project"
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message"


export class AddSiteToprojectFetchProjectUseCase implements IAddSiteToprojectFetchProjectUseCaseEntity {
   private addSiteToprojectRepository: IAddSiteToProjectRepositoryEntity
   constructor(addSiteToprojectRepository: IAddSiteToProjectRepositoryEntity) {
      this.addSiteToprojectRepository = addSiteToprojectRepository
   }
   async execute(): Promise<projectOutput | commonOutput> {
      const result = await this.addSiteToprojectRepository.findProjectWithoutSitemanager()
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, result)
   }
}