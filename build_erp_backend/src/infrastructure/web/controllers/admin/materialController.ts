import { NextFunction, Request, Response } from "express"
import { DisplayAllMaterialUseCase } from "../../../../useCases/admin/Material/DisplayAllMaterialUseCase"
import { DisplayAddMaterialDataUseCase } from "../../../../useCases/admin/Material/DisplayAddMaterialUseCase"
import { AddMaterialUseCase } from "../../../../useCases/admin/Material/AddMaterialUseCase"
import { GetEditMaterialUseCase } from "../../../../useCases/admin/Material/GetEditMaterialUseCase"
import { UpdateMaterialUseCase } from "../../../../useCases/admin/Material/UpdateMaterialUseCase"
import { DeleteMaterialUseCase } from "../../../../useCases/admin/Material/DeleteMaterialUseCase"
import { FetchMaterialUseCase } from "../../../../useCases/admin/Material/FetchMaterialUseCase"
import { FetchMaterialByMaterialName } from "../../../../useCases/admin/Material/FetchmaterialByMaterialName"
import { FetchBrandByMaterialName } from "../../../../useCases/admin/Material/fetchBrandByMaterialName"
import { FetchUnitUseCase } from "../../../../useCases/admin/Unit/FetchUnitUseCase"
import { FetchUnitRateUseCase } from "../../../../useCases/admin/Material/fetChUnitRateUseCase"



export class MaterialController {
   private displayAllMaterialUseCase: DisplayAllMaterialUseCase
   private getAddMaterialUseCase: DisplayAddMaterialDataUseCase
   private saveMaterialUseCase: AddMaterialUseCase
   private getEditMaterialUseCase: GetEditMaterialUseCase
   private updateMaterialUseCase: UpdateMaterialUseCase
   private deleteMaterialUseCase: DeleteMaterialUseCase
   private fetchMaterialUseCase: FetchMaterialUseCase
   private fetchMaterialByMaterialName: FetchMaterialByMaterialName
   private fetchbrandByname: FetchBrandByMaterialName
   private fetUnitRateUseCase : FetchUnitRateUseCase
   constructor(
      displayAllMaterialUseCase: DisplayAllMaterialUseCase,
      getAddMaterialUseCase: DisplayAddMaterialDataUseCase,
      saveMaterialUseCase: AddMaterialUseCase,
      getEditMaterialUseCase: GetEditMaterialUseCase,
      updateMaterialUseCase: UpdateMaterialUseCase,
      deleteMaterialUseCase: DeleteMaterialUseCase,
      fetchMaterialUseCase: FetchMaterialUseCase,
      fetchMaterialByMaterialName: FetchMaterialByMaterialName,
      fetchbrandByname: FetchBrandByMaterialName,
      fetUnitRateUseCase : FetchUnitRateUseCase
   ) {
      this.displayAllMaterialUseCase = displayAllMaterialUseCase
      this.getAddMaterialUseCase = getAddMaterialUseCase
      this.saveMaterialUseCase = saveMaterialUseCase
      this.getEditMaterialUseCase = getEditMaterialUseCase
      this.updateMaterialUseCase = updateMaterialUseCase
      this.deleteMaterialUseCase = deleteMaterialUseCase
      this.fetchMaterialUseCase = fetchMaterialUseCase
      this.fetchMaterialByMaterialName = fetchMaterialByMaterialName
      this.fetchbrandByname = fetchbrandByname
      this.fetUnitRateUseCase = fetUnitRateUseCase
   }

   materialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { page, search } = req.query
         const result = await this.displayAllMaterialUseCase.execute(Number(page), String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.getAddMaterialUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   saveMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.saveMaterialUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { _id } = req.query
         if (typeof _id !== "string") {
            throw new Error("Invalid or missing _id parameter");
         }
         const result = await this.getEditMaterialUseCase.execute(_id)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   updateMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.updateMaterialUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteMaterialUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchUniqueMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.fetchMaterialUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

   fetchMaterialByUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { material_name } = req.query
         const result = await this.fetchMaterialByMaterialName.execute(String(material_name))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchBrandbyName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { material_name } = req.query
         const result = await this.fetchbrandByname.execute(String(material_name))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchUnitrate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const {material_name,brand_name,unit_name} = req.query
          const result = await this.fetUnitRateUseCase.execute(String(material_name),String(brand_name),String(unit_name))
          res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

}






