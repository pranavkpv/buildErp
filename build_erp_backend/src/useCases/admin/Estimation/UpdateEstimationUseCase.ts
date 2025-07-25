import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { rowData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IUpdateEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class UpdateEstimationUsecase implements IUpdateEstimationUseCase{
   private estimationRepository: IEstimationRepository
   constructor(estimationRepository: IEstimationRepository) {
      this.estimationRepository = estimationRepository
   }
   async execute(input: { projectId: string, row: rowData[] }):Promise<commonOutput> {
      const { projectId, row } = input
      await this.estimationRepository.deleteEstimationById(projectId)
      await this.estimationRepository.saveEstimation(row, projectId)
      return ResponseHelper.success(SUCCESS_MESSAGE.ESTIMATION.UPDATE,HTTP_STATUS.OK)
   }
}