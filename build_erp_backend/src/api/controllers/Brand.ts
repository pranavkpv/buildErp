import { NextFunction, Request, Response } from "express";
import { IBrandController } from "../../domain/Entities/IController/IBrand";
import { commonOutput } from "../../application/dto/common";
import { ISaveBrandUseCase } from "../../application/IUseCases/IBrand/ISaveBrand";
import { IDeleteBrandUsecase } from "../../application/IUseCases/IBrand/IDeleteBrand";
import { IDisplayAllBrandUseCase } from "../../application/IUseCases/IBrand/IDisplayAllBrand";
import { IUpdateBrandUseCase } from "../../application/IUseCases/IBrand/IUpdateBrand";
import { idBrandnameDTO } from "../../application/dto/brand.dto";

export class BrandController implements IBrandController {
   constructor(
      private _saveBrandUseCase: ISaveBrandUseCase,
      private _deleteBrandUseCase: IDeleteBrandUsecase,
      private _getAllBrandsUseCase: IDisplayAllBrandUseCase,
      private _updateBrandUseCase: IUpdateBrandUseCase
   ) { }

   /** Add a new brand */
   addBrand = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         return await this._saveBrandUseCase.execute(req.body.brand_name);
      } catch (error) {
         next(error);
      }
   }

   /** Delete an existing brand by ID */
   deleteBrand = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         return await this._deleteBrandUseCase.execute(req.params.id);
      } catch (error) {
         next(error);
      }
   }

   /** Get list of all brands with pagination and search */
   getAllBrands = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: idBrandnameDTO[], totalPage: number }> | void> => {
      try {
         const { page, search } = req.query;
         return await this._getAllBrandsUseCase.execute({
            page: Number(page),
            search: String(search)
         });
      } catch (error) {
         next(error);
      }
   }

   /** Update brand name by ID */
   updateBrand = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         return await this._updateBrandUseCase.execute(req.params.id, req.body.brand_name);
      } catch (error) {
         next(error);
      }
   }
}
