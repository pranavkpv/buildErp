



// ---------------------- Admin Injection ---------------------- //

import { estimationMapper } from "../../application/Mapper/estimation.mapper"
import { labourMapper } from "../../application/Mapper/labour.mapper"
import { sitemanagerMapper } from "../../application/Mapper/sitemanager.mapper.ts"
import { specificationMapper } from "../../application/Mapper/specification.mapper"
import { JwtService } from "../../application/services/JwtService"
import { AdminLoginUseCase } from "../../application/usecases/AdminUseCase/AdminLoginUseCase"
import { DeleteEstimationUseCase } from "../../application/usecases/EstimationUseCase/DeleteEstimationUseCase"
import { DisplayEstimationUseCase } from "../../application/usecases/EstimationUseCase/DisplayEstimationUseCase"
import { FetchSpecListinEstimationUsecase } from "../../application/usecases/EstimationUseCase/FetchSpecListinEstimationUsecae"
import { SaveEstimationUseCase } from "../../application/usecases/EstimationUseCase/saveEstimationUseCase"
import { UpdateEstimationUsecase } from "../../application/usecases/EstimationUseCase/UpdateEstimationUseCase"
import { UploadEstimateImageUseCase } from "../../application/usecases/EstimationUseCase/UploadEstimateImageUseCase"
import { AddLabourUseCase } from "../../application/usecases/LabourUseCase/AddLabourUseCase"
import { DeleteLabourUseCase } from "../../application/usecases/LabourUseCase/DeleteLabourUseCase"
import { DisplayAllLabourUseCase } from "../../application/usecases/LabourUseCase/DisplayAllLabourUseCase"
import { FetchAllLabourUseCase } from "../../application/usecases/LabourUseCase/fetchAllLabourUseCase"
import { FetchLabourByIdUseCase } from "../../application/usecases/LabourUseCase/FetchLabourByIdUseCase"
import { UpdateLabourUseCase } from "../../application/usecases/LabourUseCase/UpdateLabourUseCase"
import { FindlabourSumUsecase } from "../../application/usecases/MaterialUseCase/FindLabourSumUseCase"
import { FindmaterialSumUseCase } from "../../application/usecases/MaterialUseCase/FindMaterialSumUseCase"
import { SitemanagerLoginUseCase } from "../../application/usecases/SitemanagerAuthenticationUseCase/SitemanagerLoginUseCase"
import { DeleteSitemanagerUseCase } from "../../application/usecases/SiteManagerUsecase/DeleteSitemanagerUseCase"
import { DisplayAllSitemanagerUseCase } from "../../application/usecases/SiteManagerUsecase/DisplayAllsitemanagerUseCase"
import { SaveSitemanagerUseCase } from "../../application/usecases/SiteManagerUsecase/SaveSitemanagerUseCase"
import { UpdateSitemanagerUseCase } from "../../application/usecases/SiteManagerUsecase/UpdateSitemanagerUseCase"
import { DeleteSpecUseCase } from "../../application/usecases/SpecUsecase/DeleteSpecUseCase"
import { getSpecUseCase } from "../../application/usecases/SpecUsecase/getSpecUseCase"
import { SpeclistUseCase } from "../../application/usecases/SpecUsecase/SpeclistUseCase"
import { SaveSpecUseCase } from "../../application/usecases/SpecUsecase/SpecSaveUseCase"
import { SpecSumUseCase } from "../../application/usecases/SpecUsecase/specSumUseCase"
import { UpdateSpecUseCase } from "../../application/usecases/SpecUsecase/UpdateSpecUseCase"
import { ListProjectUseCase } from "../../application/usecases/StageStatusUpdationUseCase/ListProjectUseCase"
import { BlackListUsecase } from "../../application/usecases/user.auth.usecase/Blacklist.usecase"
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository"
import { EstimationRepository } from "../../infrastructure/repositories/EstimationRepository"
import { LabourRepository } from "../../infrastructure/repositories/LabourRepository"
import { MaterialRepository } from "../../infrastructure/repositories/MaterialRepository"
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository"
import { SitemanagerRepository } from "../../infrastructure/repositories/SitemanagerRepository"
import { SpecRepository } from "../../infrastructure/repositories/SpecRepository"
import { StageRepository } from "../../infrastructure/repositories/StageRepository"
import { UserRepository } from "../../infrastructure/repositories/user.repository"
import { BcryptHasher } from "../../infrastructure/secuirity/BcryptHasher"
import { AdminController } from "../controllers/Admin"
import { EstimationController } from "../controllers/Estimation"
import { LabourController } from "../controllers/Labour"
import { SitemanagerController } from "../controllers/Sitemanager"
import { SpecController } from "../controllers/Specification"

