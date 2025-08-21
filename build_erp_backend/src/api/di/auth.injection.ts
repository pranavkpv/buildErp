import { estimationMapper } from "../../application/Mapper/estimation.mapper"
import { projectMapper } from "../../application/Mapper/project.mapper"
import { stagemapper } from "../../application/Mapper/stage.mapper"
import { UserMapper } from "../../application/Mapper/user.mapper"
import { JwtService } from "../../application/services/JwtService"
import { RefreshTokenUseCase } from "../../application/usecases/AdminUseCase/AdminRefreshTokenUseCase"
import { FetchExistEstimationUseCase } from "../../application/usecases/EstimationUseCase/fetchExistEstimation.usecase"
import { FetchStatusBaseProjectUseCase } from "../../application/usecases/ProjectDisplayUseCase/fetchStatusBaseProjectUseCase"
import { FetchStatusUseCase } from "../../application/usecases/StageStatusUpdationUseCase/fetchstatus.usecase"
import { GetAllProjectListInUserUseCase } from "../../application/usecases/user.auth.usecase/getallprojectlistinuser.usecase"
import { GoogleloginUseCase } from "../../application/usecases/user.auth.usecase/googlelogin.usecase"
import { ResendOTPUseCase } from "../../application/usecases/user.auth.usecase/resendotp.usecase"
import { SendOTPUseCase } from "../../application/usecases/user.auth.usecase/sendotp.usecase"
import { SignupUserUseCase } from "../../application/usecases/user.auth.usecase/signup.usecase"
import { UpdatePasswordUseCase } from "../../application/usecases/user.auth.usecase/updatepassword.usecase"
import { UserLoginUseCase } from "../../application/usecases/user.auth.usecase/userlogin.usecase"
import { VerifyForgotUseCase } from "../../application/usecases/user.auth.usecase/verifyforgotpassword.usecase."
import { VerifyOTPUseCases } from "../../application/usecases/user.auth.usecase/verifyotp.usecase"
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository"
import { EstimationRepository } from "../../infrastructure/repositories/EstimationRepository"
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository"
import { StageRepository } from "../../infrastructure/repositories/StageRepository"
import { UserRepository } from "../../infrastructure/repositories/user.repository"
import { BcryptHasher } from "../../infrastructure/secuirity/BcryptHasher"
import { AuthController } from "../controllers/auth.controller"

const userRepository = new UserRepository()
const hasher = new BcryptHasher()
const jwtService = new JwtService()
const usermapper = new UserMapper()
const projectRepository = new ProjectRepository()
const projectmapper = new projectMapper()
const estimationRepository = new EstimationRepository()
const estimationmapper = new estimationMapper()
const stageRepository = new StageRepository()
const stageMapper = new stagemapper()
const adminRepository = new AdminRepository()

const signupUserUseCase = new SignupUserUseCase(userRepository)
const verifyOTPUseCase = new VerifyOTPUseCases(userRepository,hasher)
const resendOTPUseCase = new ResendOTPUseCase(userRepository)
const userLoginUseCase = new UserLoginUseCase(userRepository,hasher,jwtService,usermapper)
const googleauthuseCase = new GoogleloginUseCase(userRepository,jwtService,usermapper)
const sendotpUsecase = new SendOTPUseCase(userRepository)
const verifyforgotUsecase = new VerifyForgotUseCase(userRepository)
const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository,hasher)
const getUserProjectsUseCase = new GetAllProjectListInUserUseCase(projectRepository,projectmapper)
const fetchexistestimationusecase = new FetchExistEstimationUseCase(estimationRepository,estimationmapper)
const fetchStatusUseCase = new FetchStatusUseCase(stageRepository,stageMapper)
const fetchStatusBaseProjectUseCase = new FetchStatusBaseProjectUseCase(projectRepository,projectmapper)
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService,adminRepository)

export const injectAuthController = new AuthController(signupUserUseCase, verifyOTPUseCase, resendOTPUseCase, userLoginUseCase,  
   googleauthuseCase, sendotpUsecase,verifyforgotUsecase, updatePasswordUseCase,getUserProjectsUseCase,
   fetchexistestimationusecase,fetchStatusUseCase,fetchStatusBaseProjectUseCase,refreshTokenUseCase
)