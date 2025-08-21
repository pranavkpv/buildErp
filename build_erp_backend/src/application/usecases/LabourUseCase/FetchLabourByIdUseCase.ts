import { IFetchLabourByIdUsecaseEntity } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { LabourFailedMessage, LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message";
import { ILabourRepository } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { commonOutput } from "../../dto/common";
import { labourDataDisplayDTO } from "../../dto/labour.dto";
import { ILabourMapper } from "../../../domain/mappers/ILabour.mapper";

export class FetchLabourByIdUseCase implements IFetchLabourByIdUsecaseEntity {
   constructor(
      private _labourRepository: ILabourRepository,
      private _labourmapper: ILabourMapper
   ) { }
   async execute(_id: string): Promise<commonOutput<labourDataDisplayDTO> | commonOutput> {
      const data = await this._labourRepository.findLabourById(_id)
      if (!data) return ResponseHelper.conflictData(LabourFailedMessage.FETCH)
      const mappedData = this._labourmapper.toFetchLabourDTO(data)
      return ResponseHelper.success(LabourSuccessMessage.FETCH, mappedData)
   }
}