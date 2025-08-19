import { NextFunction, Request, Response } from "express"
import { IAddLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity"
import { IDisplayAllLabourUsecase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity"
import { IUpdateLabourUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity"
import { IDeleteLabourUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity"
import { IFetchAllLabourUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity"
import { IFetchLabourByIdUsecaseEntity } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity"
import { ILabourController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/ILabourControllerEntity"
import { commonOutput } from "../../application/dto/common"




export class LabourController implements ILabourController {

      constructor(
            private displayAllLabourUseCase: IDisplayAllLabourUsecase,
            private _addLabourUseCase: IAddLabourUseCase,
            private updateLabourUseCase: IUpdateLabourUseCaseEntity,
            private deleteLabourUseCase: IDeleteLabourUseCaseEntity,
            private fetchallLabourusecase: IFetchAllLabourUseCaseEntity,
            private fetchLabourByIdUseCase: IFetchLabourByIdUsecaseEntity
      ) { }

      //------------------------------------ List labour type with search and pagination ------------------------------------//

      getLabour = async (req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput> => {
            const { page, search } = req.query
            const result = await this.displayAllLabourUseCase.execute(Number(page), String(search))
            return result
      }

      //------------------------------------ Save labour type ------------------------------------//

      saveLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this._addLabourUseCase.execute(req.body)
            return result

      }

      //------------------------------------ Delete labour type  ------------------------------------//

      removeLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this.deleteLabourUseCase.execute(req.params.id)
            return result
      }

      //------------------------------------ Update labour type ------------------------------------//

      updateLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this.updateLabourUseCase.execute({ _id: req.params.id, ...req.body })
            return result
      }

      //------------------------------------ List all labour type ------------------------------------//

      fetchlabour = async (req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput> => {
            const result = await this.fetchallLabourusecase.execute()
            return result
      }

      //------------------------------------ Fetch labour by Id ------------------------------------//

      getLabourBYId = async (req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput> => {
            const { id } = req.params
            const result = await this.fetchLabourByIdUseCase.execute(id)
            return result
      }


}


