import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";
import { Project } from "../../../domain/types/project";

export class FetchStageUsecase{
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(search:string,page:number):Promise<{data:Project[],totalPage:number}>{
       const stageSettedproject = await this.projectRepository.findStageSetProject(search,page)
       return stageSettedproject 
   }
}