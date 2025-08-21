import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { unitSuccessMessage } from "../../../Shared/Messages/Unit.Message";
import { IFetchUnitUseCase } from "../../interfaces/Unit.Usecase.Entities/FetchUnitEntity";
import { IUnitRepository } from "../../../domain/interfaces/Material-management/IUnitRepository";
import { commonOutput } from "../../dto/common";
import { idUnitnameDTO } from "../../dto/unit.dto";
import { IUnitMapper } from "../../../domain/mappers/IUnit.mapper";

export class FetchUnitUseCase implements IFetchUnitUseCase {
   constructor(
      private _unitRepository: IUnitRepository,
      private _unitmapper: IUnitMapper
   ) { }
   async execute(): Promise<commonOutput<idUnitnameDTO[]>> {
      const result = await this._unitRepository.findUnit()
      const mappedData = this._unitmapper.toUnitIdnameDTO(result)
      return ResponseHelper.success(unitSuccessMessage.FETCH, mappedData)
   }
}