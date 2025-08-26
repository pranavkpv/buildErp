import { ILabourRepository } from "../../../domain/Entities/IRepository/ILabour";
import { IFindlabourSumUsecase } from "../../IUseCases/IMaterial/IFindLabourSum";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";
import { labourSumInput } from "../../Entities/labour.entity";

export class FindlabourSumUsecase implements IFindlabourSumUsecase {
   constructor(
      private _labourRepository: ILabourRepository
   ) { }
   async execute(input: labourSumInput[]): Promise<commonOutput<number> | commonOutput> {
      const sum = await this._labourRepository.calculateTotalLabourWages(input)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH_LABOUR_SUM, sum)
   }
}