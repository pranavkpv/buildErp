import { ProjectRepository } from "../infrastructure/persistence/ProjectRepository"
import { UserRepository } from "../infrastructure/persistence/UserRepository"
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher"
import { AuthController } from "../infrastructure/web/controllers/user/AuthController"
import { AuthProjectController } from "../infrastructure/web/controllers/user/AuthprojectController"
import { JwtServiceImpl } from "../services/JwtService"
import { ChangePasswordUsecase } from "../useCases/user/Authentication/ChangePasswordUseCase"
import { GoogleAuthUseCase } from "../useCases/user/Authentication/GoogleAuthUseCase"
import { RefreshTokenUseCase } from "../useCases/user/Authentication/RefreshTokenUseCase"
import { ResendOTPUseCase } from "../useCases/user/Authentication/ResendOTPUseCase"
import { SendOTPUseCase } from "../useCases/user/Authentication/SendOTPUseCase"
import { SignupUserUseCase } from "../useCases/user/Authentication/SignupUserUseCase"
import { UpdatePasswordUseCase } from "../useCases/user/Authentication/UpdatePasswordUseCase"
import { UpdateProfileImageUseCase } from "../useCases/user/Authentication/UpdateProfileImageUseCase"
import { UpdateProfileUsecase } from "../useCases/user/Authentication/UpdateProfileUseCase"
import { UserLoginUseCase } from "../useCases/user/Authentication/UserLoginUseCase"
import { VerifyForgotUseCase } from "../useCases/user/Authentication/VerifyForgotUseCase"
import { VerifyOTPUseCases } from "../useCases/user/Authentication/VerifyOTPuseCases"
import { FetchStatusBaseProjectUseCase } from "../useCases/user/ProjectDisplay/fetchStatusBaseProjectUseCase"
import { FetchUserProjectUseCase } from "../useCases/user/ProjectDisplay/fetchUsersProjectUsecase"

// ---------------------- User Injection ---------------------- //

const userRepository = new UserRepository()
const JwtService = new JwtServiceImpl()
const hasher = new BcryptHasher()
const signupUserUseCase = new SignupUserUseCase(userRepository)
const verifyOTPUseCase = new VerifyOTPUseCases(userRepository, hasher)
const resendOTPUseCase = new ResendOTPUseCase(userRepository)
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, JwtService)
const userLoginUseCase = new UserLoginUseCase(userRepository, hasher, JwtService)
const googleauthuseCase = new GoogleAuthUseCase(userRepository, JwtService)
const sendotpUsecase = new SendOTPUseCase(userRepository)
const verifyforgotUsecase = new VerifyForgotUseCase(userRepository)
const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository, hasher)
const updateProfileUseCase = new UpdateProfileUsecase(userRepository)
const updateProfileImageUseCase = new UpdateProfileImageUseCase(userRepository)
const changePasswordUseCase = new ChangePasswordUsecase(userRepository, hasher)
export const injectAuthController = new AuthController(signupUserUseCase, verifyOTPUseCase, resendOTPUseCase, userLoginUseCase, refreshTokenUseCase, googleauthuseCase, sendotpUsecase,
   verifyforgotUsecase, updatePasswordUseCase, updateProfileUseCase, updateProfileImageUseCase, changePasswordUseCase
)

// ---------------------- User Project Injection ---------------------- //

const projectRepository = new ProjectRepository()
const fetchUserprojectUseCase = new FetchUserProjectUseCase(projectRepository)
const fetchStatusBaseProjectUseCase = new FetchStatusBaseProjectUseCase(projectRepository)
export const InjectAuthprojectController = new AuthProjectController(fetchUserprojectUseCase, fetchStatusBaseProjectUseCase)
