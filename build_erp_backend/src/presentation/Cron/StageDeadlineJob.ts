import cron from 'node-cron';
import { CheckStageDeadlineUseCase } from '../../application/UseCase/Stage/CheckStageDeadline';
import { StageRepository } from '../../infrastructure/Repositories/Stage';
import { NotificationRepostory } from '../../infrastructure/Repositories/Notifiaction';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';

const stageRepository = new StageRepository();
const notificationRepository = new NotificationRepostory();
const projectRepository = new ProjectRepository();

const checkStageDeadlineUseCase = new CheckStageDeadlineUseCase(stageRepository,notificationRepository,projectRepository);

cron.schedule('0 0 * * *', async() => {
    console.log('Running cron job: Checking stage deadlines...');
    await checkStageDeadlineUseCase.execute(2); 
});