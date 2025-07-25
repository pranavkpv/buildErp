import { NextFunction, Request, Response } from "express"

export interface IMaterialControllerEntity {
   materialList(req: Request, res: Response, next: NextFunction): Promise<void>
   addMaterialList(req: Request, res: Response, next: NextFunction): Promise<void>
   saveMaterial(req: Request, res: Response, next: NextFunction): Promise<void>
   editMaterialList(req: Request, res: Response, next: NextFunction): Promise<void>
   updateMaterial(req: Request, res: Response, next: NextFunction): Promise<void>
   removeMaterial(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchUniqueMaterial(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchMaterialByUnit(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchBrandbyName(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchUnitrate(req: Request, res: Response, next: NextFunction): Promise<void>
   getMaterial(req: Request, res: Response, next: NextFunction): Promise<void>
}