import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial";
import { ISpecRepository } from "../../../domain/Entities/IRepository/ISpecification";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { userSpecMaterial } from "../../Entities/spec.entity";
import { IGetMaterialAndBrandInSpecsUseCase } from "../../IUseCases/ISpecification/IGetMaterialAndBrandInSpecs";

export class GetMaterialAndBrandInSpecsUseCase implements IGetMaterialAndBrandInSpecsUseCase {
   constructor(
      private _specRepository: ISpecRepository,
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(specs: string[]): Promise<commonOutput<userSpecMaterial[]>> {
      const specIncollectionOfId = await this._specRepository.getAllSpecByIds(specs)
      let materials = []
      for (let element of specIncollectionOfId) {
         for (let item of element.materialDetails) {
            materials.push(item.material_id)
         }
      }
      const getAllMaterialsById = await this._materialRepository.getMaterialByIds(materials)
      let materialnames = []
      for (let element of getAllMaterialsById) {
         materialnames.push(element.material_name)
      }
      const materialswithAggregateBrand = await this._materialRepository.getAllMaterialByIdswithAggregateBrand(materialnames)
      let results = []
      for (let element of materialswithAggregateBrand) {
         for (let item of results) {
            if (item.material_name == element.material_name) {
               item.brand_name.push(element.brandDetails.brand_name)
            }
         }
         results.push({ material_name: element.material_name, brand_name: [element.brandDetails.brand_name] })
      }
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, results)
   }
}