const adminRepository = new AdminRepository()
const jwtService = new JwtService()
const userRepository = new UserRepository()
const blacklistusecase = new BlackListUsecase(userRepository)
const adminLoginUsecase = new AdminLoginUseCase(adminRepository, jwtService)
export const injectedAdminController = new AdminController(adminLoginUsecase,blacklistusecase,jwtService)



// ---------------------- Project Injection ---------------------- //

const labourRepository = new LabourRepository()
const labourmapper = new labourMapper()
const specRepository = new SpecRepository()
const fetchLabourByIdUseCase = new FetchLabourByIdUseCase(labourRepository,labourmapper)
const fetchallLabourusecase = new FetchAllLabourUseCase(labourRepository,labourmapper)
const displayAllLabourUseCase = new DisplayAllLabourUseCase(labourRepository,labourmapper)
const addLabourUseCase = new AddLabourUseCase(labourRepository)
const updateLabourUseCase = new UpdateLabourUseCase(labourRepository)
const deleteLabourUseCase = new DeleteLabourUseCase(labourRepository, specRepository)
export const injectedLabourController = new LabourController(displayAllLabourUseCase, addLabourUseCase, updateLabourUseCase, deleteLabourUseCase, fetchallLabourusecase, fetchLabourByIdUseCase)

// ---------------------- Sitemanager Injection ---------------------- //

const Hasher = new BcryptHasher()
const sitemanagerRepository = new SitemanagerRepository()
const sitemanagermapper = new sitemanagerMapper()
const projectRepository = new ProjectRepository()
const displayAllSitemanagerUseCase = new DisplayAllSitemanagerUseCase(sitemanagerRepository,sitemanagermapper)
const addSitemanagerUseCase = new SaveSitemanagerUseCase(sitemanagerRepository)
const editSitemanagerUsecase = new UpdateSitemanagerUseCase(sitemanagerRepository)
const deleteSitemanagerUseCase = new DeleteSitemanagerUseCase(sitemanagerRepository)
const listProjectUseCase = new ListProjectUseCase(projectRepository)
const sitemanagerLoginUseCase = new SitemanagerLoginUseCase(sitemanagerRepository,jwtService,Hasher)
export const injectedSitemanagerController = new SitemanagerController(displayAllSitemanagerUseCase, addSitemanagerUseCase, editSitemanagerUsecase, deleteSitemanagerUseCase, 
   sitemanagerLoginUseCase, listProjectUseCase,jwtService,blacklistusecase)


const materialRepository = new MaterialRepository()
const specificationmapper = new specificationMapper()
const estimationRepository = new EstimationRepository()
const speclistusecase = new SpeclistUseCase(specRepository)
const specSaveuseCase = new SaveSpecUseCase(specRepository)
const specsumusecase = new SpecSumUseCase(materialRepository, labourRepository)
const deleteSpecusecase = new DeleteSpecUseCase(specRepository, estimationRepository)
const getspecUseCase = new getSpecUseCase(specRepository,specificationmapper)
const findmaterialSumusecase = new FindmaterialSumUseCase(materialRepository)
const findlaboursumusecase = new FindlabourSumUsecase(labourRepository)
const updateSpecUseCase = new UpdateSpecUseCase(specRepository)
export const injectSpecController = new SpecController(getspecUseCase,findmaterialSumusecase,findlaboursumusecase,speclistusecase, specSaveuseCase, specsumusecase, deleteSpecusecase, updateSpecUseCase)

// ----------------------Estimation Injection ---------------------- //

const stageRepository = new StageRepository()
const estimationmapper = new estimationMapper()
const saveestimationuseCase = new SaveEstimationUseCase(estimationRepository)
const displayEstimationUseCase = new DisplayEstimationUseCase(estimationRepository,estimationmapper)
const deleteEstimationuseCase = new DeleteEstimationUseCase(estimationRepository, stageRepository)
const uploadestimationUsecase = new UploadEstimateImageUseCase(projectRepository)
const fetchSpecListUsingEstimationUsecase = new FetchSpecListinEstimationUsecase(estimationRepository,estimationmapper)
const updateEstimationUsecase = new UpdateEstimationUsecase(estimationRepository, stageRepository)

export const injectEstimationController = new EstimationController(saveestimationuseCase,deleteEstimationuseCase,updateEstimationUsecase, displayEstimationUseCase, uploadestimationUsecase,fetchSpecListUsingEstimationUsecase)




