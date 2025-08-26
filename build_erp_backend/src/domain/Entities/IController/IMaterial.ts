import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../application/dto/common";
import { EditmaterialDetailsDTO, EditprojectDetailsDTO, listingMaterialDTO } from "../../../application/dto/material.dto";
import { addMaterialFetch, editMaterialFullDatafetch } from "../../../application/Entities/material.entity";



export interface IMaterialController {

   getPaginatedMaterialList(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listingMaterialDTO[]; totalPage: number }> | commonOutput | void>

   getAddMaterialDependencies(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<addMaterialFetch> | commonOutput | void>

   createMaterial(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getEditMaterialDependencies(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ materialData: EditmaterialDetailsDTO; projectStockData: EditprojectDetailsDTO[] }> | commonOutput | void>

   updateMaterial(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteMaterial(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getUniqueMaterialNames(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string[]> | void>

   getUnitsByMaterialName(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string[]> | void>

   getBrandsByMaterialName(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string[]> | void>

   getUnitRate(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | void>

   getMaterialById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<editMaterialFullDatafetch | null> | void>
      
}