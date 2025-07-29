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
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { EstimationData, estimationOutput, SpecData } from "../../../../Entities/Input-OutputEntities/EstimationEntities/estimation"
import { specOutput } from "../../../../Entities/Input-OutputEntities/EstimationEntities/specification"


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
         res.status(HTTP_STATUS.OK).json({ error: ERROR_MESSAGE.ESTIMATION.NO_IMAGE });
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