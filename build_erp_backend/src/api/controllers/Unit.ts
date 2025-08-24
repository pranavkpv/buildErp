import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../application/dto/common";
import { IUnitController } from "../../domain/Entities/Controller.Entity/IUnit";
import { ISaveUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/SaveUnitEntity";
import { IdeleteUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/DeleteUnitEntity";
import { IFetchUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/FetchUnitEntity";
import { IupdateUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/UpdateUnitEntity";
import { idUnitnameDTO, listUnitDTO } from "../../application/dto/unit.dto";
import { IDisplayAllUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/DisplayAllUnitEntity";

export class UnitController implements IUnitController {
   constructor(
      private _addUnitUseCase: ISaveUnitUseCase,
      private _deleteUnitUseCase: IdeleteUnitUseCase,
      private _fetchUnitUseCase: IFetchUnitUseCase,
      private _updateUnitUseCase: IupdateUnitUseCase,
      private _displayUnitUseCase: IDisplayAllUnitUseCase
   ) { }

   // Add a new unit
   createUnit = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         return await this._addUnitUseCase.execute(req.body);
      } catch (error) {
         next(error);
      }
   };

   // Delete an existing unit by ID
   deleteUnit = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         return await this._deleteUnitUseCase.execute(String(_id));
      } catch (error) {
         next(error);
      }
   };

   // Fetch all units (id & name)
   fetchAllUnits = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<idUnitnameDTO[]> | void> => {
      try {
         const data = await this._fetchUnitUseCase.execute();
         return data;
      } catch (error) {
         next(error);
      }
   };

   // Update unit details by ID
   updateUnit = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const { id } = req.params;
         return await this._updateUnitUseCase.execute({ _id: id, ...req.body });
      } catch (error) {
         next(error);
      }
   };

   // Get units with pagination & search
   getUnits = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listUnitDTO[]; totalPage: number }> | void> => {
      try {
         const { page, search } = req.query;
         return await this._displayUnitUseCase.execute({
            page: Number(page),
            search: String(search),
         });
      } catch (error) {
         next(error);
      }
   };
}
