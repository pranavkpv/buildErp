import { ProjectMapper } from "../../application/Mapper/project.mapper";
import { sitemanagerMapper } from "../../application/Mapper/sitemanager.mapper.ts";
import { JwtService } from "../../application/services/JwtService";
import { BlackListUsecase } from "../../application/UseCase/Auth/Blacklist";
import { DeleteSitemanagerUseCase } from "../../application/UseCase/SiteManager/DeleteSitemanager";
import { DisplayAllSitemanagerUseCase } from "../../application/UseCase/SiteManager/DisplayAllsitemanager";
import { SaveSitemanagerUseCase } from "../../application/UseCase/SiteManager/SaveSitemanager";
import { SitemanagerLoginUseCase } from "../../application/UseCase/SiteManager/SitemanagerLogin";
import { UpdateSitemanagerUseCase } from "../../application/UseCase/SiteManager/UpdateSitemanager";
import { UpdateSitemanagerPasswordUseCase } from "../../application/UseCase/SiteManager/UpdateSitemanagerPassword";
import { ListProjectUseCase } from "../../application/UseCase/StageStatusUpdation/ListProject";
import { BcryptHasher } from "../../infrastructure/Repositories/BcryptHasher";
import { ProjectRepository } from "../../infrastructure/Repositories/Project";
import { SitemanagerRepository } from "../../infrastructure/Repositories/Sitemanager";
import { UserRepository } from "../../infrastructure/Repositories/User";
import { SitemanagerController } from "../controllers/Sitemanager";

const sitemanagerRepository = new SitemanagerRepository()
const sitemanagermapper = new sitemanagerMapper()
const jwtService = new JwtService()
const Hasher = new BcryptHasher()
const projectRepository = new ProjectRepository()
const userRepository = new UserRepository()
const projectMapper = new ProjectMapper()
const displayAllSitemanagerUseCase = new DisplayAllSitemanagerUseCase(sitemanagerRepository,sitemanagermapper)
const addSitemanagerUseCase = new SaveSitemanagerUseCase(sitemanagerRepository)
const editSitemanagerUsecase = new UpdateSitemanagerUseCase(sitemanagerRepository)
const deleteSitemanagerUseCase = new DeleteSitemanagerUseCase(sitemanagerRepository)
const sitemanagerLoginUseCase = new SitemanagerLoginUseCase(sitemanagerRepository,jwtService,Hasher)
const listProjectUseCase = new ListProjectUseCase(projectRepository,projectMapper)
const blacklistusecase = new BlackListUsecase(userRepository)
const updateSitemanagerPassword = new UpdateSitemanagerPasswordUseCase(sitemanagerRepository,Hasher)
export const injectedSitemanagerController = new SitemanagerController(displayAllSitemanagerUseCase,addSitemanagerUseCase,editSitemanagerUsecase,deleteSitemanagerUseCase,sitemanagerLoginUseCase,listProjectUseCase,jwtService,blacklistusecase,updateSitemanagerPassword)