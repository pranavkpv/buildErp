import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../application/dto/common"
import { specFullDTO } from "../../application/dto/specification.dto"
import { IgetSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity"
import { IFindmaterialSumUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity"
import { ISpecController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/ISpecControllerEntity"
import { IFindlabourSumUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity"
import { ISaveSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity"
import { IDeleteSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity"
import { IUpdateSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/UpdateSpecEntity"
import { ISpeclistUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity"
import { ISpecSumUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity"

export class SpecController implements ISpecController {
   constructor(
      private _getspecUseCase: IgetSpecUseCase,
      private _findmaterialSumusecase: IFindmaterialSumUseCase,
      private _findlaboursumusecase: IFindlabourSumUsecase,
      private _speclistusecase: ISpeclistUseCase,
      private _specSaveuseCase: ISaveSpecUseCase,
      private specsumusecase: ISpecSumUseCaseEntity,
      private _deleteSpecusecase: IDeleteSpecUseCase,
      private _updateSpecUseCase: IUpdateSpecUseCase
   ) { }

   //------------------------------------ List all Specification  ------------------------------------//

   fetchSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<specFullDTO[]> | commonOutput> => {
      const result = await this._getspecUseCase.execute()
      return result
   }

   //------------------------------------ find the unit rate * quantity of a material with id and quantity    ------------------------------------//

   findMaterialSum = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<number> | commonOutput> => {
      const materials = JSON.parse(req.query.materials as string);
      const result = await this._findmaterialSumusecase.execute(materials);
      return result
   }

   //------------------------------------ Find the daily wage * no of days of a labour with id and no of labour  ------------------------------------//

   findLaboursum = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<number> | commonOutput> => {
      const labours = JSON.parse(req.query.labours as string)
      const result = await this._findlaboursumusecase.execute(labours)
      return result
   }

   //------------------------------------ List all specification with search and pagination ------------------------------------//

   getSpeclist = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput<{data:any[],totalPage:number}> | commonOutput> => {
      const { page, search } = req.query
      const specData = await this._speclistusecase.execute({page:Number(page), search:String(search)})
      return specData
   }

   //------------------------------------ Save Spec  ------------------------------------//

   saveSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._specSaveuseCase.execute(req.body)
      return result
   }

   //------------------------------------Fetch sum of labour and material amount  using in a specification ------------------------------------//

   fetchlabourMaterial = async (req: Request, res: Response, next: NextFunction):Promise<commonOutput<number> | commonOutput> => {
      const result = await this.specsumusecase.execute(req.body)
      return result
   }

   //------------------------------------ Delete Specification  ------------------------------------//

   deleteSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const { id } = req.params
      const result = await this._deleteSpecusecase.execute(id)
      return result
   }


   //------------------------------------ Update Spec  ------------------------------------//

   updateSpec = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this._updateSpecUseCase.execute({ _id, ...req.body })
      return result
   }


}