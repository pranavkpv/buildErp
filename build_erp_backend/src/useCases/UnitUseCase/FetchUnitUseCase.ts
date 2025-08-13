import { IUnitRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { IFetchUnitUseCaseEntity } from "../../Entities/useCaseEntities/Unit.Usecase.Entities/FetchUnitEntity";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { unitSuccessMessage } from "../../Shared/Messages/Unit.Message";
import { inputUnit } from "../../DTO/UnitEntities/Unit.Entity";

export class FetchUnitUseCase implements IFetchUnitUseCaseEntity {
   private unitRepository: IUnitRepositoryEntity
   constructor(unitRepository: IUnitRepositoryEntity) {
      this.unitRepository = unitRepository
   }
   async execute(): Promise<commonOutput> {
      const result = await this.unitRepository.findUnit()
      const mappedData = result.map((unit: inputUnit) => ({
         _id: unit._id,
         unit_name: unit.unit_name
      }))
      return ResponseHelper.success(unitSuccessMessage.FETCH, mappedData)
   }
}