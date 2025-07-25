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
import { HTTP_STATUS } from "../../../../Shared/Status_code"
import { IFindMaterialByIdUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity"



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
   private findMaterialByIdUsecase : IFindMaterialByIdUsecase
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
      findMaterialByIdUsecase : IFindMaterialByIdUsecase
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
      this.findMaterialByIdUsecase =findMaterialByIdUsecase
   }


   materialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { page, search } = req.query
      const result = await this.displayAllMaterialUseCase.execute(Number(page), String(search))
      res.status(HTTP_STATUS.OK).json(result)
   }


   addMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.getAddMaterialUseCase.execute()
      res.status(HTTP_STATUS.OK).json(result)
   }


   saveMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.saveMaterialUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   editMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { _id } = req.params
      const result = await this.getEditMaterialUseCase.execute(_id)
      res.status(HTTP_STATUS.OK).json(result)
   }


   updateMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.updateMaterialUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   removeMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.deleteMaterialUseCase.execute(req.params.id)
      res.status(result.status_code).json(result)
   }


   fetchUniqueMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.fetchMaterialUseCase.execute()
      res.status(HTTP_STATUS.OK).json(result)
   }


   fetchMaterialByUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const material_name = req.params.material
      const result = await this.fetchMaterialByMaterialName.execute(material_name)
      res.status(HTTP_STATUS.OK).json(result)
   }


   fetchBrandbyName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const material_name = req.params.material
      const result = await this.fetchbrandByname.execute(material_name)
      res.status(HTTP_STATUS.OK).json(result)
   }


   fetchUnitrate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { material_name, brand_name, unit_name } = req.query
      const result = await this.fetUnitRateUseCase.execute(String(material_name), String(brand_name), String(unit_name))
      res.status(HTTP_STATUS.OK).json(result)
   }

   getMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       const {id} = req.params
       const result = await this.findMaterialByIdUsecase.execute(id)
       res.status(HTTP_STATUS.OK).json(result)
   }

}






