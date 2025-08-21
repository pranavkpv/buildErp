import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message";
import { ILabourRepository } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { IFetchAllLabourUseCase } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity";
import { commonOutput } from "../../dto/common";
import { labourDataDisplayDTO } from "../../dto/labour.dto";
import { ILabourMapper } from "../../../domain/mappers/ILabour.mapper";

export class FetchAllLabourUseCase implements IFetchAllLabourUseCase {
   constructor(
      private _labourRepository: ILabourRepository,
      private _labourmapper: ILabourMapper
   ) {
   }
   async execute(): Promise<commonOutput<labourDataDisplayDTO[]> | commonOutput> {
      const data = await this._labourRepository.fetchLabourData()
      const mappedData = this._labourmapper.toDisplayLabourDTO(data)
      return ResponseHelper.success(LabourSuccessMessage.FETCH, mappedData)
   }
}