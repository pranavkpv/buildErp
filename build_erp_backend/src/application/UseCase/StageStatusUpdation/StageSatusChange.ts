import { IStageStatusChangeUseCase } from '../../IUseCases/IStageStatusUpdation/IStageStatusChange';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { StageFailedMessage, StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { changeStatusInput } from '../../Entities/sitemanager.entity';
import { commonOutput } from '../../dto/common';
import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';

export class StageStatusChangeUseCase implements IStageStatusChangeUseCase {
  constructor(
    private _stagerepository: IStageRepository,
    private _notificationRepository: INotificationRepository,
    private _projectRepository: IprojectRepository
  ) { }
  async execute(input: changeStatusInput): Promise<commonOutput> {
    const { stageId, newProgress, date } = input;
    await this._stagerepository.changeStageStatus({ stageId, newProgress, date });
    const stageData = await this._stagerepository.getStageById(stageId)
    if (!stageData) {
      return ResponseHelper.conflictData(StageFailedMessage.FETCH)
    }
    const projectData = await this._projectRepository.getProjectById(stageData?.project_id)
    if (!projectData) {
      return ResponseHelper.conflictData(ProjectFailedMessage.FETCH)
    }
    await this._notificationRepository.saveNotication(new Date(), `The project ${ projectData?.project_name } is currently in the ${ stageData.stage_name } stage. now ${stageData.stage_name} stage ${newProgress}% completed`, projectData?.user_id,);
    return ResponseHelper.success(StageSuccessMessage.STATUS_CHANGE);
  }
}