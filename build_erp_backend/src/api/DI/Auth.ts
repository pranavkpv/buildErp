import { EstimationMapper } from "../../application/Mapper/estimation.mapper";
import { ProjectMapper } from "../../application/Mapper/project.mapper";
import { Stagemapper } from "../../application/Mapper/stage.mapper";
import { UserMapper } from "../../application/Mapper/user.mapper";
import { JwtService } from "../../application/services/JwtService";
import { GetAllProjectListInUserUseCase } from "../../application/UseCase/Auth/GetallProjectInUser";
import { GoogleloginUseCase } from "../../application/UseCase/Auth/GoogleLogin";
import { RefreshTokenUseCase } from "../../application/UseCase/Auth/RefreshToken";
import { ResendOTPUseCase } from "../../application/UseCase/Auth/ResendOtp";
import { SendOTPUseCase } from "../../application/UseCase/Auth/SendOtp";
import { SignupUserUseCase } from "../../application/UseCase/Auth/Signup";
import { UpdatePasswordUseCase } from "../../application/UseCase/Auth/Updatepassword";
import { UserLoginUseCase } from "../../application/UseCase/Auth/UserLogin";
import { VerifyForgotUseCase } from "../../application/UseCase/Auth/VerifyForgotPasswordOtp";
import { VerifyOTPUseCases } from "../../application/UseCase/Auth/VerifyOtp";
import { FetchExistEstimationUseCase } from "../../application/UseCase/Estimation/FetchExistEstimation";
import { FetchStatusBaseProjectUseCase } from "../../application/UseCase/Project/FetchStatusBaseProject";
import { FetchStatusUseCase } from "../../application/UseCase/StageStatusUpdation/FetchStageStatus";
import { AdminRepository } from "../../infrastructure/Repositories/Admin";
import { BcryptHasher } from "../../infrastructure/Repositories/BcryptHasher";
import { EstimationRepository } from "../../infrastructure/Repositories/Estimation";
import { ProjectRepository } from "../../infrastructure/Repositories/Project";
import { SitemanagerRepository } from "../../infrastructure/Repositories/Sitemanager";
import { StageRepository } from "../../infrastructure/Repositories/Stage";
import { UserRepository } from "../../infrastructure/Repositories/User";
import { AuthController } from "../controllers/Auth";

const userRepository = new UserRepository()
const hasher = new BcryptHasher()
const jwtService = new JwtService()
const usermapper = new UserMapper()
const projectmapper = new ProjectMapper()
const projectRepository = new ProjectRepository()
const estimationRepository = new EstimationRepository()
const estimationMapper = new EstimationMapper()
const stageRepository = new StageRepository()
const stagemapper = new Stagemapper()
const adminRepository = new AdminRepository()
const sitemanagerRepository = new SitemanagerRepository()
const signupUserUseCase = new SignupUserUseCase(userRepository)
const verifyOtpUseCase = new VerifyOTPUseCases(userRepository,hasher)
const resendOtpUseCase = new ResendOTPUseCase(userRepository)
const userLoginUseCase = new UserLoginUseCase(userRepository,hasher,jwtService,usermapper)
const googleAuthUseCase = new GoogleloginUseCase(userRepository,jwtService,usermapper)
const sendOtpUseCase = new SendOTPUseCase(userRepository)
const verifyForgotOtpUseCase = new VerifyForgotUseCase(userRepository)
const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository,hasher)
const getUserProjectsUseCase = new GetAllProjectListInUserUseCase(projectRepository,projectmapper)
const fetchexistestimationusecase = new FetchExistEstimationUseCase(estimationRepository,estimationMapper)
const fetchStatusUseCase = new FetchStatusUseCase(stageRepository,stagemapper)
const fetchStatusBaseProjectUseCase = new FetchStatusBaseProjectUseCase(projectRepository,projectmapper)
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository,jwtService,adminRepository,sitemanagerRepository)
export const injectAuthController = new AuthController(signupUserUseCase,verifyOtpUseCase,resendOtpUseCase,userLoginUseCase,googleAuthUseCase,sendOtpUseCase,verifyForgotOtpUseCase,updatePasswordUseCase,getUserProjectsUseCase,fetchexistestimationusecase,fetchStatusUseCase,fetchStatusBaseProjectUseCase,refreshTokenUseCase)