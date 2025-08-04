import { Request, Response, NextFunction } from "express";
import { IReceiveControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IRecieveControllerEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ISaveReceiveUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import {  RecieveOutput } from "../../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IGetReceiveUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";

export class RecieveController implements IReceiveControllerEntity {
   private saveRecieveUseCase: ISaveReceiveUseCase
   private GetReceiveUseCase: IGetReceiveUseCase
   constructor(saveRecieveUseCase: ISaveReceiveUseCase, GetReceiveUseCase: IGetReceiveUseCase) {
      this.saveRecieveUseCase = saveRecieveUseCase
      this.GetReceiveUseCase = GetReceiveUseCase
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

}