import { JwtService } from '../../application/services/JwtService';
import { FetchUserUseCase } from '../../application/UseCase/StageStatusUpdation/FetchUser';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { ChatController } from '../controllers/ChatController';

const jwtService = new JwtService();
const projectRepository = new ProjectRepository();
const fetchUseruseCase = new FetchUserUseCase(projectRepository);
export const injectedChatController = new ChatController(fetchUseruseCase,jwtService);