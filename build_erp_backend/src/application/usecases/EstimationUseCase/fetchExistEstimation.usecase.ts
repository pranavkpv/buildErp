import { IFetchExistEstimationUseCase } from "../../interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/Ifetchexistestimation.usecase";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { commonOutput } from "../../dto/common";
import { publicEstimationDTO } from "../../dto/estimation.dto";
import { IEstimationmapper } from "../../../domain/mappers/IEstimation.mapper";

export class FetchExistEstimationUseCase implements IFetchExistEstimationUseCase {
  constructor(
    private _estimationRepository: IEstimationRepository,
    private _estimationMapper : IEstimationmapper
  ) { }
  async execute(_id: string): Promise<commonOutput<publicEstimationDTO[]>> {
    const data = await this._estimationRepository.AggregateEstimationBySpec(_id)
    const mappedData = this._estimationMapper.topublicEstimateData(data)
    return ResponseHelper.success(EstimationSuccessMessage.FETCH, mappedData)
  }
}