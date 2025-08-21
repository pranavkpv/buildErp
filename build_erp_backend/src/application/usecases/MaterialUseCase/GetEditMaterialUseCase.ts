import { IGetEditMaterialUseCase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/GetEditMaterialEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"

import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { ICategoryRepository } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { IBrandRepository } from "../../../domain/interfaces/Material-management/IBrandRepository"
import { IUnitRepository } from "../../../domain/interfaces/Material-management/IUnitRepository"
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { commonOutput } from "../../dto/common"
import {  editMaterialFetch } from "../../entities/material.entity"
import { IUnitMapper } from "../../../domain/mappers/IUnit.mapper"
import { ICategorymapper } from "../../../domain/mappers/ICategory.mapper"
import { IBrandmapper } from "../../../domain/mappers/IBrand.mapper"
import { IProjectmapper } from "../../../domain/mappers/IProject.mapper"



export class GetEditMaterialUseCase implements IGetEditMaterialUseCase {
   constructor(
      private _materialRepository: IMaterialRepository,
      private _categoryRepository: ICategoryRepository,
      private _brandRepository: IBrandRepository,
      private _unitRepository: IUnitRepository,
      private _projectStockRepository: IProjectStockRepository,
      private _unitmapper: IUnitMapper,
      private _categorymapper: ICategorymapper,
      private _brandmapper: IBrandmapper,
      private _projectmapper: IProjectmapper
   ) { }

   async execute(_id: string): Promise<commonOutput<editMaterialFetch> | commonOutput> {
      const material_id = _id
      const categoryData = await this._categoryRepository.findAllCategory()
      const brandData = await this._brandRepository.findAllBrand()
      const unitData = await this._unitRepository.findUnit()
      const materialData = await this._materialRepository.findMaterialById(_id)
      const projectStockData = await this._projectStockRepository.findProjectStockByMaterialId(material_id)
      const mappedUnit = this._unitmapper.toUnitIdnameDTO(unitData)
      const mappedBrand = this._brandmapper.toidBrandnameDTO(brandData)
      const mappedCategory = this._categorymapper.toIdnameCategory(categoryData)
      return ResponseHelper.success(
         MaterialSuccessMessage.EDITFETCH,
         { categoryData: mappedCategory, brandData: mappedBrand, unitData: mappedUnit, materialData, projectStockData } as editMaterialFetch
      );
   }
}


