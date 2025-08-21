import { Request, Response, NextFunction } from "express";
import { ITransferController } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/ITransferControllerEntity";
import { IGetTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetTransferUseCaseEntity";
import { IGetToProjectUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetToProjectUseCaseEntity";
import { ISaveTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/SaveTransferUseCaseEntity";
import { IUpdateTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/UpdateTransferUseCaseEntity";
import { IDeleteTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/DeleteTransferUsecaseEntity";
import { IApproveTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/ApproveTransferUseCaseEntity";
import { IReceiveTransferUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/ReceiveTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { commonOutput } from "../../../application/dto/common";
import { listTransferDTO, TransferOutput } from "../../../application/dto/transfer.dto";
import { fetchProjectIdnameDTO } from "../../../application/dto/project.dto";

export class TransferController implements ITransferController {

   constructor(
      private jwtService: IJwtService,
      private getTransferUseCase: IGetTransferUseCaseEntity,
      private getToprojectUseCase: IGetToProjectUseCaseEntity,
      private saveTransferUsecase: ISaveTransferUseCaseEntity,
      private updateTransferUseCase: IUpdateTransferUseCaseEntity,
      private deleteTransferUseCase: IDeleteTransferUseCaseEntity,
      private approveTransferUseCase: IApproveTransferUseCaseEntity,
      private receiveTransferUseCase: IReceiveTransferUseCaseEntity,
   ) { }
   getTransfer = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: listTransferDTO[], totalPage: number }> | commonOutput> => {
      const { search, page } = req.body
      const userHeader = req.headers.authorization
      const accessToken = userHeader?.split(" ")[1]
      if (!accessToken) {
         return ResponseHelper.unAuthor()
      }
      const payload = await this.jwtService.verifyAccessToken(accessToken);
      if (!payload) {
         return ResponseHelper.unAuthor()
      }
      const data = await this.getTransferUseCase.execute(String(search), Number(page), payload._id)
      return data
   }
   getToProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> => {
      const fromProjectId = req.params.id
      const data = await this.getToprojectUseCase.execute(fromProjectId)
      return data
   }
   saveTransfer = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
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

   receiveTransfer = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<TransferOutput[]> | commonOutput> => {
      const _id = req.params.id
      const date = req.query.date
      const data = await this.receiveTransferUseCase.execute(_id, String(date))
      return data
   }
}