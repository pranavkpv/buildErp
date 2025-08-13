import { NextFunction, Request, Response } from "express"
import cloudinary from "../../../../config/cloudinary"
import { IEstimationControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IEstimationControllerEntity"
import { ISaveEstimationUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/SaveEstimationEntity"
import { IDisplayEstimationUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity"
import { IDeleteEstimationUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DeleteEstimationEntity"
import { IFetchExistEstimationUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/FetchExistEstimationEntity"
import { IUploadEstimateImageUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UploadEstimateImageEntity"
import { IUpdateEstimationUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"
import { commonOutput } from "../../../../DTO/CommonEntities/common"
import {  estimationOutput } from "../../../../DTO/EstimationEntities/estimation"
import { EstimationFailedMessage } from "../../../../Shared/Messages/Estimation.Message"



export class EstimationController implements IEstimationControllerEntity {
   private saveestimationuseCase: ISaveEstimationUseCaseEntity
   private displayEstimationUseCase: IDisplayEstimationUseCaseEntity
   private deleteEstimationuseCase: IDeleteEstimationUseCaseEntity
   private uploadestimationUsecase: IUploadEstimateImageUseCaseEntity
   private fetchexistestimationusecase: IFetchExistEstimationUseCaseEntity
   private updateEstimationUsecase: IUpdateEstimationUseCaseEntity
   constructor(saveestimationuseCase: ISaveEstimationUseCaseEntity, displayEstimationUseCase: IDisplayEstimationUseCaseEntity,
      deleteEstimationuseCase: IDeleteEstimationUseCaseEntity, uploadestimationUsecase: IUploadEstimateImageUseCaseEntity,
      fetchexistestimationusecase: IFetchExistEstimationUseCaseEntity, updateEstimationUsecase: IUpdateEstimationUseCaseEntity) {
      this.saveestimationuseCase = saveestimationuseCase
      this.displayEstimationUseCase = displayEstimationUseCase,
         this.deleteEstimationuseCase = deleteEstimationuseCase
      this.uploadestimationUsecase = uploadestimationUsecase
      this.fetchexistestimationusecase = fetchexistestimationusecase
      this.updateEstimationUsecase = updateEstimationUsecase
   }

   //------------------------------------ Save Estimation ------------------------------------//

   SaveEstimation = async (req: Request, res: Response, next: NextFunction):Promise<commonOutput>  => {
      const result = await this.saveestimationuseCase.execute(req.body)
      return result
   }


   //------------------------------------ List Estimation with search and pagination ------------------------------------//

   fetchEstimation = async (req: Request, res: Response, next: NextFunction):Promise<estimationOutput | commonOutput> => {
      const { search, page } = req.query
      const result = await this.displayEstimationUseCase.axecute(String(search), Number(page))
      return result
   }

   //------------------------------------ Delete Estimation ------------------------------------//

   deleteEstimation = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.deleteEstimationuseCase.execute(req.params.id)
      return result
   }

   //------------------------------------ Upload estimation image ------------------------------------//

   uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      const file = req.files?.image;
      const projectId = req.body._id;
      if (!file || Array.isArray(file)) {
         res.status(HTTP_STATUS.OK).json({ error: EstimationFailedMessage.IMAGE_ADD });
         return
      }
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "Estimation"
      })
      const ExactResult = await this.uploadestimationUsecase.execute(result.secure_url, projectId)
      return ExactResult
   }

   //------------------------------------ List all estimation data ------------------------------------//

   fetchExistEstimation = async (req: Request, res: Response, next: NextFunction): Promise <estimationOutput | commonOutput> => {
      const result = await this.fetchexistestimationusecase.execute(req.params.id)
      return result
   }


   //------------------------------------ Update estimation ------------------------------------//

   updateEstimation = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.updateEstimationUsecase.execute(req.body)
      return result
   }

}