
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IDisplayAllUnitUseCase } from "../../interfaces/Unit.Usecase.Entities/DisplayAllUnitEntity";
import { unitSuccessMessage } from "../../../Shared/Messages/Unit.Message";
import { listingInput } from "../../entities/common.entity";
import { IUnitRepository } from "../../../domain/interfaces/Material-management/IUnitRepository";
import { commonOutput } from "../../dto/common";
import { listUnitDTO } from "../../dto/unit.dto";
import { IUnitMapper } from "../../../domain/mappers/IUnit.mapper";



export class DisplayAllUnitUseCase implements IDisplayAllUnitUseCase {
   constructor(
      private _unitRepository: IUnitRepository,
      private _unitmapper: IUnitMapper
   ) { }
   async execute(input:listingInput): Promise<commonOutput<{data:listUnitDTO[],totalPage:number}>> {
      const { data, totalPage } = await this._unitRepository.findAllListUnit(input)
      const mappedData = this._unitmapper.toListingUnitDTO(data)
      return ResponseHelper.success(unitSuccessMessage.FETCH, {data:mappedData, totalPage})
   }
}










