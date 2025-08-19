import { Request, Response, NextFunction } from "express";
import { ITransferController } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/ITransferControllerEntity";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { TransferOutput } from "../../../application/dto/PurchaseEntity.ts/Transfer";
import { IGetTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetTransferUseCaseEntity";
import { IGetToProjectUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetToProjectUseCaseEntity";
import { ISaveTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/SaveTransferUseCaseEntity";
import { IUpdateTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/UpdateTransferUseCaseEntity";
import { IDeleteTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/DeleteTransferUsecaseEntity";
import { IApproveTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/ApproveTransferUseCaseEntity";
import { IReceiveTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/ReceiveTransferUseCaseEntity";
import { IJwtServiceEntity } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userFailedMessage } from "../../../Shared/Messages/User.Message";

export class TransferController implements ITransferController {
   private jwtService: IJwtServiceEntity
   private getTransferUseCase: IGetTransferUseCaseEntity
   private getToprojectUseCase: IGetToProjectUseCaseEntity
   private saveTransferUsecase: ISaveTransferUseCaseEntity
   private updateTransferUseCase: IUpdateTransferUseCaseEntity
   private deleteTransferUseCase: IDeleteTransferUseCaseEntity
   private approveTransferUseCase: IApproveTransferUseCaseEntity
   private receiveTransferUseCase : IReceiveTransferUseCaseEntity
   constructor(jwtService: IJwtServiceEntity, getTransferUseCase: IGetTransferUseCaseEntity, getToprojectUseCase: IGetToProjectUseCaseEntity,
      saveTransferUsecase: ISaveTransferUseCaseEntity, updateTransferUseCase: IUpdateTransferUseCaseEntity, deleteTransferUseCase: IDeleteTransferUseCaseEntity,
      approveTransferUseCase: IApproveTransferUseCaseEntity,receiveTransferUseCase : IReceiveTransferUseCaseEntity
   ) {
      this.jwtService = jwtService
      this.getTransferUseCase = getTransferUseCase
      this.getToprojectUseCase = getToprojectUseCase
      this.saveTransferUsecase = saveTransferUsecase
      this.updateTransferUseCase = updateTransferUseCase
      this.deleteTransferUseCase = deleteTransferUseCase
      this.approveTransferUseCase = approveTransferUseCase
      this.receiveTransferUseCase = receiveTransferUseCase
   }
   getTransfer = async (req: Request, res: Response, next: NextFunction): Promise<TransferOutput | commonOutput> => {
      const { search, page } = req.query
      const refreshToken = req.cookies.refreshToken
      const decoded = await this.jwtService.verifyRefreshToken(refreshToken)
      if (!decoded?.userId) {
         return ResponseHelper.conflictData(userFailedMessage.USER_NOT_FOUND)
      }
      const data = await this.getTransferUseCase.execute(String(search), Number(page), decoded?.userId)
      return data
   }
   getToProject = async (req: Request, res: Response, next: NextFunction): Promise<TransferOutput | commonOutput> => {
      const fromProjectId = req.params.id
      const data = await this.getToprojectUseCase.execute(fromProjectId)
      return data
   }
   saveTransfer = async (req: Request, res: Response, next: NextFunction): Promise<TransferOutput | commonOutput> => {
      const response = await this.saveTransferUsecase.execute(req.body)
      return response
   }
   updateTransfer = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const response = await this.updateTransferUseCase.execute({ _id, ...req.body })
      return response
   }
   deleteTransfer = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const response = await this.deleteTransferUseCase.execute(_id)
      return response
   }
   approveTransfer = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const response = await this.approveTransferUseCase.execute({ _id, ...req.body.data })
      return response
   }

   // ----------------- Fetch Transfer Data need to Material Receive -----------------------//

   receiveTransfer = async (req: Request, res: Response, next: NextFunction): Promise<TransferOutput | commonOutput> => {
      const _id = req.params.id
      const date = req.query.date
      const data = await this.receiveTransferUseCase.execute(_id,String(date))
      return data
   }
}