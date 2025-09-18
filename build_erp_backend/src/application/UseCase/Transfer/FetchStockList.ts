import { IProjectStockRepository } from "../../../domain/Entities/IRepository/IProjectStock";
import { IMaterialMapper } from "../../../domain/IMappers/IMaterial.mapper";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { projectStockListDTO } from "../../dto/transfer.dto";
import { IFetchStockListUseCase } from "../../IUseCases/ITransfer/IFetchStockList";

export class FetchStockListUseCase implements IFetchStockListUseCase {
   constructor(
     private _ProjectStockRepository: IProjectStockRepository,
     private _materialMapper: IMaterialMapper
   ) { }
   async execute(projectId: string): Promise<commonOutput<projectStockListDTO[]>> {
      const result = await this._ProjectStockRepository.projectStockbyAggregate(projectId)
      const mappedData = this._materialMapper.toListStockDTO(result)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH,mappedData)
   }
}