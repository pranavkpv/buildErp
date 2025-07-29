import { NextFunction, Request, Response } from "express"
import { IMaterialControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IMaterialControllerEntity"
import { IDisplayAllMaterialUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity"
import { IAddMaterialUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/AddMaterialEntity"
import { IGetEditMaterialUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/GetEditMaterialEntity"
import { IDisplayAddMaterialUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity"
import { IUpdateMaterialUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity"
import { IDeleteMaterialUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity"
import { IFetchMaterialUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity"
import { IFetchMaterialByMaterialName } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity"
import { IFetchBrandByMaterialName } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity"
import { IFetchUnitRateUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity"
import { IFindMaterialByIdUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity"
import { getAddMaterialData, materialOutput, outEditMaterialData } from "../../../../Entities/Input-OutputEntities/MaterialEntities/material"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IMaterialModelEntity } from "../../../../Entities/ModelEntities/Material.Entity"



export class MaterialController implements IMaterialControllerEntity {
   private displayAllMaterialUseCase: IDisplayAllMaterialUsecase
   private getAddMaterialUseCase: IDisplayAddMaterialUseCase
   private saveMaterialUseCase: IAddMaterialUseCase
   private getEditMaterialUseCase: IGetEditMaterialUseCase
   private updateMaterialUseCase: IUpdateMaterialUseCase
   private deleteMaterialUseCase: IDeleteMaterialUseCase
   private fetchMaterialUseCase: IFetchMaterialUseCase
   private fetchMaterialByMaterialName: IFetchMaterialByMaterialName
   private fetchbrandByname: IFetchBrandByMaterialName
   private fetUnitRateUseCase: IFetchUnitRateUseCase
   private findMaterialByIdUsecase: IFindMaterialByIdUsecase
   constructor(
      displayAllMaterialUseCase: IDisplayAllMaterialUsecase,
      getAddMaterialUseCase: IDisplayAddMaterialUseCase,
      saveMaterialUseCase: IAddMaterialUseCase,
      getEditMaterialUseCase: IGetEditMaterialUseCase,
      updateMaterialUseCase: IUpdateMaterialUseCase,
      deleteMaterialUseCase: IDeleteMaterialUseCase,
      fetchMaterialUseCase: IFetchMaterialUseCase,
      fetchMaterialByMaterialName: IFetchMaterialByMaterialName,
      fetchbrandByname: IFetchBrandByMaterialName,
      fetUnitRateUseCase: IFetchUnitRateUseCase,
      findMaterialByIdUsecase: IFindMaterialByIdUsecase
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






