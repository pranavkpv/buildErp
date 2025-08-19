import { NextFunction, Request, Response } from "express"
import { IMaterialControllerEntity } from "../../../domain/Entities/ControllerEntities/AdminControllerEntities/IMaterialControllerEntity"
import { IDisplayAllMaterialUsecaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity"
import { IAddMaterialUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/AddMaterialEntity"
import { IGetEditMaterialUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/GetEditMaterialEntity"
import { IDisplayAddMaterialUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity"
import { IUpdateMaterialUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity"
import { IDeleteMaterialUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity"
import { IFetchMaterialUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity"
import { IFetchMaterialByMaterialNameEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity"
import { IFetchBrandByMaterialNameEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity"
import { IFetchUnitRateUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity"
import { IFindMaterialByIdUsecaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity"
import { getAddMaterialData, materialOutput, outEditMaterialData } from "../../../application/dto/MaterialEntities/material"
import { commonOutput } from "../../../application/dto/CommonEntities/common"
import { IMaterialModelEntity } from "../../../domain/Entities/modelEntities/material.entity"



export class MaterialController implements IMaterialControllerEntity {
   private displayAllMaterialUseCase: IDisplayAllMaterialUsecaseEntity
   private getAddMaterialUseCase: IDisplayAddMaterialUseCaseEntity
   private saveMaterialUseCase: IAddMaterialUseCaseEntity
   private getEditMaterialUseCase: IGetEditMaterialUseCaseEntity
   private updateMaterialUseCase: IUpdateMaterialUseCaseEntity
   private deleteMaterialUseCase: IDeleteMaterialUseCaseEntity
   private fetchMaterialUseCase: IFetchMaterialUseCaseEntity
   private fetchMaterialByMaterialName: IFetchMaterialByMaterialNameEntity
   private fetchbrandByname: IFetchBrandByMaterialNameEntity
   private fetUnitRateUseCase: IFetchUnitRateUseCaseEntity
   private findMaterialByIdUsecase: IFindMaterialByIdUsecaseEntity
   constructor(
      displayAllMaterialUseCase: IDisplayAllMaterialUsecaseEntity,
      getAddMaterialUseCase: IDisplayAddMaterialUseCaseEntity,
      saveMaterialUseCase: IAddMaterialUseCaseEntity,
      getEditMaterialUseCase: IGetEditMaterialUseCaseEntity,
      updateMaterialUseCase: IUpdateMaterialUseCaseEntity,
      deleteMaterialUseCase: IDeleteMaterialUseCaseEntity,
      fetchMaterialUseCase: IFetchMaterialUseCaseEntity,
      fetchMaterialByMaterialName: IFetchMaterialByMaterialNameEntity,
      fetchbrandByname: IFetchBrandByMaterialNameEntity,
      fetUnitRateUseCase: IFetchUnitRateUseCaseEntity,
      findMaterialByIdUsecase: IFindMaterialByIdUsecaseEntity
   ) {
      this.displayAllMaterialUseCase = displayAllMaterialUseCase
      this.getAddMaterialUseCase = getAddMaterialUseCase
      this.saveMaterialUseCase = saveMaterialUseCase
      this.getEditMaterialUseCase = getEditMaterialUseCase
      this.updateMaterialUseCase = updateMaterialUseCase
      this.deleteMaterialUseCase = deleteMaterialUseCase
      this.fetchMaterialUseCase = fetchMaterialUseCase
      this.fetchMaterialByMaterialName = fetchMaterialByMaterialName
      this.fetchbrandByname = fetchbrandByname
      this.fetUnitRateUseCase = fetUnitRateUseCase
      this.findMaterialByIdUsecase = findMaterialByIdUsecase
   }


   //------------------------------------ List material with search and pagination ------------------------------------//

   materialList = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput> => {
      const { page, search } = req.query
      const result = await this.displayAllMaterialUseCase.execute(Number(page), String(search))
      return result
   }

   //------------------------------------ list category,brand,unit,project using in add material ------------------------------------//

   addMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput> => {
      const result = await this.getAddMaterialUseCase.execute()
      return result
   }

   //------------------------------------ Save Material ------------------------------------//


   saveMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.saveMaterialUseCase.execute(req.body)
      return result
   }

   //------------------------------------ list category,brand,unit,project using in edit material ------------------------------------//

   editMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput> => {
      const { id } = req.params
      const result = await this.getEditMaterialUseCase.execute(id)
      return result
   }

   //------------------------------------ Update Material ------------------------------------//

   updateMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this.updateMaterialUseCase.execute({_id,...req.body})
      return result
   }

   //------------------------------------ Delete Material ------------------------------------//

   removeMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.deleteMaterialUseCase.execute(req.params.id)
      return result
   }


   //------------------------------------ Fetch unique material name using in specification registration ------------------------------------//

   fetchUniqueMaterial = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput> => {
      const result = await this.fetchMaterialUseCase.execute()
      return result
   }

   //------------------------------------ Fetch unit list corresponding material name ------------------------------------//

   fetchMaterialByUnit = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput> => {
      const material_name = req.params.material
      const result = await this.fetchMaterialByMaterialName.execute(material_name)
      return result
   }

   //------------------------------------ Fetch brand list corresponding material name ------------------------------------//

   fetchBrandbyName = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput> => {
      const material_name = req.params.material
      const result = await this.fetchbrandByname.execute(material_name)
      return result
   }

   //------------------------------------ Fetch Unit Rate of the material with material name, brand name, unit name ------------------------------------//

   fetchUnitrate = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput  | commonOutput> => {
      const { material_name, brand_name, unit_name } = req.query
      const result = await this.fetUnitRateUseCase.execute(String(material_name), String(brand_name), String(unit_name))
      return result
   }

   //------------------------------------ List all Material ------------------------------------//

   getMaterial = async (req: Request, res: Response, next: NextFunction): Promise<materialOutput  | commonOutput> => {
      const { id } = req.params
      const result = await this.findMaterialByIdUsecase.execute(id)
      return result
   }


}






