import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message"
import { commonOutput } from "../../dto/common"
import { fetchProjectIdnameDTO } from "../../dto/project.dto"
import { IAddSiteToProjectRepository } from "../../../domain/interfaces/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchProjectUseCase } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity"
import { IProjectmapper } from "../../../domain/mappers/IProject.mapper"


export class AddSiteToprojectFetchProjectUseCase implements IAddSiteToprojectFetchProjectUseCase {
   constructor(
      private _addSiteToprojectRepository: IAddSiteToProjectRepository,
      private _projectmapper: IProjectmapper
   ) { }
   async execute(): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> {
      const result = await this._addSiteToprojectRepository.findProjectWithoutSitemanager()
      const mappedResult = this._projectmapper.toIdandnameDto(result)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedResult)
   }
}