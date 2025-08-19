import { ChatMapper } from "../../application/Mapper/chat.mapper";
import { projectMapper } from "../../application/Mapper/project.mapper";
import { UserMapper } from "../../application/Mapper/user.mapper";
import { JwtService } from "../../application/services/JwtService";
import { GetMessageDataUseCase } from "../../application/usecases/ChatUsecases/getMessageDataUsecase";
import { FetchUserProjectUseCase } from "../../application/usecases/ProjectDisplayUseCase/fetchUsersProjectUsecase";
import { GetSitemanagerListDataUseCase } from "../../application/usecases/ProjectDisplayUseCase/getSitemanagerListDataUsecase";
import { ChangePasswordUsecase } from "../../application/usecases/user.profile.usecase/ChangePasswordUseCase";
import { UpdateProfileImageUseCase } from "../../application/usecases/user.profile.usecase/UpdateProfileImage.UseCase";
import { UpdateProfileUsecase } from "../../application/usecases/user.profile.usecase/UpdateProfileUseCase";
import { ChatRepository } from "../../infrastructure/repositories/ChatRepository";
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { BcryptHasher } from "../../infrastructure/secuirity/BcryptHasher";
import { userprofileController } from "../controllers/userprofile.controller";

const jwtService = new JwtService()
const userRepository = new UserRepository()
const userMapper = new UserMapper()
const hasher = new BcryptHasher()
const projectRepository = new ProjectRepository()
const projectmapper = new projectMapper()
const chatRepository = new ChatRepository()
const chatmapper = new ChatMapper()

const updateProfileUseCase = new UpdateProfileUsecase(userRepository,userMapper,jwtService)
const updateProfileImageUseCase = new UpdateProfileImageUseCase(userRepository,userMapper,jwtService)
const fetchUserprojectUseCase = new FetchUserProjectUseCase(projectRepository,projectmapper)
const changePasswordUseCase = new ChangePasswordUsecase(userRepository,hasher)
const getChatListUseCase = new GetSitemanagerListDataUseCase(projectRepository,projectmapper)
const getMessagesUseCase = new GetMessageDataUseCase(chatRepository,chatmapper)

export const injecteduserprofileController = new userprofileController(
   jwtService,updateProfileUseCase,updateProfileImageUseCase,changePasswordUseCase,fetchUserprojectUseCase,
   getChatListUseCase,getMessagesUseCase
)