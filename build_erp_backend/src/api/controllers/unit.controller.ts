import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../application/dto/common";
import { IUnitController } from "../../domain/Entities/ControllerEntities/IUnit.controller";
import { ISaveUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/SaveUnitEntity";
import { IdeleteUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/DeleteUnitEntity";
import { IFetchUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/FetchUnitEntity";
import { IupdateUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/UpdateUnitEntity";
import { idUnitnameDTO, listUnitDTO } from "../../application/dto/unit.dto";
import { IDisplayAllUnitUseCase } from "../../application/interfaces/Unit.Usecase.Entities/DisplayAllUnitEntity";

export class unitController implements IUnitController {
   constructor(
      private _addUnitUseCase: ISaveUnitUseCase,
      private _deleteUnitUseCase: IdeleteUnitUseCase,
      private _fetchUnitUsecasedata: IFetchUnitUseCase,
      private _editUnitUseCase: IupdateUnitUseCase,
      private _displayUnitUseCase: IDisplayAllUnitUseCase
   ) { }
   addUnitHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      return await this._addUnitUseCase.execute(req.body);
   }
   removeUnitHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id;
      return await this._deleteUnitUseCase.execute(String(_id));
   };
   displayAllUnitHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<idUnitnameDTO[]>>=> {
      const data = await this._fetchUnitUsecasedata.execute();
      return data;
   };

   editUnitHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const { id } = req.params;
      return await this._editUnitUseCase.execute({ _id: id, ...req.body });
   };


   getUnitHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:listUnitDTO[],totalPage:number}>> => {
      const { page, search } = req.query;
      return await this._displayUnitUseCase.execute({page:Number(page), search:String(search)});
   };
}











