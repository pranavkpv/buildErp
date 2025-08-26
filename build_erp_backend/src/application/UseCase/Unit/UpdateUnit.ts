import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { unitFailedMessage, unitSuccessMessage } from "../../../Shared/Messages/Unit.Message"
import { IUpdateUnitUseCase } from "../../IUseCases/IUnit/IUpdateUnit"
import { IUnitRepository } from "../../../domain/Entities/IRepository/IUnit"
import { saveUnitInput } from "../../Entities/unit.entity"
import { commonOutput } from "../../dto/common"

export class UpdateUnitUseCase implements IUpdateUnitUseCase { 
   constructor(
      private _unitRepository: IUnitRepository
   ) { }
   async execute(input: saveUnitInput): Promise<commonOutput> {
      const { _id, unit_name, short_name } = input
      if (!_id) throw new Error(unitFailedMessage.MISS_UNIT_ID)
      const findUnit = await this._unitRepository.getUnitById(_id)
      if (!findUnit) return ResponseHelper.badRequest(unitFailedMessage.NOT_EXIST)
      const existUnit = await this._unitRepository.checkUnitExistsOnEdit( _id, unit_name )
      if (existUnit) return ResponseHelper.conflictData(unitFailedMessage.EXIST)
      const response = await this._unitRepository.updateUnit({ _id, unit_name, short_name })
      if (!response) throw new Error(unitFailedMessage.FAILED_UPDATE)
      return ResponseHelper.success(unitSuccessMessage.UPDATE)
   }
}