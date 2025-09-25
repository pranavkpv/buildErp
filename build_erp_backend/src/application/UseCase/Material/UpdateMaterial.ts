import { IUpdateMaterialUseCase } from '../../IUseCases/IMaterial/IUpdateMaterial';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { MaterialFailedMessage, MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { editMaterialInput } from '../../entities/material.entity';
import { commonOutput } from '../../dto/common';



export class UpdateMaterialUseCase implements IUpdateMaterialUseCase {

    constructor(
      private _materialRepository: IMaterialRepository,
      private _projectStockRepository: IProjectStockRepository,
    ) { }

    async execute(input: editMaterialInput): Promise<commonOutput> {
        const { _id, material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input;
        const existMaterial = await this._materialRepository.checkDuplicateMaterialOnEdit({ _id, material_name, brand_id, category_id });
        if (existMaterial) {
            return ResponseHelper.conflictData(MaterialFailedMessage.EXIST);
        }
        await this._materialRepository.updateMaterial({ _id, material_name, category_id, brand_id, unit_id, unit_rate, stock });
        await this._projectStockRepository.deleteProjectStockByMaterialId(_id);
        for (let i = 0; i < projectWiseStock.length; i++) {
            const material_id = _id;
            const project_id = projectWiseStock[i].project;
            const materialstock = projectWiseStock[i].stock;
            await this._projectStockRepository.createProjectStock({ project_id, material_id, stock:materialstock });
        }
        return ResponseHelper.success(MaterialSuccessMessage.UPDATE);
    }
}
