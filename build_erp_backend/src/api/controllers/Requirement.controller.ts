import { Request, Response, NextFunction } from 'express';
import { commonOutput } from '../../application/dto/common';
import { IRequirementController } from '../../domain/Entities/IController/IRequirement.controller';
import { ISaveRequirementUseCase } from '../../application/IUseCases/IRquirement/ISaveRequirement';
import { IUpdateEstimationByUseCase } from '../../application/IUseCases/IRquirement/IUpdateEstimationBy';
import { userBaseProjectDTO } from '../../application/dto/project.dto';

export class RequirementController implements IRequirementController {
    constructor(
      private _saveRequirementuseCase: ISaveRequirementUseCase,
      private _updateEstimationByUseCase: IUpdateEstimationByUseCase,
    ) { }
    saveRequirement = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | commonOutput<userBaseProjectDTO> | void> => {
        try {
            const result = await this._saveRequirementuseCase.execute(req.body.input);
            console.log(result);
            return result;
        } catch (error) {
            next(error);
        }
    };
    updateEstimateBy = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | commonOutput<userBaseProjectDTO> | void> => {
        try {
            const projectId = req.params.id;
            const result = await this._updateEstimationByUseCase.execute(projectId);
            return result;
        } catch (error) {
            next(error);
        }
    };
}