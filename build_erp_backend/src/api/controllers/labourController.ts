import { NextFunction, Request, Response } from "express"
import { IAddLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity"
import { IDisplayAllLabourUsecase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity"
import { IUpdateLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity"
import { IDeleteLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity"
import { IFetchAllLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity"
import { IFetchLabourByIdUsecaseEntity } from "../../application/interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity"
import { ILabourController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/ILabourControllerEntity"
import { commonOutput } from "../../application/dto/common"
import { labourDataDisplayDTO } from "../../application/dto/labour.dto"




export class LabourController implements ILabourController {

      constructor(
            private _displayAllLabourUseCase: IDisplayAllLabourUsecase,
            private _addLabourUseCase: IAddLabourUseCase,
            private _updateLabourUseCase: IUpdateLabourUseCase,
            private _deleteLabourUseCase: IDeleteLabourUseCase,
            private _fetchallLabourusecase: IFetchAllLabourUseCase,
            private fetchLabourByIdUseCase: IFetchLabourByIdUsecaseEntity
      ) { }

      //------------------------------------ List labour type with search and pagination ------------------------------------//

      getLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: labourDataDisplayDTO[], totalPage: number }> | commonOutput> => {
            const { page, search } = req.query
            const result = await this._displayAllLabourUseCase.execute(Number(page), String(search))
            return result
      }

      //------------------------------------ Save labour type ------------------------------------//

      saveLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this._addLabourUseCase.execute(req.body)
            return result

      }

      //------------------------------------ Delete labour type  ------------------------------------//

      removeLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this._deleteLabourUseCase.execute(req.params.id)
            return result
      }

      //------------------------------------ Update labour type ------------------------------------//

      updateLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this._updateLabourUseCase.execute({ _id: req.params.id, ...req.body })
            return result
      }

      //------------------------------------ List all labour type ------------------------------------//

      fetchlabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<labourDataDisplayDTO[]> | commonOutput> => {
            const result = await this._fetchallLabourusecase.execute()
            return result
      }

      //------------------------------------ Fetch labour by Id ------------------------------------//

      getLabourBYId = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<labourDataDisplayDTO> | commonOutput> => {
            const { id } = req.params
            const result = await this.fetchLabourByIdUseCase.execute(id)
            return result
      }
}


