import { NextFunction, Request, Response } from "express"
import cloudinary from "../../infrastructure/config/cloudinary"
import { IEstimationController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/IEstimationControllerEntity"
import { ISaveEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/SaveEstimationEntity"
import { IDisplayEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity"
import { IDeleteEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/DeleteEstimationEntity"
import { IUploadEstimateImageUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/UploadEstimateImageEntity"
import { IUpdateEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity"
import { commonOutput } from "../../application/dto/common"
import { listEstimationDTO } from "../../application/dto/estimation.dto"



export class EstimationController implements IEstimationController {

   constructor(
      private _saveestimationuseCase: ISaveEstimationUseCase,
      private _deleteEstimationuseCase: IDeleteEstimationUseCase,
      private _updateEstimationUsecase: IUpdateEstimationUseCase,
      private _displayEstimationUseCase: IDisplayEstimationUseCase,
      private _uploadestimationUsecase: IUploadEstimateImageUseCase,

      private fetchexistestimationusecase: IFetchExistEstimationUseCaseEntity,
     ) { }

   //------------------------------------ Save Estimation ------------------------------------//

   SaveEstimation = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._saveestimationuseCase.execute(req.body)
      return result
   }

   //------------------------------------ Delete Estimation ------------------------------------//

   deleteEstimation = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._deleteEstimationuseCase.execute(req.params.id)
      return result
   }

   
   //------------------------------------ Update estimation ------------------------------------//

   updateEstimation = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._updateEstimationUsecase.execute(req.body)
      return result
   }


   //------------------------------------ List Estimation with search and pagination ------------------------------------//

   fetchEstimation = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:listEstimationDTO[],totalPage:number}> | commonOutput> => {
      const { search, page } = req.query
      const result = await this._displayEstimationUseCase.axecute(String(search), Number(page))
      return result
   }



   //------------------------------------ Upload estimation image ------------------------------------//

   uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      const file = req.files?.image;
      const projectId = req.body._id;
      if (!file || Array.isArray(file)) {
         return
      }
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "Estimation"
      })
      const ExactResult = await this._uploadestimationUsecase.execute(result.secure_url, projectId)
      return ExactResult
   }

}