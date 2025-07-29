import { NextFunction, Request, Response } from "express"
import { ILabourControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/ILabourControllerEntity"
import { IAddLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity"
import { IDisplayAllLabourUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity"
import { IUpdateLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity"
import { IDeleteLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity"
import { IFetchAllLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity"
import { IFetchLabourByIdUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { labourOutput } from "../../../../Entities/Input-OutputEntities/LabourEntities/labour"



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

       //------------------------------------ List labour type with search and pagination ------------------------------------//

      getLabour = async (req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput> => {
            const { page, search } = req.query
            const result = await this.displayAllLabourUseCase.execute(Number(page), String(search))
            return result
      }

       //------------------------------------ Save labour type ------------------------------------//

      saveLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this.addLabourUseCase.execute(req.body)
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

      getLabourBYId = async (req: Request, res: Response, next: NextFunction):Promise<labourOutput | commonOutput> => {
            const { id } = req.params
            const result = await this.fetchLabourByIdUseCase.execute(id)
            return result
      }


}


