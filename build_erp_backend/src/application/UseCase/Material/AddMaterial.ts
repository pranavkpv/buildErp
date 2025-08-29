import { IAddMaterialUseCase } from '../../IUseCases/IMaterial/IAddMaterial';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { MaterialFailedMessage, MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { addMaterialInput } from '../../Entities/material.entity';
import { commonOutput } from '../../dto/common';



export class AddMaterialUseCase implements IAddMaterialUseCase {

    constructor(
      private _materialRepository: IMaterialRepository,
      private _projectStockRepository: IProjectStockRepository,
    ) { }
    async execute(input: addMaterialInput): Promise<commonOutput> {
        const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input;
        const existMaterial = await this._materialRepository.getMaterialByNameCategoryBrand({ material_name, category_id, brand_id });
        if (existMaterial) {
            return ResponseHelper.conflictData(MaterialFailedMessage.EXIST);
        }
        const savedMaterialData = await this._materialRepository.createMaterial({ material_name, category_id, brand_id, unit_id, unit_rate, stock });
        if (!projectWiseStock) return ResponseHelper.badRequest(MaterialFailedMessage.STOCK_MATCH);
        for (let i = 0; i < projectWiseStock.length; i++) {
            const project_id = projectWiseStock[i].project;
            const material_id = savedMaterialData._id;
            const materialstock = projectWiseStock[i].stock;
            await this._projectStockRepository.createProjectStock({ project_id, material_id, stock:materialstock });
        }
        return ResponseHelper.createdSuccess(MaterialSuccessMessage.ADD);

    }
}