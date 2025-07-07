import { IAddSiteToProjectRepository } from "../../../domain/repositories/IAddSiteToProjectRepository"
import { Project } from "../../../domain/types/project"


export class AddSiteToprojectFetchProjectUseCase{
   private addSiteToprojectRepository : IAddSiteToProjectRepository
   constructor(addSiteToprojectRepository : IAddSiteToProjectRepository){
      this.addSiteToprojectRepository = addSiteToprojectRepository
   }
   async execute(): Promise<Project[] | null >{
      const result = await this.addSiteToprojectRepository.findProjectWithoutSitemanager()
      return result ? result : null
   }
}