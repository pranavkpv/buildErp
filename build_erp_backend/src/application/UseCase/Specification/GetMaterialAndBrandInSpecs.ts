import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { userSpecMaterial } from '../../entities/spec.entity';
import { IGetMaterialAndBrandInSpecsUseCase } from '../../IUseCases/ISpecification/IGetMaterialAndBrandInSpecs';

export class GetMaterialAndBrandInSpecsUseCase implements IGetMaterialAndBrandInSpecsUseCase {
    constructor(
        private _specRepository: ISpecRepository,
        private _materialRepository: IMaterialRepository,
    ) { }
    async execute(specs: string[]): Promise<commonOutput<userSpecMaterial[]>> {
        const specIncollectionOfId = await this._specRepository.getAllSpecByIds(specs);
        const materials = [];
        for (const element of specIncollectionOfId) {
            for (const item of element.materialDetails) {
                materials.push(item.material_id);
            }
        }
        const uniqueMaterial = [...new Set(materials)];
        const getAllMaterialsById = await this._materialRepository.getMaterialByIds(uniqueMaterial);
        const materialnames = [];
        for (const element of getAllMaterialsById) {
            materialnames.push(element.material_name);
        }
        const materialswithAggregateBrand = await this._materialRepository.getAllMaterialByIdswithAggregateBrand(materialnames);
        const results = [];
        console.log('sssss', materialswithAggregateBrand);
        for (const element of materialswithAggregateBrand) {
            let x = 0;
            for (const item of results) {
                if (item.material_name === element.material_name) {
                    x = 1;
                    item.brand_name.push(element.brandDetails.brand_name);
                }
            }
            if (x === 1) {
                continue;
            }
            results.push({ material_name: element.material_name, brand_name: [element.brandDetails.brand_name] });
        }
        console.log(results);

        return ResponseHelper.success(MaterialSuccessMessage.FETCH, results);
    }
}