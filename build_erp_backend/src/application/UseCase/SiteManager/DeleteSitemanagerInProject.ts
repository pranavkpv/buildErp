import { IDeleteSiteToProjectUseCase } from '../../IUseCases/ISitemanager/IDeleteSitemanagerInProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from '../../../Shared/Messages/Sitemanager.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { commonOutput } from '../../dto/common';
import { IPurchaseRepository } from '../../../domain/Entities/IRepository/IPurchase';
import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { IReceiveRepository } from '../../../domain/Entities/IRepository/IReceive';
import { IAttendanceRepository } from '../../../domain/Entities/IRepository/IAttendance';



export class DeleteSiteToProjectUseCase implements IDeleteSiteToProjectUseCase {
    constructor(
    private _projectRepository: IprojectRepository,
    private _purchaseRepository: IPurchaseRepository,
    private _transferRepository: ITransferRepository,
    private _receiveRepository: IReceiveRepository,
    private _attendanceRepository: IAttendanceRepository,
    ) { }
    async execute(id: string, sitemanagerId: string): Promise<commonOutput> {
        const projectCorrespondingSitemanager = await this._projectRepository.getProjectsBySitemanagerId(sitemanagerId);
        for (const element of projectCorrespondingSitemanager) {
            const existUnApprovedPurchase = await this._purchaseRepository.getUnApprovedPurchaseByProjectId(element._id);
            const existUnApprovedTransfer = await this._transferRepository.getUnApprovedTransferByProjectId(element._id);
            const existUnApprovedReceive = await this._receiveRepository.getUnApprovedReceiveByProjectid(element._id);
            const existUnApprovedAttendance = await this._attendanceRepository.getUnApprovedAttendanceByProjectId(element._id);
            if (existUnApprovedPurchase.length > 0 || existUnApprovedTransfer.length > 0 || existUnApprovedReceive.length > 0 || existUnApprovedAttendance.length>0) {
                return ResponseHelper.conflictData(SitemanagerFailedMessage.DATA_EXIST);
            }
        }
        await this._projectRepository.removeSitemanagerFromProject({ siteManager_id: sitemanagerId, selectedproject: id });
        return ResponseHelper.success(SitemanagerSuccessMessage.DELETE);
    }
}