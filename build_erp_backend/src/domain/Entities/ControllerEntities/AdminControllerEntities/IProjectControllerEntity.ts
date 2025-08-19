import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../../application/dto/common"
import { fetchProjectIdnameDTO } from "../../../../application/dto/project.dto"


export interface IProjectController {
   getprojectAddSitemanagerProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput>
   getAllProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput>
   projectData(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
   addProjectdata(req: Request, res: Response, next: NextFunction): Promise<userOutput | commonOutput>
   saveProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   updateProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   projectStatus(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}