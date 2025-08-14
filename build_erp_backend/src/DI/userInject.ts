import { ChatRepository } from "../infrastructure/persistence/ChatRepository"
import { ProjectRepository } from "../infrastructure/persistence/ProjectRepository"
import { UserRepository } from "../infrastructure/persistence/UserRepository"
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher"
import { AuthController } from "../infrastructure/web/controllers/user/AuthController"
import { AuthProjectController } from "../infrastructure/web/controllers/user/AuthprojectController"
import { JwtService } from "../services/JwtService"
import { ChangePasswordUsecase } from "../useCases/UserAuthUsecase/ChangePasswordUseCase"
import { GoogleAuthUseCase } from "../useCases/UserAuthUsecase/GoogleAuthUseCase"
import { RefreshTokenUseCase } from "../useCases/UserAuthUsecase/RefreshTokenUseCase"
import { ResendOTPUseCase } from "../useCases/UserAuthUsecase/ResendOTPUseCase"
import { SendOTPUseCase } from "../useCases/UserAuthUsecase/SendOTPUseCase"
import { SignupUserUseCase } from "../useCases/UserAuthUsecase/SignupUserUseCase"
import { UpdatePasswordUseCase } from "../useCases/UserAuthUsecase/UpdatePasswordUseCase"
import { UpdateProfileImageUseCase } from "../useCases/UserAuthUsecase/UpdateProfileImageUseCase"
import { UpdateProfileUsecase } from "../useCases/UserAuthUsecase/UpdateProfileUseCase"
import { UserLoginUseCase } from "../useCases/UserAuthUsecase/UserLoginUseCase"
import { VerifyForgotUseCase } from "../useCases/UserAuthUsecase/VerifyForgotUseCase"
import { VerifyOTPUseCases } from "../useCases/UserAuthUsecase/VerifyOTPuseCases"
import { FetchStatusBaseProjectUseCase } from "../useCases/ProjectDisplayUseCase/fetchStatusBaseProjectUseCase"
import { FetchUserProjectUseCase } from "../useCases/ProjectDisplayUseCase/fetchUsersProjectUsecase"
import { GetSitemanagerListDataUseCase } from "../useCases/ProjectDisplayUseCase/getSitemanagerListDataUsecase"
import { GetMessageDataUseCase } from "../useCases/ChatUsecases/getMessageDataUsecase"
import { GetAllProjectListInUserUseCase } from "../useCases/ProjectDisplayUseCase/GetAllProjectListInUserUseCase"

// ---------------------- User Injection ---------------------- //

const userRepository = new UserRepository()
const jwtService = new JwtService()
const hasher = new BcryptHasher()
const chatRepository = new ChatRepository()
const projectRepository = new ProjectRepository()
const signupUserUseCase = new SignupUserUseCase(userRepository)
const verifyOTPUseCase = new VerifyOTPUseCases(userRepository, hasher)
const resendOTPUseCase = new ResendOTPUseCase(userRepository)
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, jwtService)
const userLoginUseCase = new UserLoginUseCase(userRepository, hasher, jwtService)
const googleauthuseCase = new GoogleAuthUseCase(userRepository, jwtService)
const sendotpUsecase = new SendOTPUseCase(userRepository)
const verifyforgotUsecase = new VerifyForgotUseCase(userRepository)
const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository, hasher)
const updateProfileUseCase = new UpdateProfileUsecase(userRepository)
const updateProfileImageUseCase = new UpdateProfileImageUseCase(userRepository)
const changePasswordUseCase = new ChangePasswordUsecase(userRepository, hasher)
const getSitemanagerListDatauseCase = new GetSitemanagerListDataUseCase(projectRepository)
const getmessageDataUsecase = new GetMessageDataUseCase(chatRepository)
const getAllProjectListInUserUseCase = new GetAllProjectListInUserUseCase(projectRepository)
export const injectAuthController = new AuthController(signupUserUseCase, verifyOTPUseCase, resendOTPUseCase, userLoginUseCase, refreshTokenUseCase, googleauthuseCase, sendotpUsecase,
   verifyforgotUsecase, updatePasswordUseCase, updateProfileUseCase, updateProfileImageUseCase, changePasswordUseCase,jwtService,
   getSitemanagerListDatauseCase,getmessageDataUsecase,getAllProjectListInUserUseCase
)

// ---------------------- User Project Injection ---------------------- //


const fetchUserprojectUseCase = new FetchUserProjectUseCase(projectRepository)
const fetchStatusBaseProjectUseCase = new FetchStatusBaseProjectUseCase(projectRepository)
export const InjectAuthprojectController = new AuthProjectController(fetchUserprojectUseCase, fetchStatusBaseProjectUseCase)
