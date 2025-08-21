import { NextFunction, Request, Response } from "express"
import { IMaterialControllerEntity } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/IMaterialControllerEntity"
import { IDisplayAllMaterialUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity"
import { IAddMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/AddMaterialEntity"
import { IGetEditMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/GetEditMaterialEntity"
import { IDisplayAddMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity"
import { IUpdateMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity"
import { IDeleteMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity"
import { IFetchMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity"
import { IFetchMaterialByMaterialNameUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity"
import { IFetchBrandByMaterialNameUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity"
import { IFetchUnitRateUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity"
import { IFindMaterialByIdUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity"
import { addMaterialFetch, editMaterialFetch, editMaterialFullDatafetch } from "../../application/entities/material.entity"
import { commonOutput } from "../../application/dto/common"
import { listingMaterialDTO } from "../../application/dto/material.dto"




export class MaterialController implements IMaterialControllerEntity {
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


   //------------------------------------ List material with search and pagination ------------------------------------//

   materialList = async (req: Request, res: Response, next: NextFunction):Promise<commonOutput<{data:listingMaterialDTO[],totalPage:number}> | commonOutput> => {
      const { page, search } = req.query
      const result = await this._displayAllMaterialUseCase.execute({page:Number(page), search:String(search)})
      return result
   }

   //------------------------------------ list category,brand,unit,project using in add material ------------------------------------//

   addMaterialList = async (req: Request, res: Response, next: NextFunction):Promise<commonOutput<addMaterialFetch> | commonOutput> => {
      const result = await this._getAddMaterialUseCase.execute()
      return result
   }

   //------------------------------------ Save Material ------------------------------------//


   saveMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._saveMaterialUseCase.execute(req.body)
      return result
   }

   //------------------------------------ list category,brand,unit,project using in edit material ------------------------------------//

   editMaterialList = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput<editMaterialFetch> | commonOutput> => {
      const { id } = req.params
      const result = await this._getEditMaterialUseCase.execute(id)
      return result
   }

   //------------------------------------ Update Material ------------------------------------//

   updateMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this._updateMaterialUseCase.execute({ _id, ...req.body })
      return result
   }

   //------------------------------------ Delete Material ------------------------------------//

   removeMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._deleteMaterialUseCase.execute(req.params.id)
      return result
   }


   //------------------------------------ Fetch unique material name using in specification registration ------------------------------------//

   fetchUniqueMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<string[]>>  => {
      const result = await this._fetchMaterialUseCase.execute()
      return result
   }

   //------------------------------------ Fetch unit list corresponding material name ------------------------------------//

   fetchMaterialByUnit = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<string[]>> => {
      const material_name = req.params.material
      const result = await this._fetchMaterialByMaterialName.execute(material_name)
      return result
   }

   //------------------------------------ Fetch brand list corresponding material name ------------------------------------//

   fetchBrandbyName = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<string[]>> => {
      const material_name = req.params.material
      const result = await this._fetchbrandBynameusecase.execute(material_name)
      return result
   }

   //------------------------------------ Fetch Unit Rate of the material with material name, brand name, unit name ------------------------------------//

   fetchUnitrate = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<number> |void> => {
      const { material_name, brand_name, unit_name } = req.query
      const result = await this._fetUnitRateUseCase.execute({material_name:String(material_name), brand_name:String(brand_name), unit_name:String(unit_name)})
      return result
   }

   //------------------------------------ List all Material ------------------------------------//

   getMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<editMaterialFullDatafetch | null>> => {
      const { id } = req.params
      const result = await this._findMaterialByIdUsecase.execute(id)
      return result
   }


}






