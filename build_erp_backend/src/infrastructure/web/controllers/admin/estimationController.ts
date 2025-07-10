import { NextFunction, Request, Response } from "express"
import { SaveEstimationUseCase } from "../../../../useCases/admin/Estimation/saveEstimationUseCase"
import { DisplayEstimationUseCase } from "../../../../useCases/admin/Estimation/DisplayEstimationUseCase"
import { DeleteEstimationUseCase } from "../../../../useCases/admin/Estimation/DeleteEstimationUseCase"
import cloudinary from "../../../../config/cloudinary"
import { UploadEstimateImageUseCase } from "../../../../useCases/admin/Estimation/UploadEstimateImageUseCase"
import { FetchExistEstimationUseCase } from "../../../../useCases/admin/Estimation/FetchExistEstimationUseCase"
import { UpdateEstimationUsecase } from "../../../../useCases/admin/Estimation/UpdateEstimationUseCase"


export class EstimationController {
   private saveestimationuseCase: SaveEstimationUseCase
   private displayEstimationUseCase: DisplayEstimationUseCase
   private deleteEstimationuseCase: DeleteEstimationUseCase
   private uploadestimationUsecase: UploadEstimateImageUseCase
   private fetchexistestimationusecase: FetchExistEstimationUseCase
   private updateEstimationUsecase : UpdateEstimationUsecase
   constructor(saveestimationuseCase: SaveEstimationUseCase, displayEstimationUseCase: DisplayEstimationUseCase,
      deleteEstimationuseCase: DeleteEstimationUseCase, uploadestimationUsecase: UploadEstimateImageUseCase,
      fetchexistestimationusecase: FetchExistEstimationUseCase,updateEstimationUsecase : UpdateEstimationUsecase) {
      this.saveestimationuseCase = saveestimationuseCase
      this.displayEstimationUseCase = displayEstimationUseCase,
         this.deleteEstimationuseCase = deleteEstimationuseCase
      this.uploadestimationUsecase = uploadestimationUsecase
      this.fetchexistestimationusecase = fetchexistestimationusecase
      this.updateEstimationUsecase = updateEstimationUsecase
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
         const { search, page } = req.query
         const result = await this.displayEstimationUseCase.axecute(String(search), Number(page))
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
         const ExactResult = await this.uploadestimationUsecase.execute(result.secure_url, projectId)
         res.status(200).json(ExactResult)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchExistEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { _id } = req.query
         const result = await this.fetchexistestimationusecase.execute(String(_id))
         console.log(result)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   updateEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.updateEstimationUsecase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}