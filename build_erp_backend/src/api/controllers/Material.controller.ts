import { NextFunction, Request, Response } from 'express';
import { IMaterialController } from '../../domain/Entities/IController/IMaterial.controller';
import { IDisplayAllMaterialUsecase } from '../../application/IUseCases/IMaterial/IDisplayAllMaterial';
import { IAddMaterialUseCase } from '../../application/IUseCases/IMaterial/IAddMaterial';
import { IGetEditMaterialUseCase } from '../../application/IUseCases/IMaterial/IGetEditMaterial';
import { IDisplayAddMaterialUseCase } from '../../application/IUseCases/IMaterial/IDisplayAddMaterial';
import { IUpdateMaterialUseCase } from '../../application/IUseCases/IMaterial/IUpdateMaterial';
import { IDeleteMaterialUseCase } from '../../application/IUseCases/IMaterial/IDeleteMaterial';
import { IFetchMaterialUseCase } from '../../application/IUseCases/IMaterial/FetchMaterialEntity';
import { IFetchMaterialByMaterialNameUsecase } from '../../application/IUseCases/IMaterial/IFetchUnitByMaterialname';
import { IFetchBrandByMaterialNameUsecase } from '../../application/IUseCases/IMaterial/IFetchBrandByMaterialname';
import { IFetchUnitRateUseCase } from '../../application/IUseCases/IMaterial/IFetchUnitRate';
import { IFindMaterialByIdUsecase } from '../../application/IUseCases/IMaterial/IFindMaterialById';
import { addMaterialFetch, editMaterialFullDatafetch } from '../../application/entities/material.entity';
import { commonOutput } from '../../application/dto/common';
import { EditmaterialDetailsDTO, EditprojectDetailsDTO, listingMaterialDTO, stockDTO, unitRateDTO } from '../../application/dto/material.dto';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { IGetStockOfMaterialUseCase } from '../../application/IUseCases/IMaterial/IGetStockOfMaterial';

export class MaterialController implements IMaterialController {
    constructor(
        private _displayAllMaterialUseCase: IDisplayAllMaterialUsecase,
        private _getAddMaterialUseCase: IDisplayAddMaterialUseCase,
        private _saveMaterialUseCase: IAddMaterialUseCase,
        private _getEditMaterialUseCase: IGetEditMaterialUseCase,
        private _updateMaterialUseCase: IUpdateMaterialUseCase,
        private _deleteMaterialUseCase: IDeleteMaterialUseCase,
        private _fetchMaterialUseCase: IFetchMaterialUseCase,
        private _fetchMaterialByMaterialName: IFetchMaterialByMaterialNameUsecase,
        private _fetchbrandBynameusecase: IFetchBrandByMaterialNameUsecase,
        private _fetUnitRateUseCase: IFetchUnitRateUseCase,
        private _findMaterialByIdUsecase: IFindMaterialByIdUsecase,
        private _jwtService: IJwtService,
        private _getStockOfMaterialUseCase: IGetStockOfMaterialUseCase,
    ) { }

    // Fetch paginated material list with search filter
    getPaginatedMaterialList = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: listingMaterialDTO[]; totalPage: number }> | commonOutput | void> => {
        try {
            const { page, search } = req.query;
            const result = await this._displayAllMaterialUseCase.execute({ page: Number(page), search: String(search) });
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch supporting data (category, brand, unit, project) for material creation
    getAddMaterialDependencies = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<addMaterialFetch> | commonOutput | void> => {
        try {
            const result = await this._getAddMaterialUseCase.execute();
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Create a new material
    createMaterial = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._saveMaterialUseCase.execute(req.body);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch supporting data (category, brand, unit, project) for material editing
    getEditMaterialDependencies = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ materialData: EditmaterialDetailsDTO; projectStockData: EditprojectDetailsDTO[] }> | commonOutput | void> => {
        try {
            const { id } = req.params;
            const result = await this._getEditMaterialUseCase.execute(id);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Update an existing material
    updateMaterial = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const result = await this._updateMaterialUseCase.execute({ _id, ...req.body });
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Delete a material by ID
    deleteMaterial = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._deleteMaterialUseCase.execute(req.params.id);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch unique material names for specification registration
    getUniqueMaterialNames = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<string[]> | void> => {
        try {
            const result = await this._fetchMaterialUseCase.execute();
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch unit list based on material name
    getUnitsByMaterialName = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<string[]> | void> => {
        try {
            const materialName = req.params.material;
            const result = await this._fetchMaterialByMaterialName.execute(materialName);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch brand list based on material name
    getBrandsByMaterialName = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<string[]> | void> => {
        try {
            const materialName = req.params.material;
            const result = await this._fetchbrandBynameusecase.execute(materialName);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch unit rate of a material by material, brand, and unit name
    getUnitRate = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<unitRateDTO> | void> => {
        try {
            const { material_name, brand_name, unit_name } = req.query;
            const result = await this._fetUnitRateUseCase.execute({
                material_name: String(material_name),
                brand_name: String(brand_name),
                unit_name: String(unit_name),
            });
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch a single material by ID
    getMaterialById = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<editMaterialFullDatafetch | null> | void> => {
        try {
            const { id } = req.params;
            const result = await this._findMaterialByIdUsecase.execute(id);
            return result;
        } catch (error) {
            next(error);
        }
    };
    fetchStock = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: stockDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { projectId, material, page } = req.query;
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];

            if (!accessToken) {
                return ResponseHelper.unAuthor();
            }

            const payload = await this._jwtService.verifyAccessToken(accessToken);
            if (!payload) {
                return ResponseHelper.unAuthor();
            }
            const result = await this._getStockOfMaterialUseCase.execute(String(projectId), String(material), Number(page), payload._id);
            return result;
        } catch (error) {
            next(error);
        }
    };
}
