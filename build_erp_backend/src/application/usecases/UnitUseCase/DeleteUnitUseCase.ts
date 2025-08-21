import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { unitFailedMessage, unitSuccessMessage } from "../../../Shared/Messages/Unit.Message"
import { IdeleteUnitUseCase } from "../../interfaces/Unit.Usecase.Entities/DeleteUnitEntity"
import { IUnitRepository } from "../../../domain/interfaces/Material-management/IUnitRepository"
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { commonOutput } from "../../dto/common"

export class deleteUnitUseCase implements IdeleteUnitUseCase {
   constructor(
      private _unitRepository: IUnitRepository,
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const findUnit = await this._unitRepository.findUnitById(_id)
      if (findUnit) return ResponseHelper.badRequest(unitFailedMessage.NOT_EXIST)
      const existUnit = await this._materialRepository.findMaterialByUnitId(_id)
      if (existUnit) return ResponseHelper.conflictData(unitFailedMessage.USED)
      const response = await this._unitRepository.deleteUnitById(_id)
      if (!response) throw new Error(unitFailedMessage.FAILED_DELETE)
      return ResponseHelper.success(unitSuccessMessage.DELETE)
   }
}