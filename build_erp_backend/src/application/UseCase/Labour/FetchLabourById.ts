import { IFetchLabourByIdUsecase } from "../../IUseCases/ILabour/IFetchLabourById";
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { LabourFailedMessage, LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message";
import { ILabourRepository } from "../../../domain/Entities/IRepository/ILabour";
import { commonOutput } from "../../dto/common";
import { labourDataDisplayDTO } from "../../dto/labour.dto";
import { ILabourMapper } from "../../../domain/mappers/ILabour.mapper";

export class FetchLabourByIdUseCase implements IFetchLabourByIdUsecase {
   constructor(
      private _labourRepository: ILabourRepository,
      private _labourmapper: ILabourMapper
   ) { }
   async execute(_id: string):
      Promise<commonOutput<labourDataDisplayDTO> | commonOutput> {
      const data = await this._labourRepository.getLabourById(_id)
      if (!data) return ResponseHelper.conflictData(LabourFailedMessage.FETCH)
      const mappedData = this._labourmapper.toFetchLabourDTO(data)
      return ResponseHelper.success(LabourSuccessMessage.FETCH, mappedData)
   }
}