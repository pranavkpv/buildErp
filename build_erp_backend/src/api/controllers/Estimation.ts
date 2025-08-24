import { NextFunction, Request, Response } from "express"
import cloudinary from "../../infrastructure/config/cloudinary"
import { IEstimationController } from "../../domain/Entities/Controller.Entity/IEstimation"
import { ISaveEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/SaveEstimationEntity"
import { IDisplayEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity"
import { IDeleteEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/DeleteEstimationEntity"
import { IUploadEstimateImageUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/UploadEstimateImageEntity"
import { IUpdateEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity"
import { commonOutput } from "../../application/dto/common"
import { listEstimationDTO, specListInProjectDTO } from "../../application/dto/estimation.dto"
import { IFetchSpecListUsingEstimationUsecase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/IFetchSpecListUsingEstimationUsecase"



export class EstimationController implements IEstimationController {

   constructor(
      private _saveEstimationUseCase: ISaveEstimationUseCase,
      private _deleteEstimationUseCase: IDeleteEstimationUseCase,
      private _updateEstimationUseCase: IUpdateEstimationUseCase,
      private _displayEstimationUseCase: IDisplayEstimationUseCase,
      private _uploadEstimationUseCase: IUploadEstimateImageUseCase,
      private _fetchSpecListUsingEstimationUseCase: IFetchSpecListUsingEstimationUsecase,
   ) { }

   // Create a new estimation
   createEstimation = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._saveEstimationUseCase.execute(req.body);
         return result;
      } catch (error) {
         next(error);
      }
   }

   // Delete an estimation by ID
   removeEstimation = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._deleteEstimationUseCase.execute(req.params.id);
         return result;
      } catch (error) {
         next(error);
      }
   }

   // Update an estimation
   modifyEstimation = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._updateEstimationUseCase.execute(req.body);
         return result;
      } catch (error) {
         next(error);
      }
   }
   // Fetch all estimations with search and pagination
   getAllEstimations = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listEstimationDTO[], totalPage: number }> | commonOutput | void> => {
      try {
         const { search, page } = req.query;
         const result = await this._displayEstimationUseCase.axecute(String(search), Number(page));
         return result;
      } catch (error) {
         next(error);
      }
   }



   // Upload estimation image to Cloudinary
   uploadEstimationImage = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const file = req.files?.image;
         const projectId = req.body._id;

         if (!file || Array.isArray(file)) {
            return;
         }

         const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Estimation"
         });

         const result = await this._uploadEstimationUseCase.execute(uploadedImage.secure_url, projectId);
         return result;
      } catch (error) {
         next(error);
      }
   }

   // Fetch specification list for a given estimation
   getSpecListByEstimation = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<specListInProjectDTO[]> | void> => {
      try {
         const data = await this._fetchSpecListUsingEstimationUseCase.execute(req.params.id);
         return data;
      } catch (error) {
         next(error);
      }
   }

}