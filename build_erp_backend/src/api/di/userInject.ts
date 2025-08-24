import { ChatRepository } from "../infrastructure/repositories/ChatRepository"
import { ProjectRepository } from "../infrastructure/repositories/ProjectRepository"
import { UserRepository } from "../infrastructure/repositories/UserRepository"
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher"
import { AuthProjectController } from "../api/controllers/user/AuthprojectController"
import { JwtService } from "../services/JwtService"
import { ChangePasswordUsecase } from "../application/usecases/UserAuthUsecase/ChangePasswordUseCase"
import { GoogleAuthUseCase } from "../application/usecases/UserAuthUsecase/GoogleAuthUseCase"
import { RefreshTokenUseCase } from "../application/usecases/UserAuthUsecase/RefreshTokenUseCase"
import { ResendOTPUseCase } from "../application/usecases/UserAuthUsecase/ResendOTPUseCase"
import { SendOTPUseCase } from "../application/usecases/UserAuthUsecase/SendOTPUseCase"
import { SignupUserUseCase } from "../application/usecases/UserAuthUsecase/SignupUserUseCase"
import { UpdatePasswordUseCase } from "../application/usecases/UserAuthUsecase/UpdatePasswordUseCase"
import { UpdateProfileImageUseCase } from "../application/usecases/UserAuthUsecase/UpdateProfileImageUseCase"
import { UpdateProfileUsecase } from "../application/usecases/UserAuthUsecase/UpdateProfileUseCase"
import { UserLoginUseCase } from "../application/usecases/UserAuthUsecase/UserLoginUseCase"
import { VerifyForgotUseCase } from "../application/usecases/UserAuthUsecase/VerifyForgotUseCase"
import { VerifyOTPUseCases } from "../application/usecases/UserAuthUsecase/VerifyOTPuseCases"
import { FetchStatusBaseProjectUseCase } from "../application/usecases/ProjectDisplayUseCase/fetchStatusBaseProjectUseCase"
import { FetchUserProjectUseCase } from "../application/usecases/ProjectDisplayUseCase/fetchUsersProjectUsecase"
import { GetSitemanagerListDataUseCase } from "../application/usecases/ProjectDisplayUseCase/getSitemanagerListDataUsecase"
import { GetMessageDataUseCase } from "../application/usecases/ChatUsecases/getMessageDataUsecase"
import { GetAllProjectListInUserUseCase } from "../application/usecases/ProjectDisplayUseCase/GetAllProjectListInUserUseCase"
import { AuthController } from "../controllers/Auth"



// ---------------------- User Project Injection ---------------------- //


const fetchUserprojectUseCase = new FetchUserProjectUseCase(projectRepository)
const fetchStatusBaseProjectUseCase = new FetchStatusBaseProjectUseCase(projectRepository)
export const InjectAuthprojectController = new AuthProjectController(fetchUserprojectUseCase, fetchStatusBaseProjectUseCase)
