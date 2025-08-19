import { IDisplayEstimationUseCase } from "../../interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { listEstimationDTO } from "../../dto/estimation.dto";
import { commonOutput } from "../../dto/common";
import { IEstimationmapper } from "../../../domain/mappers/IEstimation.mapper";


export class DisplayEstimationUseCase implements IDisplayEstimationUseCase {
   constructor(
      private _estimationRepository: IEstimationRepository,
      private _estimationMapper: IEstimationmapper
   ) { }
   async axecute(search: string, page: number): Promise<commonOutput<{data:listEstimationDTO[],totalPage:number}> | commonOutput> {
      const { data, totalPage } = await this._estimationRepository.displaySpec(search, page )
      const mappedData = this._estimationMapper.tolistEstimationDTO(data)
      return ResponseHelper.success(EstimationSuccessMessage.FETCH, {data:mappedData, totalPage})
   }
}