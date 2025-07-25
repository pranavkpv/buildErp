import { NextFunction, Request, Response } from "express"
import { ILabourControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/ILabourControllerEntity"
import { IAddLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity"
import { IDisplayAllLabourUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity"
import { IUpdateLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity"
import { IDeleteLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity"
import { IFetchAllLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"
import { IFetchLabourByIdUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity"



export class LabourController implements ILabourControllerEntity {
      private displayAllLabourUseCase: IDisplayAllLabourUsecase
      private addLabourUseCase: IAddLabourUseCase
      private updateLabourUseCase: IUpdateLabourUseCase
      private deleteLabourUseCase: IDeleteLabourUseCase
      private fetchallLabourusecase: IFetchAllLabourUseCase
      private fetchLabourByIdUseCase: IFetchLabourByIdUsecase
      constructor(displayAllLabourUseCase: IDisplayAllLabourUsecase,
            addLabourUseCase: IAddLabourUseCase, updateLabourUseCase: IUpdateLabourUseCase,
            deleteLabourUseCase: IDeleteLabourUseCase, fetchallLabourusecase: IFetchAllLabourUseCase,
            fetchLabourByIdUseCase: IFetchLabourByIdUsecase) {
            this.addLabourUseCase = addLabourUseCase
            this.deleteLabourUseCase = deleteLabourUseCase
            this.displayAllLabourUseCase = displayAllLabourUseCase
            this.updateLabourUseCase = updateLabourUseCase
            this.fetchallLabourusecase = fetchallLabourusecase
            this.fetchLabourByIdUseCase = fetchLabourByIdUseCase
      }


      getLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const { page, search } = req.query
            const result = await this.displayAllLabourUseCase.execute(Number(page), String(search))
            res.status(HTTP_STATUS.OK).json(result)
      }


      saveLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const result = await this.addLabourUseCase.execute(req.body)
            res.status(result.status_code).json(result)
      }


      removeLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const result = await this.deleteLabourUseCase.execute(req.params.id)
            res.status(result.status_code).json(result)
      }


      updateLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const result = await this.updateLabourUseCase.execute({ _id: req.params.id, ...req.body })
            res.status(result.status_code).json(result)
      }


      fetchlabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const result = await this.fetchallLabourusecase.execute()
            res.status(HTTP_STATUS.OK).json(result)
      }

      getLabourBYId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const { id } = req.params
            const result = await this.fetchLabourByIdUseCase.execute(id)
            res.status(HTTP_STATUS.OK).json(result)
      }
}


