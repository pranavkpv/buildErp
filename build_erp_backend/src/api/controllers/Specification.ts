import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../application/dto/common"
import { specFullDTO } from "../../application/dto/specification.dto"
import { IFindmaterialSumUseCase } from "../../application/IUseCases/IMaterial/IFindMaterialSum"
import { ISpecController } from "../../domain/Entities/IController/ISpecification"
import { IFindlabourSumUsecase } from "../../application/IUseCases/IMaterial/IFindLabourSum"
import { ISaveSpecUseCase } from "../../application/IUseCases/ISpecification/ISpecificationSave"
import { IDeleteSpecUseCase } from "../../application/IUseCases/ISpecification/IDeleteSpecification"
import { IUpdateSpecUseCase } from "../../application/IUseCases/ISpecification/IUpdateSpecification"
import { ISpeclistUseCase } from "../../application/IUseCases/ISpecification/ISpecificationList"
import { IGetSpecUseCase } from "../../application/IUseCases/ISpecification/IGetSpecification"
import { ISpecSumUseCase } from "../../application/IUseCases/ISpecification/ISpecificationSum"

export class SpecController implements ISpecController {
   constructor(
      private _getSpecUseCase: IGetSpecUseCase,
      private _findMaterialSumUseCase: IFindmaterialSumUseCase,
      private _findLabourSumUseCase: IFindlabourSumUsecase,
      private _specListUseCase: ISpeclistUseCase,
      private _saveSpecUseCase: ISaveSpecUseCase,
      private _specSumUseCase: ISpecSumUseCase,
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
