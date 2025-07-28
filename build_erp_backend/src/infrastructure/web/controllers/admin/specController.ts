import { NextFunction, Request, Response } from "express"
import { ISpecControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/ISpecControllerEntity";
import { IFindmaterialSumUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity";
import { ISpeclistUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ISaveSpecUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity";
import { ISpecSumUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity";
import { IDeleteSpecUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity";
import { IgetSpecUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity";
import { IFindlabourSumUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { IUpdateSpecUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/UpdateSpecEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ISpecModelEntity } from "../../../../Entities/ModelEntities/Spec.Entity";

export class SpecController implements ISpecControllerEntity {
   private speclistusecase: ISpeclistUseCase
   private specSaveuseCase: ISaveSpecUseCase
   private specsumusecase: ISpecSumUseCase
   private deleteSpecusecase: IDeleteSpecUseCase
   private getspecUseCase: IgetSpecUseCase
   private findmaterialSumusecase: IFindmaterialSumUseCase
   private findlaboursumusecase: IFindlabourSumUsecase
   private updateSpecUseCase: IUpdateSpecUseCase
   constructor(speclistusecase: ISpeclistUseCase, specSaveuseCase: ISaveSpecUseCase,
      specsumusecase: ISpecSumUseCase, deleteSpecusecase: IDeleteSpecUseCase, getspecUseCase: IgetSpecUseCase,
      findmaterialSumusecase: IFindmaterialSumUseCase, findlaboursumusecase: IFindlabourSumUsecase,
      updateSpecUseCase: IUpdateSpecUseCase) {
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

   getSpeclist = async (req: Request, res: Response, next: NextFunction): Promise<{result:any[],totalPage:number} | commonOutput> => {
      const { page, search } = req.query
      const specData = await this.speclistusecase.execute(Number(page), String(search))
      return specData
   }

   //------------------------------------ Save Spec  ------------------------------------//

   saveSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.specSaveuseCase.execute(req.body)
      return result
   }

   //------------------------------------Fetch sum of labour and material amount  using in a specification ------------------------------------//

   fetchlabourMaterial = async (req: Request, res: Response, next: NextFunction):Promise<number | commonOutput> => {
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

   fetchSpec = async (req: Request, res: Response, next: NextFunction): Promise<ISpecModelEntity[] | commonOutput> => {
      const result = await this.getspecUseCase.execute()
      return result
   }


   //------------------------------------ find the unit rate * quantity of a material with id and quantity    ------------------------------------//

   findMaterialSum = async (req: Request, res: Response, next: NextFunction): Promise<number | commonOutput> => {
      const materials = JSON.parse(req.query.materials as string);
      const result = await this.findmaterialSumusecase.execute(materials);
      return result
   }

   //------------------------------------ Find the daily wage * no of days of a labour with id and no of labour  ------------------------------------//

   findLaboursum = async (req: Request, res: Response, next: NextFunction): Promise<number | commonOutput> => {
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