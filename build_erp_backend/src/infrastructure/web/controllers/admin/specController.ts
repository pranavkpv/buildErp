import { NextFunction, Request, Response } from "express"
import { ISpecControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/ISpecControllerEntity";
import { IFindmaterialSumUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity";
import { ISpeclistUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ISaveSpecUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity";
import { ISpecSumUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity";
import { IDeleteSpecUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity";
import { IgetSpecUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity";
import { IFindlabourSumUsecaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity";
import { IUpdateSpecUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/UpdateSpecEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { specOutput } from "../../../../DTO/EstimationEntities/specification";

export class SpecController implements ISpecControllerEntity {
   private speclistusecase: ISpeclistUseCaseEntity
   private specSaveuseCase: ISaveSpecUseCaseEntity
   private specsumusecase: ISpecSumUseCaseEntity
   private deleteSpecusecase: IDeleteSpecUseCaseEntity
   private getspecUseCase: IgetSpecUseCaseEntity
   private findmaterialSumusecase: IFindmaterialSumUseCaseEntity
   private findlaboursumusecase: IFindlabourSumUsecaseEntity
   private updateSpecUseCase: IUpdateSpecUseCaseEntity
   constructor(speclistusecase: ISpeclistUseCaseEntity, specSaveuseCase: ISaveSpecUseCaseEntity,
      specsumusecase: ISpecSumUseCaseEntity, deleteSpecusecase: IDeleteSpecUseCaseEntity, getspecUseCase: IgetSpecUseCaseEntity,
      findmaterialSumusecase: IFindmaterialSumUseCaseEntity, findlaboursumusecase: IFindlabourSumUsecaseEntity,
      updateSpecUseCase: IUpdateSpecUseCaseEntity) {
      this.speclistusecase = speclistusecase
      this.specSaveuseCase = specSaveuseCase
      this.specsumusecase = specsumusecase
      this.deleteSpecusecase = deleteSpecusecase
      this.getspecUseCase = getspecUseCase
      this.findmaterialSumusecase = findmaterialSumusecase
      this.findlaboursumusecase = findlaboursumusecase
      this.updateSpecUseCase = updateSpecUseCase
   }

   //------------------------------------ List all specification with search and pagination ------------------------------------//

   getSpeclist = async (req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput> => {
      const { page, search } = req.query
      const specData = await this.speclistusecase.execute(Number(page), String(search))
      return specData
   }

   //------------------------------------ Save Spec  ------------------------------------//

   saveSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      console.log(req.body)
      const result = await this.specSaveuseCase.execute(req.body)
      return result
   }

   //------------------------------------Fetch sum of labour and material amount  using in a specification ------------------------------------//

   fetchlabourMaterial = async (req: Request, res: Response, next: NextFunction):Promise<specOutput | commonOutput> => {
      const result = await this.specsumusecase.execute(req.body)
      return result
   }

   //------------------------------------ Delete Specification  ------------------------------------//

   deleteSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const { id } = req.params
      const result = await this.deleteSpecusecase.execute(id)
      return result
   }

   //------------------------------------ List all Specification  ------------------------------------//

   fetchSpec = async (req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput> => {
      const result = await this.getspecUseCase.execute()
      return result
   }


   //------------------------------------ find the unit rate * quantity of a material with id and quantity    ------------------------------------//

   findMaterialSum = async (req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput> => {
      const materials = JSON.parse(req.query.materials as string);
      const result = await this.findmaterialSumusecase.execute(materials);
      return result
   }

   //------------------------------------ Find the daily wage * no of days of a labour with id and no of labour  ------------------------------------//

   findLaboursum = async (req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput> => {
      const labours = JSON.parse(req.query.labours as string)
      const result = await this.findlaboursumusecase.execute(labours)
      return result
   }

   //------------------------------------ Update Spec  ------------------------------------//

   updateSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id= req.params.id
      const result = await this.updateSpecUseCase.execute({ _id, ...req.body })
      return result
   }


}