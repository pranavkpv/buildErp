import { NextFunction, Request, Response } from 'express';
import { listTransferDTO, projectStockListDTO, TransferOutput } from '../../../application/dto/transfer.dto';
import { commonOutput } from '../../../application/dto/common';
import { fetchProjectIdnameDTO } from '../../../application/dto/project.dto';


export interface ITransferController {

   fetchTransfers(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listTransferDTO[], totalPage: number }> | commonOutput | void>

   fetchToProjects(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void>

   createTransfer(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updateTransfer(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   removeTransfer(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   approveTransfer(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   receiveTransfer(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<TransferOutput[]> | commonOutput | void>

   fullStockList(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<projectStockListDTO[]> | void>

   getUserBaseTransfer(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<listTransferDTO[]> | commonOutput | void>

   rejectTransferById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>
}