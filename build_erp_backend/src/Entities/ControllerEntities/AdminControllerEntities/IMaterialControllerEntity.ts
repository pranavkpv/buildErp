import { NextFunction, Request, Response } from "express"
import { getAddMaterialData, outEditMaterialData } from "../../Input-OutputEntities/MaterialEntities/material";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { IMaterialModelEntity } from "../../ModelEntities/Material.Entity";

export interface IMaterialControllerEntity {
   materialList(req: Request, res: Response, next: NextFunction):Promise<{getMaterialData:any[];totalPage:number } | commonOutput>
   addMaterialList(req: Request, res: Response, next: NextFunction): Promise<getAddMaterialData | commonOutput>
   saveMaterial(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   editMaterialList(req: Request, res: Response, next: NextFunction):Promise<outEditMaterialData | commonOutput>
   updateMaterial(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeMaterial(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchUniqueMaterial(req: Request, res: Response, next: NextFunction): Promise<string[] | commonOutput>
   fetchMaterialByUnit(req: Request, res: Response, next: NextFunction): Promise<string[] | commonOutput>
   fetchBrandbyName(req: Request, res: Response, next: NextFunction): Promise<string[] | commonOutput>
   fetchUnitrate(req: Request, res: Response, next: NextFunction): Promise<IMaterialModelEntity | null |commonOutput>
   getMaterial(req: Request, res: Response, next: NextFunction): Promise<IMaterialModelEntity | null | commonOutput>
}