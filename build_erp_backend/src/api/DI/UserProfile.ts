import Stripe from 'stripe';
import { ChatMapper } from '../../application/Mapper/chat.mapper';
import { ProjectMapper } from '../../application/Mapper/project.mapper';
import { UserMapper } from '../../application/Mapper/user.mapper';
import { JwtService } from '../../application/services/JwtService';
import { BlackListUsecase } from '../../application/UseCase/Auth/Blacklist';
import { GetMessageDataUseCase } from '../../application/UseCase/Chat/GetMessageData';
import { FetchUserProjectUseCase } from '../../application/UseCase/Project/FetchUsersProject';
import { GetSitemanagerListDataUseCase } from '../../application/UseCase/Project/GetSitemanagerList';
import { ChangePasswordUsecase } from '../../application/UseCase/UserProfile/ChangePassword';
import { EditEmailUseCase } from '../../application/UseCase/UserProfile/EditEmail';
import { EditEmailResendOTPUseCase } from '../../application/UseCase/UserProfile/EditEmailResendOTP';
import { EditEmailVerifyOtpUseCase } from '../../application/UseCase/UserProfile/EditEmailVerifyOtp';
import { GetUserDashBoardUseCase } from '../../application/UseCase/UserProfile/GetUserDashBoard';
import { UpdateProfileUsecase } from '../../application/UseCase/UserProfile/UpdateProfile';
import { UpdateProfileImageUseCase } from '../../application/UseCase/UserProfile/UpdateProfileImage';
import { BcryptHasher } from '../../infrastructure/Repositories/BcryptHasher';
import { ChatRepository } from '../../infrastructure/Repositories/Chat';
import { PaymentRepository } from '../../infrastructure/Repositories/Payment';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { UserRepository } from '../../infrastructure/Repositories/User';
import { UserProfileController } from '../controllers/UserProfile.controller';
import { StageRepository } from '../../infrastructure/Repositories/Stage';
import { CloudinaryUploader } from '../../application/services/CloudinaryUploader';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-08-27.basil',
});


const jwtservice = new JwtService();
const userRepository = new UserRepository();
const userMapper = new UserMapper();
const hasher = new BcryptHasher();
const projectRepository = new ProjectRepository();
const projectmapper = new ProjectMapper();
const chatRepository = new ChatRepository();
const chatmapper = new ChatMapper();
const paymentRepository = new PaymentRepository(stripe);
const stageRepository = new StageRepository();

const updateProfileUseCase = new UpdateProfileUsecase(userRepository, userMapper, jwtservice);
const updateProfileImageUseCase = new UpdateProfileImageUseCase(userRepository, userMapper, jwtservice);
const changePasswordUseCase = new ChangePasswordUsecase(userRepository, hasher);
const fetchUserprojectUseCase = new FetchUserProjectUseCase(projectRepository, projectmapper);
const getChatListUseCase = new GetSitemanagerListDataUseCase(projectRepository, projectmapper);
const getMessagesUseCase = new GetMessageDataUseCase(chatRepository, chatmapper);
const blacklistUsecase = new BlackListUsecase(userRepository);
const editEmailUseCase = new EditEmailUseCase(userRepository);
const editEmailResendOTPUseCase = new EditEmailResendOTPUseCase(userRepository);
const editEmailVerifyOTPUseCase = new EditEmailVerifyOtpUseCase(userRepository, userMapper);
const getUserDashBoardUsecase = new GetUserDashBoardUseCase(projectRepository, paymentRepository, stageRepository);
const fileUploaderService = new CloudinaryUploader()
export const injecteduserprofileController = new UserProfileController(jwtservice, updateProfileUseCase, updateProfileImageUseCase, changePasswordUseCase,
    fetchUserprojectUseCase, getChatListUseCase, getMessagesUseCase, blacklistUsecase, editEmailUseCase, editEmailResendOTPUseCase, editEmailVerifyOTPUseCase,
    getUserDashBoardUsecase,fileUploaderService);