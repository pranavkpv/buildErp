import { NextFunction, Request, Response } from 'express';
import cloudinary from '../../infrastructure/config/cloudinary';
import { IEstimationController } from '../../domain/Entities/IController/IEstimation';
import { ISaveEstimationUseCase } from '../../application/IUseCases/IEstimation/ISaveEstimation';
import { IDisplayEstimationUseCase } from '../../application/IUseCases/IEstimation/IDisplayEstimation';
import { ISendEstimationUseCase } from '../../application/IUseCases/IEstimation/IDeleteEstimation';
import { IUploadEstimateImageUseCase } from '../../application/IUseCases/IEstimation/IUploadEstimateImage';
import { IUpdateEstimationUseCase } from '../../application/IUseCases/IEstimation/IUpdateEstimation';
import { commonOutput } from '../../application/dto/common';
import { additionEstimateDTO, estimateByProjectDTO, estimationImageDTO, labourEstimateDTO, listEstimationDTO, materialEstimateDTO, specListInProjectDTO } from '../../application/dto/estimation.dto';
import { IFetchSpecListUsingEstimationUsecase } from '../../application/IUseCases/IEstimation/IFetchSpecListUsingEstimation';
import { IGetEstimationByProjectUsecase } from '../../application/IUseCases/IEstimation/IGetEstimationByProject';
import { IGetMaterialEstimationUseCase } from '../../application/IUseCases/IEstimation/IGetMaterialEstimation';
import { IGetAdditionEstimationUseCase } from '../../application/IUseCases/IEstimation/IGetAdditionEstimation';
import { IGetLabourEstimationUseCase } from '../../application/IUseCases/IEstimation/IGetLabourEstimation';
import { IRejectEstimationUseCase } from '../../application/IUseCases/IEstimation/IRejectEstimation';
import { IApproveEstimationUseCase } from '../../application/IUseCases/IEstimation/IApproveEstimation';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { EstimationFailedMessage } from '../../Shared/Messages/Estimation.Message';
import { IGetEstimationImageUsecase } from '../../application/IUseCases/IEstimation/IGetEstimationImage';



export class EstimationController implements IEstimationController {

    constructor(
        private _saveEstimationUseCase: ISaveEstimationUseCase,
        private _sendEstimationUseCase: ISendEstimationUseCase,
        private _updateEstimationUseCase: IUpdateEstimationUseCase,
        private _displayEstimationUseCase: IDisplayEstimationUseCase,
        private _uploadEstimationUseCase: IUploadEstimateImageUseCase,
        private _fetchSpecListUsingEstimationUseCase: IFetchSpecListUsingEstimationUsecase,
        private _getEstimationByProjectUsecase: IGetEstimationByProjectUsecase,
        private _getMaterialEstimationUseCase: IGetMaterialEstimationUseCase,
        private _getAdditionEstimationUseCase: IGetAdditionEstimationUseCase,
        private _getLabourEstimationUseCase: IGetLabourEstimationUseCase,
        private _rejectEstimationUseCase: IRejectEstimationUseCase,
        private _approveEstimationUseCase: IApproveEstimationUseCase,
        private _getEstimationImageUseCase: IGetEstimationImageUsecase,
    ) { }

    // Create a new estimation
    createEstimation = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._saveEstimationUseCase.execute(req.body);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Delete an estimation by ID
    sendEstimation = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._sendEstimationUseCase.execute(req.params.id);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Update an estimation
    modifyEstimation = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            console.log();
            const result = await this._updateEstimationUseCase.execute(req.body);
            return result;
        } catch (error) {
            next(error);
        }
    };
    // Fetch all estimations with search and pagination
    getAllEstimations = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: listEstimationDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search, page } = req.query;
            const result = await this._displayEstimationUseCase.axecute(String(search), Number(page));
            return result;
        } catch (error) {
            next(error);
        }
    };



    // Upload estimation image to Cloudinary
    uploadEstimationImage = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const projectId = req.params.id;
            const files = req.files as any;
            const body = req.body;
            const imageCollection: string[] = [];
            const title = [];
            const finalImage: { title: string, image: string }[] = [];
            for (const key in files) {
                const uploadedImage = await cloudinary.uploader.upload(files[key].tempFilePath, {
                    folder: 'Estimation',
                    type: 'authenticated',
                });
                imageCollection.push(uploadedImage.secure_url);
            }
            for (const element in body) {
                title.push(body[element]);
            }
            if (imageCollection.length !== title.length) {
                return ResponseHelper.badRequest(EstimationFailedMessage.KEEP_SAME);
            }
            for (let i = 0; i < title.length; i++) {
                finalImage.push({ title: title[i], image: imageCollection[i] });
            }

            const result = await this._uploadEstimationUseCase.execute({ expected_image: finalImage, projectId });
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch specification list for a given estimation
    getSpecListByEstimation = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<specListInProjectDTO[]> | void> => {
        try {
            const data = await this._fetchSpecListUsingEstimationUseCase.execute(req.params.id);
            return data;
        } catch (error) {
            next(error);
        }
    };

    getEstimationById = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<estimateByProjectDTO[]> | void> => {
        try {
            const projectId = req.params.id;
            const result = await this._getEstimationByProjectUsecase.execute(projectId);
            return result;
        } catch (error) {
            next(error);
        }
    };
    getMaterialEstimationById = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<materialEstimateDTO[]> | void> => {
        try {
            const projectId = req.params.id;
            const result = await this._getMaterialEstimationUseCase.execute(projectId);
            return result;
        } catch (error) {
            next(error);
        }
    };
    getAdditionEstimationById = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<additionEstimateDTO[]> | void> => {
        try {
            const projectId = req.params.id;
            const result = await this._getAdditionEstimationUseCase.execute(projectId);
            return result;
        } catch (error) {
            next(error);
        }
    };
    getLabourEstimationById = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<labourEstimateDTO[]> | void> => {
        try {
            const projectId = req.params.id;
            const result = await this._getLabourEstimationUseCase.execute(projectId);
            return result;
        } catch (error) {
            next(error);
        }
    };
    rejectEstimation = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const projectId = req.params.id;
            const { reason } = req.body;
            const result = await this._rejectEstimationUseCase.execute({ reason, projectId });
            return result;
        } catch (error) {
            next(error);
        }
    };
    ApproveEstimation = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
        try {
            const projectId = req.params.id;
            const result = await this._approveEstimationUseCase.execute(projectId);
            return result;
        } catch (error) {
            next(error);
        }
    };
    getEstimationImage = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<estimationImageDTO[]> | void> => {
        try {
            const projectId = req.params.id;
            const data = await this._getEstimationImageUseCase.execute(projectId);
            return data;
        } catch (error) {
            next(error);
        }
    };

}