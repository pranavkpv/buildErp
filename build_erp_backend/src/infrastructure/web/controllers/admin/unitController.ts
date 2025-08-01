import { NextFunction, Request, Response } from "express"
import { IUnitControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IUnitControllerEntity"
import { IDisplayAllUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DisplayAllUnitEntity"
import { ISaveUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/SaveUnitEntity"
import { IupdateUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/UpdateUnitEntity"
import { IdeleteUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DeleteUnitEntity"
import { IFetchUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/FetchUnitEntity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { UnitOutput } from "../../../../Entities/Input-OutputEntities/MaterialEntities/unit"




export class UnitController implements IUnitControllerEntity {
   private displayUnitUseCase: IDisplayAllUnitUseCase
   private addUnitUseCase: ISaveUnitUseCase
   private editUnitUseCase: IupdateUnitUseCase
   private deleteUnitUseCase: IdeleteUnitUseCase
   private fetchunitusecase: IFetchUnitUseCase
   constructor(
      displayUnitUseCase: IDisplayAllUnitUseCase,
      addUnitUseCase: ISaveUnitUseCase,
      editUnitUseCase: IupdateUnitUseCase,
      deleteUnitUseCase: IdeleteUnitUseCase,
      fetchunitusecase: IFetchUnitUseCase
   ) {
      this.displayUnitUseCase = displayUnitUseCase
      this.addUnitUseCase = addUnitUseCase
      this.editUnitUseCase = editUnitUseCase
      this.deleteUnitUseCase = deleteUnitUseCase
      this.fetchunitusecase = fetchunitusecase
   }

   //------------------------------------ List the material unit based on search and pagination ------------------------------------//

   getUnit = async (req: Request, res: Response, next: NextFunction): Promise<UnitOutput | commonOutput> => {
      const { page, search } = req.query
      const result = await this.displayUnitUseCase.execute(Number(page), String(search))
      return result
   }


   //------------------------------------ Save the unit ------------------------------------//

   addUnit = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.addUnitUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Update the unit ------------------------------------//

   editUnit = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.editUnitUseCase.execute({ _id: req.params.id, ...req.body })
      return result
   }

   //------------------------------------ Delete the unit ------------------------------------//

   removeUnit = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.deleteUnitUseCase.execute(req.params.id)
      return result
   }

   //------------------------------------ List all the existing unit ------------------------------------//

   displayAllUnit = async (req: Request, res: Response, next: NextFunction): Promise<UnitOutput | [] | commonOutput> => {
      const result = await this.fetchunitusecase.execute()
      return result
   }

}

