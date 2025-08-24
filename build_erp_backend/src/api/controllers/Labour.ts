import { NextFunction, Request, Response } from "express";
import { IAddLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity";
import { IDisplayAllLabourUsecase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity";
import { IUpdateLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity";
import { IDeleteLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity";
import { IFetchAllLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity";
import { IFetchLabourByIdUsecaseEntity } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity";
import { ILabourController } from "../../domain/Entities/Controller.Entity/ILabour";
import { commonOutput } from "../../application/dto/common";
import { labourDataDisplayDTO } from "../../application/dto/labour.dto";

export class LabourController implements ILabourController {
   constructor(
      private _displayAllLabourUseCase: IDisplayAllLabourUsecase,
      private _addLabourUseCase: IAddLabourUseCase,
      private _updateLabourUseCase: IUpdateLabourUseCase,
      private _deleteLabourUseCase: IDeleteLabourUseCase,
      private _fetchAllLabourUseCase: IFetchAllLabourUseCase,
      private _fetchLabourByIdUseCase: IFetchLabourByIdUsecaseEntity
   ) { }

   // Fetch paginated list of labour with search filter
   getPaginatedLabourList = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: labourDataDisplayDTO[]; totalPage: number }> | commonOutput | void> => {
      try {
         const { page, search } = req.query;
         const result = await this._displayAllLabourUseCase.execute(Number(page), String(search));
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Create a new labour record
   createLabour = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._addLabourUseCase.execute(req.body);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Delete a labour record by ID
   deleteLabour = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._deleteLabourUseCase.execute(req.params.id);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Update an existing labour record
   updateLabour = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._updateLabourUseCase.execute({ _id: req.params.id, ...req.body });
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch all labour records without pagination
   getAllLabourList = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<labourDataDisplayDTO[]> | commonOutput | void> => {
      try {
         const result = await this._fetchAllLabourUseCase.execute();
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Fetch a single labour record by ID
   getLabourById = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<labourDataDisplayDTO> | commonOutput | void> => {
      try {
         const { id } = req.params;
         const result = await this._fetchLabourByIdUseCase.execute(id);
         return result;
      } catch (error) {
         next(error);
      }
   };
}
