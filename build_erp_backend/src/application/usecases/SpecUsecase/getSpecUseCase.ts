import { ISpecRepository } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { IgetSpecUseCase } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";
import { specFullDTO } from "../../dto/specification.dto";
import { commonOutput } from "../../dto/common";
import { ISpecificationMapper } from "../../../domain/mappers/ISpecification.mapper";


export class getSpecUseCase implements IgetSpecUseCase {
   constructor(
      private _specRepository: ISpecRepository,
      private _specificationMapper: ISpecificationMapper
   ) { }
   async execute(): Promise<commonOutput<specFullDTO[]> | commonOutput> {
      const data = await this._specRepository.fetchSpec()
      const mappedData = this._specificationMapper.toFetchSitemanagerNameandId(data)
      return ResponseHelper.success(SpecSuccessMessage.FETCH, mappedData)
   }
}