import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../application/dto/common"
import { specFullDTO } from "../../application/dto/specification.dto"
import { IgetSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity"
import { IFindmaterialSumUseCase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity"
import { ISpecController } from "../../domain/Entities/Controller.Entity/ISpecification"
import { IFindlabourSumUsecase } from "../../application/interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity"
import { ISaveSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity"
import { IDeleteSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity"
import { IUpdateSpecUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/UpdateSpecEntity"
import { ISpeclistUseCase } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity"
import { ISpecSumUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity"

export class SpecController implements ISpecController {
   constructor(
      private _getSpecUseCase: IgetSpecUseCase,
      private _findMaterialSumUseCase: IFindmaterialSumUseCase,
      private _findLabourSumUseCase: IFindlabourSumUsecase,
      private _specListUseCase: ISpeclistUseCase,
      private _saveSpecUseCase: ISaveSpecUseCase,
      private _specSumUseCase: ISpecSumUseCaseEntity,
      private _deleteSpecUseCase: IDeleteSpecUseCase,
      private _updateSpecUseCase: IUpdateSpecUseCase
   ) { }

   // Fetch all specifications
   getSpecifications = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<specFullDTO[]> | commonOutput | void> => {
      try {
         const result = await this._getSpecUseCase.execute()
         return result
      } catch (error) {
         next(error)
      }
   }

   // Calculate total cost of selected materials
   calculateMaterialSum = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | commonOutput | void> => {
      try {
         const materials = JSON.parse(req.query.materials as string)
         const result = await this._findMaterialSumUseCase.execute(materials)
         return result
      } catch (error) {
         next(error)
      }
   }

   // Calculate total wage of selected labour
   calculateLabourSum = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | commonOutput | void> => {
      try {
         const labours = JSON.parse(req.query.labours as string)
         const result = await this._findLabourSumUseCase.execute(labours)
         return result
      } catch (error) {
         next(error)
      }
   }

   // Get specification list with pagination and search
   getSpecificationList = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: any[], totalPage: number }> | commonOutput | void> => {
      try {
         const { page, search } = req.query
         const specData = await this._specListUseCase.execute({ page: Number(page), search: String(search) })
         return specData
      } catch (error) {
         next(error)
      }
   }

   // Save a new specification
   createSpecification = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._saveSpecUseCase.execute(req.body)
         return result
      } catch (error) {
         next(error)
      }
   }

   // Fetch sum of labour and material in a specification
   getLabourMaterialSum = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | commonOutput | void> => {
      try {
         const result = await this._specSumUseCase.execute(req.body)
         return result
      } catch (error) {
         next(error)
      }
   }

   // Delete a specification by id
   removeSpecification = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const { id } = req.params
         const result = await this._deleteSpecUseCase.execute(id)
         return result
      } catch (error) {
         next(error)
      }
   }

   // Update a specification by id
   updateSpecification = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id
         const result = await this._updateSpecUseCase.execute({ _id, ...req.body })
         return result
      } catch (error) {
         next(error)
      }
   }
}
