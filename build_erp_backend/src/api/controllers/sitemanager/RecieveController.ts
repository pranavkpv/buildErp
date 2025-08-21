import { Request, Response, NextFunction } from "express";
import { IReceiveControllerEntity } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/IRecieveControllerEntity";
import { ISaveReceiveUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import { IGetReceiveUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";
import { IUpdateReceiveUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/UpdateRecieveUseCaseEntity";
import { IDeleteReceiveUsecaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/DeleteReceiveUseCaseEntity";
import { IApproveReceiveUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/ApproveReceiveUseCaseEntity";
import { commonOutput } from "../../../application/dto/common";
import { RecieveOutput } from "../../../application/dto/receive.dto";

export class RecieveController implements IReceiveControllerEntity {

   constructor(
      private saveRecieveUseCase: ISaveReceiveUseCaseEntity,
      private GetReceiveUseCase: IGetReceiveUseCaseEntity,
      private UpdateReceiveUseCase: IUpdateReceiveUseCaseEntity,
      private deleteReceiveUseCase: IDeleteReceiveUsecaseEntity,
      private approveReceiveUseCase: IApproveReceiveUseCaseEntity
   ) { }
   saveRecieve = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const response = await this.saveRecieveUseCase.execute(req.body)
      return response
   }

   getRecieve = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:RecieveOutput[],totalPage:number}> | commonOutput> => {
      const { search, page } = req.query
      const response = await this.GetReceiveUseCase.execute(String(search), Number(page))
      return response
   }
   updateRecieve = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const response = await this.UpdateReceiveUseCase.execute({ _id, ...req.body })
      return response
   }
   deleteReceive = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const response = await this.deleteReceiveUseCase.execute(_id)
      return response
   }
   approveReceive = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const project_id = req.body.data.approveData.project_id
      const materialDetails = []
      for (let element of req.body.data.approveData.materialData) {
         materialDetails.push({
            material_id: element.material_id as string,
            quantity: element.quantity as number,
            unit_rate: element.unit_rate as number
         })
      }
      const response = await this.approveReceiveUseCase.execute(_id, project_id, materialDetails)
      return response
   }

}