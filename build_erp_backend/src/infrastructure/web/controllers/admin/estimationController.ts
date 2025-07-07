import { NextFunction, Request, Response } from "express"
import { SaveEstimationUseCase } from "../../../../useCases/admin/Estimation/saveEstimationUseCase"
import { DisplayEstimationUseCase } from "../../../../useCases/admin/Estimation/DisplayEstimationUseCase"
import { DeleteEstimationUseCase } from "../../../../useCases/admin/Estimation/DeleteEstimationUseCase"
import cloudinary from "../../../../config/cloudinary"
import { UploadEstimateImageUseCase } from "../../../../useCases/admin/Estimation/UploadEstimateImageUseCase"


export class EstimationController {
   private saveestimationuseCase: SaveEstimationUseCase
   private displayEstimationUseCase: DisplayEstimationUseCase
   private deleteEstimationuseCase: DeleteEstimationUseCase
   private uploadestimationUsecase: UploadEstimateImageUseCase
   constructor(saveestimationuseCase: SaveEstimationUseCase, displayEstimationUseCase: DisplayEstimationUseCase,
      deleteEstimationuseCase: DeleteEstimationUseCase, uploadestimationUsecase: UploadEstimateImageUseCase) {
      this.saveestimationuseCase = saveestimationuseCase
      this.displayEstimationUseCase = displayEstimationUseCase,
      this.deleteEstimationuseCase = deleteEstimationuseCase
      this.uploadestimationUsecase = uploadestimationUsecase

   }
   SaveEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.saveestimationuseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.displayEstimationUseCase.axecute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   deleteEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteEstimationuseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const file = req.files?.image;
         const projectId = req.body._id;
         if (!file || Array.isArray(file)) {
            res.status(400).json({ error: "No image file uploaded" });
            return
         }
         const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "estimation"
         })
         const ExactResult = await this.uploadestimationUsecase.execute(result.secure_url,projectId)
          res.status(200).json(ExactResult)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}