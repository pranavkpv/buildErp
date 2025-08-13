import { Request, Response, NextFunction } from "express";
import { IReceiveControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IRecieveControllerEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { ISaveReceiveUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import { RecieveOutput } from "../../../../DTO/PurchaseEntity.ts/Receive";
import { IGetReceiveUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";
import { IUpdateReceiveUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/UpdateRecieveUseCaseEntity";
import { IDeleteReceiveUsecaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/DeleteReceiveUseCaseEntity";
import { IApproveReceiveUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/ApproveReceiveUseCaseEntity";

export class RecieveController implements IReceiveControllerEntity {
   private saveRecieveUseCase: ISaveReceiveUseCaseEntity
   private GetReceiveUseCase: IGetReceiveUseCaseEntity
   private UpdateReceiveUseCase: IUpdateReceiveUseCaseEntity
   private deleteReceiveUseCase: IDeleteReceiveUsecaseEntity
   private approveReceiveUseCase: IApproveReceiveUseCaseEntity
   constructor(saveRecieveUseCase: ISaveReceiveUseCaseEntity, GetReceiveUseCase: IGetReceiveUseCaseEntity,
      UpdateReceiveUseCase: IUpdateReceiveUseCaseEntity, deleteReceiveUseCase: IDeleteReceiveUsecaseEntity,
      approveReceiveUseCase: IApproveReceiveUseCaseEntity) {
      this.saveRecieveUseCase = saveRecieveUseCase
      this.GetReceiveUseCase = GetReceiveUseCase
      this.UpdateReceiveUseCase = UpdateReceiveUseCase
      this.deleteReceiveUseCase = deleteReceiveUseCase
      this.approveReceiveUseCase = approveReceiveUseCase
   }
   saveRecieve = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const response = await this.saveRecieveUseCase.execute(req.body)
      return response
   }

   getRecieve = async (req: Request, res: Response, next: NextFunction): Promise<RecieveOutput | commonOutput> => {
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
            material_id: element.material_id,
            quantity: element.quantity,
            unit_rate: element.unit_rate
         })
      }
      const response = await this.approveReceiveUseCase.execute(_id,project_id,materialDetails )
      return response
   }

}