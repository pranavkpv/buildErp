import { INotificationRepository } from "../../../domain/Entities/IRepository/INotification";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IStageRepository } from "../../../domain/Entities/IRepository/IStage";


export class CheckStageDeadlineUseCase {
   constructor(
      private _stageRepository: IStageRepository,
      private _notificationRepository: INotificationRepository,
      private _projectRepository: IprojectRepository
   ) { }
   async execute(daysBefore: number): Promise<void> {
      const stage = await this._stageRepository.findStagesEndingInDays(daysBefore)
      for (let element of stage) {
         const projectData = await this._projectRepository.getProjectById(element.project_id)
         if (!projectData) {
            return 
         }
         await this._notificationRepository.saveNotication(new Date(), `The project ${ projectData?.project_name } is currently in the ${ element.stage_name } stage. Its end date is ${ element.end_date }. Please ensure the payment is made before the deadline.`, projectData?.user_id,);
      }
   }
}