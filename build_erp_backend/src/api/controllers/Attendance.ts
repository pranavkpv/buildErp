import { NextFunction, Request, Response } from 'express-serve-static-core';
import { IAttendanceController } from '../../domain/Entities/IController/IAttendance';
import { commonOutput } from '../../application/dto/common';
import { fetchEditAttendance, pageWiseAttendance } from '../../application/Entities/attendance.entity';
import { IaddAttendanceUseCase } from '../../application/IUseCases/IAttendance/IAddAttendance';
import { IfetchAttendanceUseCase } from '../../application/IUseCases/IAttendance/IFetchAttendance';
import { IDeleteAttendanceUseCase } from '../../application/IUseCases/IAttendance/IDeleteAttendance';
import { IApproveAttendanceUseCase } from '../../application/IUseCases/IAttendance/IApproveAttendance';
import { IFetchAttendanceByIdUseCase } from '../../application/IUseCases/IAttendance/IFetchAttendanceById';
import { IEditAttendanceUseCase } from '../../application/IUseCases/IAttendance/IEditAttendance';

export class AttendanceController implements IAttendanceController {
    constructor(
      private _addAttendanceUseCase: IaddAttendanceUseCase,
      private _fetchAttendanceUseCase: IfetchAttendanceUseCase,
      private _deleteAttendanceUseCase: IDeleteAttendanceUseCase,
      private _approveAttendanceUseCase: IApproveAttendanceUseCase,
      private _fetchAttendanceByIdUseCase: IFetchAttendanceByIdUseCase,
      private _editAttendanceUseCase: IEditAttendanceUseCase,
    ) { }

    //  Record new labour attendance for a project on a specific date
    createAttendance = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const result = await this._addAttendanceUseCase.execute(req.body);
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Update existing labour attendance details 
    updateAttendance = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            console.log(req.params.id);
            console.log(req.body);
            const result = await this._editAttendanceUseCase.execute({ _id:req.params.id,...req.body });
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Fetch paginated and searchable labour attendance list
    getAttendanceList = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: pageWiseAttendance[], totalPage: number }> | void> => {
        try {
            const { search, page } = req.query;
            const result = await this._fetchAttendanceUseCase.execute({
                page: Number(page),
                search: String(search),
            });
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Delete labour attendance record by ID 
    removeAttendance = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const result = await this._deleteAttendanceUseCase.execute(_id);
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Approve labour attendance by ID
    approveAttendance = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const result = await this._approveAttendanceUseCase.execute(_id);
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Fetch single labour attendance data for edit by ID
    getAttendanceById = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchEditAttendance> | commonOutput | void> => {
        try {
            const _id = req.params.id;
            const result = await this._fetchAttendanceByIdUseCase.execute(_id);
            return result;
        } catch (error) {
            next(error);
        }
    };
}
