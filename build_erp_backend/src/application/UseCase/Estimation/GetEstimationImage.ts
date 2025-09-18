import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { estimationImageDTO } from "../../dto/estimation.dto";
import { IGetEstimationImageUsecase } from "../../IUseCases/IEstimation/IGetEstimationImage";

export class GetEstimationImageUsecase implements IGetEstimationImageUsecase {
   constructor(
      private _projectRepository: IprojectRepository,
   ) { }
   async execute(project: string): Promise<commonOutput<estimationImageDTO[]>> {
      const data = await this._projectRepository.getProjectById(project)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, data?.expected_image)
   }
}