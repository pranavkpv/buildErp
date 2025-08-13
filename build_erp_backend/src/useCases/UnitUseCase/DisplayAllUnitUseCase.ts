import { commonOutput } from "../../DTO/CommonEntities/common";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IDisplayAllUnitUseCaseEntity } from "../../Entities/useCaseEntities/Unit.Usecase.Entities/DisplayAllUnitEntity";
import { IUnitRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { unitSuccessMessage } from "../../Shared/Messages/Unit.Message";
import { inputUnit } from "../../DTO/UnitEntities/Unit.Entity";




export class DisplayAllUnitUseCase implements IDisplayAllUnitUseCaseEntity {
   private UnitRepository: IUnitRepositoryEntity
   constructor(UnitRepository: IUnitRepositoryEntity) {
      this.UnitRepository = UnitRepository
   }
   async execute(page: number, search: string): Promise<commonOutput> {
      const { data, totalPage } = await this.UnitRepository.findAllListUnit(page, search)
      const mappedData = data.map((unit: inputUnit) => ({
         _id: unit._id,
         unit_name: unit.unit_name,
         short_name: unit.short_name
      }))
      return ResponseHelper.success(unitSuccessMessage.FETCH, mappedData, totalPage)
   }
}










