import { NextFunction, Request, Response } from "express"
import { SpeclistUseCase } from "../../../../useCases/admin/Spec/SpeclistUseCase";
import { SaveSpecUseCase } from "../../../../useCases/admin/Spec/SpecSaveUseCase";
import { SpecSumUseCase } from "../../../../useCases/admin/Spec/specSumUseCase";
import { DeleteSpecUseCase } from "../../../../useCases/admin/Spec/DeleteSpecUseCase";
import { getSpecUseCase } from "../../../../useCases/admin/Spec/getSpecUseCase";
import { FindmaterialSumUseCase } from "../../../../useCases/admin/Material/FindMaterialSumUseCase";
import { FindlabourSumUsecase } from "../../../../useCases/admin/Material/FindLabourSumUseCase";
import { SaveEstimationUseCase } from "../../../../useCases/admin/Estimation/saveEstimationUseCase";

export class SpecController {
   private speclistusecase: SpeclistUseCase
   private specSaveuseCase: SaveSpecUseCase
   private specsumusecase: SpecSumUseCase
   private deleteSpecusecase: DeleteSpecUseCase
   private getspecUseCase: getSpecUseCase
   private findmaterialSumusecase: FindmaterialSumUseCase
   private findlaboursumusecase: FindlabourSumUsecase
   constructor(speclistusecase: SpeclistUseCase, specSaveuseCase: SaveSpecUseCase,
      specsumusecase: SpecSumUseCase, deleteSpecusecase: DeleteSpecUseCase, getspecUseCase: getSpecUseCase,
      findmaterialSumusecase: FindmaterialSumUseCase, findlaboursumusecase: FindlabourSumUsecase) {
      this.speclistusecase = speclistusecase
      this.specSaveuseCase = specSaveuseCase
      this.specsumusecase = specsumusecase
      this.deleteSpecusecase = deleteSpecusecase
      this.getspecUseCase = getspecUseCase
      this.findmaterialSumusecase = findmaterialSumusecase
      this.findlaboursumusecase = findlaboursumusecase
   }
   getSpeclist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { page, search } = req.query
         const specData = await this.speclistusecase.execute(Number(page), String(search))
         res.status(200).json(specData)
      } catch (error) {
         console.log(error)
         next(error)
      }

   }
   saveSpec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.specSaveuseCase.execute(req.body)
         res.status(201).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchlabourMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.specsumusecase.execute(req.body)
         res.status(201).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }


   deleteSpec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { _id } = req.query
         const result = await this.deleteSpecusecase.execute(String(_id))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchSpec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.getspecUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   findMaterialSum = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const materials = JSON.parse(req.query.materials as string);
         const result = await this.findmaterialSumusecase.execute(materials);

         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   findLaboursum = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const labours = JSON.parse(req.query.labours as string)
         const result = await this.findlaboursumusecase.execute(labours)

         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}