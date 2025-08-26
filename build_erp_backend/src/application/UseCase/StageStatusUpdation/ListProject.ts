import { IListProjectUseCase } from "../../IUseCases/IStageStatusUpdation/IListProject";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { commonOutput } from "../../dto/common";
import { IProjectModelEntity } from "../../../domain/Entities/modelEntities/project.entity";

export class ListProjectUseCase implements IListProjectUseCase {
   constructor(
      private _projectRepository: IprojectRepository
   ) { }
   async execute(user: string): Promise<commonOutput<IProjectModelEntity[]> | commonOutput> {
      const data = await this._projectRepository.getProjectsBySitemanagerId(user)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, data)
   }
}