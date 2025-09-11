import { NextFunction, Request, Response } from 'express';
import { IProjectController } from '../../domain/Entities/IController/IProject';
import { IDisplayAllProjectUseCase } from '../../application/IUseCases/IProject/IDisplayAllProject';
import { IDisplayAddProjectUseCase } from '../../application/IUseCases/IProject/IDisplayAddProject';
import { IAddProjectUseCase } from '../../application/IUseCases/IProject/IAddProject';
import { IEditProjectUseCase } from '../../application/IUseCases/IProject/IEditProject';
import { IDeleteProjectUseCase } from '../../application/IUseCases/IProject/IDeleteProject';
import { IChangeStatusUseCase } from '../../application/IUseCases/IProject/IChangeStatus';
import { IFetchProjectUseCase } from '../../application/IUseCases/IProject/IFetchProject';
import { displayProjectDTO, displayProjectWithCompletionDTO, displayStatusCountDTO, fetchProjectIdnameDTO } from '../../application/dto/project.dto';
import { commonOutput } from '../../application/dto/common';
import { IAddSiteToprojectFetchProjectUseCase } from '../../application/IUseCases/ISitemanager/IAddSiteToProjectFetchProject';
import { userLoginDTO } from '../../application/dto/user.dto';
import { IFetchProjectCountandStatusUseCase } from '../../application/IUseCases/IProject/IFetchProjectCountandStatus';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { IfetchProjectWithCompletionUseCase } from '../../application/IUseCases/IProject/IfetchProjectWithCompletion';

export class ProjectController implements IProjectController {
    constructor(
        private _fetchProjectUseCase: IFetchProjectUseCase,
        private _addSiteToProjectFetchProjectUseCase: IAddSiteToprojectFetchProjectUseCase,
        private _displayAddProjectUseCase: IDisplayAddProjectUseCase,
        private _addProjectUseCase: IAddProjectUseCase,
        private _deleteProjectUseCase: IDeleteProjectUseCase,
        private _editProjectUseCase: IEditProjectUseCase,
        private _displayProjectUseCase: IDisplayAllProjectUseCase,
        private _changeStatusUseCase: IChangeStatusUseCase,
        private _fetchProjectCountandStatus: IFetchProjectCountandStatusUseCase,
        private _jwtservice: IJwtService,
        private _fetchProjectwithCompletionUseCase:IfetchProjectWithCompletionUseCase,
    ) { }

    //  Fetch projects available for assigning site managers
    getProjectsForSiteManager = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void> => {
        try {
            const result = await this._addSiteToProjectFetchProjectUseCase.execute();
            return result;
        } catch (error) {
            return next(error);
        }
    };

    //  Fetch all projects
    getAllProjects = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void> => {
        try {
            const result = await this._fetchProjectUseCase.execute();
            return result;
        } catch (error) {
            return next(error);
        }
    };

    // Fetch paginated & searchable project list
    getPaginatedProjects = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: displayProjectDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { page, search } = req.query;
            const result = await this._displayProjectUseCase.execute({ page: Number(page), search: String(search) });
            return result;
        } catch (error) {
            return next(error);
        }
    };

    //  Fetch data needed before adding a project (e.g., user list)
    getAddProjectData = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<userLoginDTO[]> | commonOutput | void> => {
        try {
            const result = await this._displayAddProjectUseCase.execute();
            return result;
        } catch (error) {
            return next(error);
        }
    };

    // Save new project
    createProject = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._addProjectUseCase.execute(req.body);
            return result;
        } catch (error) {
            return next(error);
        }
    };

    // Update existing project
    updateProject = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._editProjectUseCase.execute({ _id: req.params.id, ...req.body });
            return result;
        } catch (error) {
            return next(error);
        }
    };

    // Delete a project
    deleteProject = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._deleteProjectUseCase.execute(req.params.id);
            return result;
        } catch (error) {
            return next(error);
        }
    };

    // Change project status (active/inactive)
    changeProjectStatus = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._changeStatusUseCase.execute(req.params.id, req.body.status);
            return result;
        } catch (error) {
            return next(error);
        }
    };

    fetchAllProjectwithStatusAndcount = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<displayStatusCountDTO[]> | commonOutput | void> => {
        try {
            const result = await this._fetchProjectCountandStatus.execute();
            return result;
        } catch (error) {
            next(error);
        }
    };
    getSitemanagersProjectsWithCompletion = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{data:displayProjectWithCompletionDTO[],totalPages:number}> | void> => {
        try {
            const header = req.headers.authorization?.split(' ')[1];
            if (!header) {
                return;
            }
            const payload = await this._jwtservice.verifyAccessToken(header);
            if (!payload) {
                return;
            }
            const { page,search } = req.query;
            const result = await this._fetchProjectwithCompletionUseCase.execute(payload._id,Number(page),String(search));
            return result;
        } catch (error) {
            next(error);
        }
    };
}
