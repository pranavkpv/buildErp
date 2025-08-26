import { IBrandRepository } from "../../../domain/Entities/IRepository/IBrand"
import { ICategoryRepository } from "../../../domain/Entities/IRepository/ICategory"
import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial"
import { IUnitRepository } from "../../../domain/Entities/IRepository/IUnit"
import { IDisplayAddMaterialUseCase } from "../../IUseCases/IMaterial/IDisplayAddMaterial"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"
import { IUnitMapper } from "../../../domain/mappers/IUnit.mapper"
import { IBrandmapper } from "../../../domain/mappers/IBrand.mapper"
import { ICategorymapper } from "../../../domain/mappers/ICategory.mapper"
import { IProjectmapper } from "../../../domain/mappers/IProject.mapper"
import { commonOutput } from "../../dto/common"
import { addMaterialFetch } from "../../Entities/material.entity"




export class DisplayAddMaterialDataUseCase implements IDisplayAddMaterialUseCase {

   constructor(
      private _materialRepository: IMaterialRepository,
      private _categoryRepository: ICategoryRepository,
      private _brandRepository: IBrandRepository,
      private _unitRepository: IUnitRepository,
      private _unitmapper: IUnitMapper,
      private _brandmapper: IBrandmapper,
      private _categorymapper: ICategorymapper,
      private _projectmapper: IProjectmapper
   ) { }
   async execute(): Promise<commonOutput<addMaterialFetch> | commonOutput> {
      const categoryData = await this._categoryRepository.getAllCategories()
      const brandData = await this._brandRepository.getAllBrands()
      const unitData = await this._unitRepository.getAllUnits()
      const projectData = await this._materialRepository.getAllProjects()
      const mappedUnit = this._unitmapper.toUnitIdnameDTO(unitData)
      const mappedBrand = this._brandmapper.toidBrandnameDTO(brandData)
      const mappedCategory = this._categorymapper.toIdnameCategory(categoryData)
      const mappedProject = this._projectmapper.toIdandnameDto(projectData)
      return ResponseHelper.success(MaterialSuccessMessage.ADDFETCH, { categoryData:mappedCategory, brandData:mappedBrand, unitData:mappedUnit, projectData:mappedProject })
   }

}

