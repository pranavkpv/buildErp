import { Request, Response, NextFunction } from "express";
import { IReceiveController } from "../../domain/Entities/Controller.Entity/IReceive";
import { ISaveReceiveUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import { IGetReceiveUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";
import { IUpdateReceiveUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/UpdateRecieveUseCaseEntity";
import { IDeleteReceiveUsecaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/DeleteReceiveUseCaseEntity";
import { IApproveReceiveUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/ApproveReceiveUseCaseEntity";
import { commonOutput } from "../../application/dto/common";
import { RecieveOutput } from "../../application/dto/receive.dto";

export class ReceiveController implements IReceiveController {

   constructor(
      private _saveReceiveUseCase: ISaveReceiveUseCaseEntity,
      private _getReceiveUseCase: IGetReceiveUseCaseEntity,
      private _updateReceiveUseCase: IUpdateReceiveUseCaseEntity,
      private _deleteReceiveUseCase: IDeleteReceiveUsecaseEntity,
      private _approveReceiveUseCase: IApproveReceiveUseCaseEntity
   ) { }

   // Save a new receive entry
   saveReceive = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const response = await this._saveReceiveUseCase.execute(req.body);
         return response;
      } catch (error) {
         return next(error);
      }
   }

   // Get receive entries with pagination and search
   getReceive = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: RecieveOutput[], totalPage: number }> | commonOutput | void> => {
      try {
         const { search, page } = req.query;
         const response = await this._getReceiveUseCase.execute(String(search), Number(page));
         return response;
      } catch (error) {
         return next(error);
      }
   }

   // Update a receive entry by ID
   updateReceive = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         const response = await this._updateReceiveUseCase.execute({ _id, ...req.body });
         return response;
      } catch (error) {
         return next(error);
      }
   }

   // Delete a receive entry by ID
   deleteReceive = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         const response = await this._deleteReceiveUseCase.execute(_id);
         return response;
      } catch (error) {
         return next(error);
      }
   }

   // Approve a receive entry
   approveReceive = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         const project_id = req.body.data.approveData.project_id;
         const materialDetails = req.body.data.approveData.materialData.map((element: any) => ({
            material_id: element.material_id as string,
            quantity: element.quantity as number,
            unit_rate: element.unit_rate as number
         }));

         const response = await this._approveReceiveUseCase.execute(_id, project_id, materialDetails);
         return response;
      } catch (error) {
         return next(error);
      }
   }
}
