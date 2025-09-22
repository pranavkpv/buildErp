import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { IMaterialMapper } from '../../../domain/IMappers/IMaterial.mapper';
import { MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { stockDTO } from '../../dto/material.dto';
import { IGetStockOfMaterialUseCase } from '../../IUseCases/IMaterial/IGetStockOfMaterial';

export class GetStockOfMaterialUseCase implements IGetStockOfMaterialUseCase {
    constructor(
      private _projectStockRepository: IProjectStockRepository,
      private _materialMapper: IMaterialMapper,
    ) { }
    async execute(projectId: string, material: string, page: number, id: string):
      Promise<commonOutput<{ data: stockDTO[], totalPage: number }>> {
        const { data, totalPage } = await this._projectStockRepository.getMaterialStockByProject(projectId, material, page, id);
        const mappedData = this._materialMapper.toStockDisplayDTO(data);
        return ResponseHelper.success(MaterialSuccessMessage.FETCH, { data: mappedData, totalPage });
    }
}