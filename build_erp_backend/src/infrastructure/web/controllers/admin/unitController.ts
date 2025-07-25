import { NextFunction, Request, Response } from "express"
import { IUnitControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IUnitControllerEntity"
import { IDisplayAllUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DisplayAllUnitEntity"
import { ISaveUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/SaveUnitEntity"
import { IupdateUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/UpdateUnitEntity"
import { IdeleteUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DeleteUnitEntity"
import { IFetchUnitUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/FetchUnitEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"




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

   getUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { page, search } = req.query
      const result = await this.displayUnitUseCase.execute(Number(page), String(search))
      res.status(HTTP_STATUS.OK).json(result)
   }


   addUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.addUnitUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   editUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.editUnitUseCase.execute({ _id: req.params.id, ...req.body })
      res.status(result.status_code).json(result)
   }


   removeUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.deleteUnitUseCase.execute(req.params.id)
      res.status(result.status_code).json(result)
   }


   displayAllUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.fetchunitusecase.execute()
      res.status(HTTP_STATUS.OK).json(result)
   }

}

