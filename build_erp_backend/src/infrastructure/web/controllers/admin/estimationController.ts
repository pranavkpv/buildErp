import { NextFunction, Request, Response } from "express"
import cloudinary from "../../../../config/cloudinary"
import { IEstimationControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IEstimationControllerEntity"
import { ISaveEstimationUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/SaveEstimationEntity"
import { IDisplayEstimationUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity"
import { IDeleteEstimationUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DeleteEstimationEntity"
import { IFetchExistEstimationUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/FetchExistEstimationEntity"
import { IUploadEstimateImageUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UploadEstimateImageEntity"
import { IUpdateEstimationUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"
import { ERROR_MESSAGE } from "../../../../Shared/Message"


export class EstimationController implements IEstimationControllerEntity {
   private saveestimationuseCase: ISaveEstimationUseCase
   private displayEstimationUseCase: IDisplayEstimationUseCase
   private deleteEstimationuseCase: IDeleteEstimationUseCase
   private uploadestimationUsecase: IUploadEstimateImageUseCase
   private fetchexistestimationusecase: IFetchExistEstimationUseCase
   private updateEstimationUsecase: IUpdateEstimationUseCase
   constructor(saveestimationuseCase: ISaveEstimationUseCase, displayEstimationUseCase: IDisplayEstimationUseCase,
      deleteEstimationuseCase: IDeleteEstimationUseCase, uploadestimationUsecase: IUploadEstimateImageUseCase,
      fetchexistestimationusecase: IFetchExistEstimationUseCase, updateEstimationUsecase: IUpdateEstimationUseCase) {
      this.saveestimationuseCase = saveestimationuseCase
      this.displayEstimationUseCase = displayEstimationUseCase,
         this.deleteEstimationuseCase = deleteEstimationuseCase
      this.uploadestimationUsecase = uploadestimationUsecase
      this.fetchexistestimationusecase = fetchexistestimationusecase
      this.updateEstimationUsecase = updateEstimationUsecase
   }


   SaveEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.saveestimationuseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   fetchEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { search, page } = req.query
      const result = await this.displayEstimationUseCase.axecute(String(search), Number(page))
      res.status(HTTP_STATUS.OK).json(result)
   }


   deleteEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.deleteEstimationuseCase.execute(req.params.id)
      res.status(result.status_code).json(result)
   }


   uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const file = req.files?.image;
      const projectId = req.body._id;
      if (!file || Array.isArray(file)) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ERROR_MESSAGE.ESTIMATION.NO_IMAGE });
         return
      }
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "Estimation"
      })
      const ExactResult = await this.uploadestimationUsecase.execute(result.secure_url, projectId)
      res.status(ExactResult.status_code).json(ExactResult)
   }


   fetchExistEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.fetchexistestimationusecase.execute(req.params.id)
      res.status(HTTP_STATUS.OK).json(result)
   }


   updateEstimation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.updateEstimationUsecase.execute(req.body)
      res.status(result.status_code).json(result)
   }
}