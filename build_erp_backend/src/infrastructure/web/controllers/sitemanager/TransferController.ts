import { Request, Response, NextFunction } from "express";
import { ITransferController } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/ITransferControllerEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { JwtServiceImpl } from "../../../../services/JwtService";
import { ERROR_MESSAGE } from "../../../../Shared/Message";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { IGetTransferUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetTransferUseCaseEntity";
import { IGetToProjectUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetToProjectUseCaseEntity";
import { ISaveTransferUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/SaveTransferUseCaseEntity";
import { IUpdateTransferUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/UpdateTransferUseCaseEntity";
import { IDeleteTransferUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/DeleteTransferUsecaseEntity";
import { IApproveTransferUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/ApproveTransferUseCaseEntity";

export class TransferController implements ITransferController {
   private jwtService: JwtServiceImpl
   private getTransferUseCase: IGetTransferUseCase
   private getToprojectUseCase: IGetToProjectUseCase
   private saveTransferUsecase: ISaveTransferUseCase
   private updateTransferUseCase: IUpdateTransferUseCase
   private deleteTransferUseCase : IDeleteTransferUseCase
   private approveTransferUseCase : IApproveTransferUseCase
   constructor(jwtService: JwtServiceImpl, getTransferUseCase: IGetTransferUseCase, getToprojectUseCase: IGetToProjectUseCase,
      saveTransferUsecase: ISaveTransferUseCase, updateTransferUseCase: IUpdateTransferUseCase,deleteTransferUseCase : IDeleteTransferUseCase,
       approveTransferUseCase : IApproveTransferUseCase
   ) {
      this.jwtService = jwtService
      this.getTransferUseCase = getTransferUseCase
      this.getToprojectUseCase = getToprojectUseCase
      this.saveTransferUsecase = saveTransferUsecase
      this.updateTransferUseCase = updateTransferUseCase
      this.deleteTransferUseCase = deleteTransferUseCase
      this.approveTransferUseCase = approveTransferUseCase
   }
   getTransfer = async (req: Request, res: Response, next: NextFunction): Promise<TransferOutput | commonOutput> => {
      const { search, page } = req.query
      const refreshToken = req.cookies.refreshToken
      const decoded = await this.jwtService.verifyRefreshToken(refreshToken)
      if (!decoded?.userId) {
         return {
            success: false,
            message: ERROR_MESSAGE.USER.USER_NOT_FOUND,
            status_code: HTTP_STATUS.UNAUTHORIZED
         }
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
   deleteTransfer = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
     const _id = req.params.id
     const response = await this.deleteTransferUseCase.execute(_id)
     return response
   }
   approveTransfer =async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
     const response = await this.approveTransferUseCase.execute({_id,...req.body.data})
     return response
   }
}