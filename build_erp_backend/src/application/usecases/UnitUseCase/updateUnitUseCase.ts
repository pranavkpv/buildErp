import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { unitFailedMessage, unitSuccessMessage } from "../../../Shared/Messages/Unit.Message"
import { IupdateUnitUseCase } from "../../interfaces/Unit.Usecase.Entities/UpdateUnitEntity"
import { IUnitRepository } from "../../../domain/interfaces/Material-management/IUnitRepository"
import { saveUnitInput } from "../../entities/unit.entity"
import { commonOutput } from "../../dto/common"



export class updateUnitUseCase implements IupdateUnitUseCase { 
   constructor(
      private _unitRepository: IUnitRepository
   ) { }
   async execute(input: saveUnitInput): Promise<commonOutput> {
      const { _id, unit_name, short_name } = input
      if (!_id) throw new Error(unitFailedMessage.MISS_UNIT_ID)
      const findUnit = await this._unitRepository.findUnitById(_id)
      if (!findUnit) return ResponseHelper.badRequest(unitFailedMessage.NOT_EXIST)
      const existUnit = await this._unitRepository.findUnitInEdit( _id, unit_name )
      if (existUnit) return ResponseHelper.conflictData(unitFailedMessage.EXIST)
      const response = await this._unitRepository.updateUnitById({ _id, unit_name, short_name })
      if (!response) throw new Error(unitFailedMessage.FAILED_UPDATE)
      return ResponseHelper.success(unitSuccessMessage.UPDATE)
   }
}