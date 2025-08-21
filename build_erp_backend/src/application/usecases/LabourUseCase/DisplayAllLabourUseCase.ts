import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message";
import { IDisplayAllLabourUsecase } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity";
import { ILabourRepository } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { commonOutput } from "../../dto/common";
import { labourDataDisplayDTO } from "../../dto/labour.dto";
import { ILabourMapper } from "../../../domain/mappers/ILabour.mapper";



export class DisplayAllLabourUseCase implements IDisplayAllLabourUsecase {
   constructor(
      private _labourRepository: ILabourRepository,
      private _labourmapper: ILabourMapper
   ) { }
   async execute(page: number, search: string): Promise<commonOutput<{ data: labourDataDisplayDTO[], totalPage: number }> | commonOutput> {
      const { data, totalPage } = await this._labourRepository.findAllLabour({ page, search })
      const mappedData = this._labourmapper.toDisplayLabourDTO(data)
      return ResponseHelper.success(LabourSuccessMessage.FETCH, { data: mappedData, totalPage })
   }
}



