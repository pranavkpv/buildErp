import { Request, Response, NextFunction } from 'express';
import { commonOutput } from '../../application/dto/common';
import { IBannerController } from '../../domain/Entities/IController/IBanner.controller';
import cloudinary from '../../infrastructure/config/cloudinary';
import { IAddBannerUsecase } from '../../application/IUseCases/IBanner/IAddBanner';
import { listBannerDTO } from '../../application/dto/banner.dto';
import { IListBannerUseCase } from '../../application/IUseCases/IBanner/IListBanner';
import { IEditBannerUseCase } from '../../application/IUseCases/IBanner/IEditBanner';
import { IDeleteBannerUsecase } from '../../application/IUseCases/IBanner/IDeleteBanner';
import { IFetchAllBannerUseCase } from '../../application/IUseCases/IBanner/IFetchAllBanner';

export class BannerController implements IBannerController {
    constructor(
      private _addBannerUseCase: IAddBannerUsecase,
      private _listBannerUseCase: IListBannerUseCase,
      private _editBannerUseCase: IEditBannerUseCase,
      private _deleteBannerUsecase: IDeleteBannerUsecase,
       private _fetchAllBannerUseCase : IFetchAllBannerUseCase,
    ) { }
    addBanner = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const file = req.files?.image;

            if (!file || Array.isArray(file)) {
                return;
            }

            const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Banner',
            });
            return await this._addBannerUseCase.execute({ image: uploadedImage.secure_url, ...req.body });
        } catch (error) {
            next(error);
        }
    };


    getBanner = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listBannerDTO[]; totalPage: number; }> | void> => {
        try {
            const { page, search } = req.query;
            const data = await this._listBannerUseCase.execute({ page: Number(page), search: String(search) });
            return data;
        } catch (error) {
            next(error);
        }
    };


    editBanner = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            console.log(req.files);
            console.log(req.body);
            console.log(req.params);
            const _id = req.params.id;
            const file = req.files?.image;

            if (!file || Array.isArray(file)) {
                return await this._editBannerUseCase.execute({ _id, image: '', ...req.body });
            }

            const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Banner',
            });
            return await this._editBannerUseCase.execute({ _id, image: uploadedImage.secure_url, ...req.body });
        } catch (error) {
            next(error);
        }
    };
    deleteBanner = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
        try {
            const result = await this._deleteBannerUsecase.execute(req.params.id);
            return result;
        } catch (error) {
            next(error);
        }
    };
    fetchAllBanner = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<listBannerDTO[]> | commonOutput | void> => {
        try {
            const result = await this._fetchAllBannerUseCase.execute();
            return result;
        } catch (error) {
            next(error);
        }
    };
}
