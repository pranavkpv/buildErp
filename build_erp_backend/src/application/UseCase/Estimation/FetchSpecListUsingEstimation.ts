import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IEstimationmapper } from "../../../domain/mappers/IEstimation.mapper";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { specListInProjectDTO } from "../../dto/estimation.dto";
import { IFetchSpecListUsingEstimationUsecase } from "../../IUseCases/IEstimation/IFetchSpecListUsingEstimation";

export class FetchSpecListinEstimationUsecase implements IFetchSpecListUsingEstimationUsecase {
   constructor(
      private _estimationRepositry: IEstimationRepository,
      private _estimationmapper: IEstimationmapper
   ) { }
   async execute(_id: string):
      Promise<commonOutput<specListInProjectDTO[]>> {
      const existEstimation = await this._estimationRepositry.getEstimationsGroupedBySpec(_id)
      const mappedData = this._estimationmapper.toSpecListDTO(existEstimation)
      return ResponseHelper.success(EstimationSuccessMessage.FETCH, mappedData)
   }
}