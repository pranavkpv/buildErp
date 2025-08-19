import { NextFunction, Request, Response } from "express"
import {  materialOutput, outEditMaterialData } from "../../../../application/dto/MaterialEntities/material";
import { commonOutput } from "../../../../application/dto/CommonEntities/common";


export interface IMaterialControllerEntity {
   materialList(req: Request, res: Response, next: NextFunction):Promise<materialOutput | commonOutput>
   addMaterialList(req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput>
   saveMaterial(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   editMaterialList(req: Request, res: Response, next: NextFunction):Promise<materialOutput | commonOutput>
   updateMaterial(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeMaterial(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchUniqueMaterial(req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput>
   fetchMaterialByUnit(req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput>
   fetchBrandbyName(req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput>
   fetchUnitrate(req: Request, res: Response, next: NextFunction): Promise<materialOutput |commonOutput>
   getMaterial(req: Request, res: Response, next: NextFunction): Promise<materialOutput | commonOutput>
}