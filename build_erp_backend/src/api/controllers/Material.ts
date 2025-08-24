import { NextFunction, Request, Response } from "express";
import { IMaterialController } from "../../domain/Entities/Controller.Entity/IMaterial";
import { IDisplayAllMaterialUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity";
import { IAddMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/AddMaterialEntity";
import { IGetEditMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/GetEditMaterialEntity";
import { IDisplayAddMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity";
import { IUpdateMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity";
import { IDeleteMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity";
import { IFetchMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity";
import { IFetchMaterialByMaterialNameUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity";
import { IFetchBrandByMaterialNameUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity";
import { IFetchUnitRateUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity";
import { IFindMaterialByIdUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity";
import { addMaterialFetch, editMaterialFullDatafetch } from "../../application/entities/material.entity";
import { commonOutput } from "../../application/dto/common";
import { EditmaterialDetailsDTO, EditprojectDetailsDTO, listingMaterialDTO } from "../../application/dto/material.dto";

export class MaterialController implements IMaterialController {
   constructor(
      private _displayAllMaterialUseCase: IDisplayAllMaterialUsecase,
      private _getAddMaterialUseCase: IDisplayAddMaterialUseCase,
      private _saveMaterialUseCase: IAddMaterialUseCase,
      private _getEditMaterialUseCase: IGetEditMaterialUseCase,
      private _updateMaterialUseCase: IUpdateMaterialUseCase,
      private _deleteMaterialUseCase: IDeleteMaterialUseCase,
      private _fetchMaterialUseCase: IFetchMaterialUseCase,
      private _fetchMaterialByMaterialName: IFetchMaterialByMaterialNameUsecase,
      private _fetchbrandBynameusecase: IFetchBrandByMaterialNameUsecase,
      private _fetUnitRateUseCase: IFetchUnitRateUseCase,
      private _findMaterialByIdUsecase: IFindMaterialByIdUsecase
   ) { }

   // Fetch paginated material list with search filter
   getPaginatedMaterialList = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listingMaterialDTO[]; totalPage: number }> | commonOutput | void> => {
      try {
         const { page, search } = req.query;
         const result = await this._displayAllMaterialUseCase.execute({ page: Number(page), search: String(search) });
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch supporting data (category, brand, unit, project) for material creation
   getAddMaterialDependencies = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<addMaterialFetch> | commonOutput | void> => {
      try {
         const result = await this._getAddMaterialUseCase.execute();
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Create a new material
   createMaterial = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._saveMaterialUseCase.execute(req.body);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch supporting data (category, brand, unit, project) for material editing
   getEditMaterialDependencies = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ materialData: EditmaterialDetailsDTO; projectStockData: EditprojectDetailsDTO[] }> | commonOutput | void> => {
      try {
         const { id } = req.params;
         const result = await this._getEditMaterialUseCase.execute(id);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Update an existing material
   updateMaterial = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         const result = await this._updateMaterialUseCase.execute({ _id, ...req.body });
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Delete a material by ID
   deleteMaterial = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._deleteMaterialUseCase.execute(req.params.id);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch unique material names for specification registration
   getUniqueMaterialNames = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string[]> | void> => {
      try {
         const result = await this._fetchMaterialUseCase.execute();
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch unit list based on material name
   getUnitsByMaterialName = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string[]> | void> => {
      try {
         const materialName = req.params.material;
         const result = await this._fetchMaterialByMaterialName.execute(materialName);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch brand list based on material name
   getBrandsByMaterialName = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string[]> | void> => {
      try {
         const materialName = req.params.material;
         const result = await this._fetchbrandBynameusecase.execute(materialName);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch unit rate of a material by material, brand, and unit name
   getUnitRate = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | void> => {
      try {
         const { material_name, brand_name, unit_name } = req.query;
         const result = await this._fetUnitRateUseCase.execute({
            material_name: String(material_name),
            brand_name: String(brand_name),
            unit_name: String(unit_name),
         });
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch a single material by ID
   getMaterialById = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<editMaterialFullDatafetch | null> | void> => {
      try {
         const { id } = req.params;
         const result = await this._findMaterialByIdUsecase.execute(id);
         return result;
      } catch (error) {
         next(error);
      }
   };
}
