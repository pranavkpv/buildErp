import { NextFunction, Request, Response } from "express";
import { IBrandController } from "../../../domain/Entities/ControllerEntities/IBrand.controller";
import { commonOutput } from "../../../application/dto/common";
import { ISaveBrandUseCase } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/SaveBrandEntity";
import { IDeleteBrandUsecase } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/DeleteBrandEntity";
import { IDisplayAllBrandUseCase } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/DisplayAllBrandEntity";
import { IUpdateBrandUseCase } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/UpdateBrandEntity";
import { idBrandnameDTO } from "../../../application/dto/brand.dto";

export class BrandController implements IBrandController {
   constructor(
      private _addBrandUseCase: ISaveBrandUseCase,
      private _deleteBrandUseCase: IDeleteBrandUsecase,
      private _displayBrandUseCase: IDisplayAllBrandUseCase,
      private _editBrandUseCase: IUpdateBrandUseCase
   ) { }
   addBrandHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      return await this._addBrandUseCase.execute(req.body.brand_name);
   }
   removeBrandHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      return await this._deleteBrandUseCase.execute(req.params.id);
   }
   brandListHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: idBrandnameDTO[], totalPage: number }>> => {
      const { page, search } = req.query;
      return await this._displayBrandUseCase.execute({ page: Number(page), search: String(search) });
   }
   editBrandHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      return await this._editBrandUseCase.execute(req.params.id, req.body.brand_name);

   }
}