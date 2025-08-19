import { ILabourRepository } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { IFindlabourSumUsecase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";
import { labourSumInput } from "../../entities/labour.entity";

export class FindlabourSumUsecase implements IFindlabourSumUsecase {
   constructor( private _labourRepository: ILabourRepository) { }
   async execute(input:labourSumInput[]):Promise<commonOutput<number> | commonOutput>{
      const sum = await this._labourRepository.findSumofLabouor(input)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH_LABOUR_SUM, sum)
   }
}