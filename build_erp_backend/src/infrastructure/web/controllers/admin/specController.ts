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


   getSpeclist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { page, search } = req.query
      const specData = await this.speclistusecase.execute(Number(page), String(search))
      res.status(HTTP_STATUS.OK).json(specData)
   }


   saveSpec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.specSaveuseCase.execute(req.body)
      res.status(HTTP_STATUS.OK).json(result)
   }


   fetchlabourMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.specsumusecase.execute(req.body)
      res.status(HTTP_STATUS.OK).json(result)
   }


   deleteSpec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params
      const result = await this.deleteSpecusecase.execute(id)
      res.status(HTTP_STATUS.OK).json(result)
   }


   fetchSpec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.getspecUseCase.execute()
      res.status(HTTP_STATUS.OK).json(result)
   }


   findMaterialSum = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const materials = JSON.parse(req.query.materials as string);
      const result = await this.findmaterialSumusecase.execute(materials);
      res.status(HTTP_STATUS.OK).json(result)
   }


   findLaboursum = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const labours = JSON.parse(req.query.labours as string)
      const result = await this.findlaboursumusecase.execute(labours)
      res.status(HTTP_STATUS.OK).json(result)
   }
   updateSpec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const _id= req.params.id
      const result = await this.updateSpecUseCase.execute({ _id, ...req.body })
      res.status(result.status_code).json(result)
   }
}