import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchStageUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";

export class FetchStageUsecase implements IFetchStageUsecase {
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(search:string,page:number):Promise<{data:IProjectModelEntity[],totalPage:number}>{
       const stageSettedproject = await this.projectRepository.findStageSetProject(search,page)
       return stageSettedproject 
   }
}