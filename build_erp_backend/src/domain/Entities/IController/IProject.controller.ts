import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { displayProjectDTO, displayProjectWithCompletionDTO, displayStatusCountDTO, expectedImageDTO, fetchProjectIdnameDTO } from '../../../application/dto/project.dto';
import { userLoginDTO } from '../../../application/dto/user.dto';


export interface IProjectController {

   getProjectsForSiteManager(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void>

   getAllProjects(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void>

   getPaginatedProjects(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: displayProjectDTO[], totalPage: number }> | commonOutput | void>

   getAddProjectData(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<userLoginDTO[]> | commonOutput | void>

   createProject(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string> | commonOutput | void>

   updateProject(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteProject(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   changeProjectStatus(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   fetchAllProjectwithStatusAndcount(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<displayStatusCountDTO[]> | commonOutput | void>

   getSitemanagersProjectsWithCompletion(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: displayProjectWithCompletionDTO[], totalPages: number }> | void>

   getPendingProjects(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | void>

   getExpectedImage(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<expectedImageDTO[]> | commonOutput | void>

}