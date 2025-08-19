import { AddSiteToProjectRepository } from "../infrastructure/repositories/AddSiteToProjectRepository"
import { AdminRepository } from "../infrastructure/repositories/AdminRepository"
import { AttendanceRepository } from "../infrastructure/repositories/AttendanceRepository"
import { BrandRepository } from "../infrastructure/repositories/BrandRepository"
import { CategoryRepository } from "../infrastructure/repositories/CategoryRepository"
import { EstimationRepository } from "../infrastructure/repositories/EstimationRepository"
import { LabourRepository } from "../infrastructure/repositories/LabourRepository"
import { MaterialRepository } from "../infrastructure/repositories/MaterialRepository"
import { ProjectRepository } from "../infrastructure/repositories/ProjectRepository"
import { ProjectStockRepository } from "../infrastructure/repositories/ProjectStockRepository"
import { PurchaseRepository } from "../infrastructure/repositories/PurchaseRepository"
import { ReceiveRepository } from "../infrastructure/repositories/ReceiveRepository"
import { SitemanagerRepository } from "../infrastructure/repositories/SitemanagerRepository"
import { SpecRepository } from "../infrastructure/repositories/SpecRepository"
import { StageRepository } from "../infrastructure/repositories/StageRepository"
import { TransferRepository } from "../infrastructure/repositories/TransferRepository"
import { UserRepository } from "../infrastructure/repositories/UserRepository"
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher"
import { AddSiteController } from "../api/controllers/admin/addSiteController"
import { AdminController } from "../api/controllers/admin/adminController"
import { EstimationController } from "../api/controllers/admin/estimationController"
import { LabourController } from "../api/controllers/admin/labourController"
import { MaterialController } from "../api/controllers/admin/materialController"
import { ProjectController } from "../api/controllers/admin/projectController"
import { SitemanagerController } from "../api/controllers/admin/sitemanagerController"
import { SpecController } from "../api/controllers/admin/specController"
import { StageController } from "../api/controllers/admin/stageController"
import { AdminLoginUseCase } from "../application/usecases/AdminUseCase/AdminLoginUseCase"
import { BudgetAndActualLabourUseCase } from "../application/usecases/AdminUseCase/BudgetAndActualLabourUseCase"
import { BudgetAndActualMaterialUseCase } from "../application/usecases/AdminUseCase/BudgetAndActualMaterialUsecase"
import { BudgetAndActualUseCase } from "../application/usecases/AdminUseCase/BudgetAndActualUseCase"
import { DeleteEstimationUseCase } from "../application/usecases/EstimationUseCase/DeleteEstimationUseCase"
import { DisplayEstimationUseCase } from "../application/usecases/EstimationUseCase/DisplayEstimationUseCase"
import { FetchExistEstimationUseCase } from "../application/usecases/EstimationUseCase/FetchExistEstimationUseCase"
import { SaveEstimationUseCase } from "../application/usecases/EstimationUseCase/saveEstimationUseCase"
import { UpdateEstimationUsecase } from "../application/usecases/EstimationUseCase/UpdateEstimationUseCase"
import { UploadEstimateImageUseCase } from "../application/usecases/EstimationUseCase/UploadEstimateImageUseCase"
import { AddLabourUseCase } from "../application/usecases/LabourUseCase/AddLabourUseCase"
import { DeleteLabourUseCase } from "../application/usecases/LabourUseCase/DeleteLabourUseCase"
import { DisplayAllLabourUseCase } from "../application/usecases/LabourUseCase/DisplayAllLabourUseCase"
import { FetchAllLabourUseCase } from "../application/usecases/LabourUseCase/fetchAllLabourUseCase"
import { FetchLabourByIdUseCase } from "../application/usecases/LabourUseCase/FetchLabourByIdUseCase"
import { UpdateLabourUseCase } from "../application/usecases/LabourUseCase/UpdateLabourUseCase"
import { AddMaterialUseCase } from "../application/usecases/MaterialUseCase/AddMaterialUseCase"
import { DeleteMaterialUseCase } from "../application/usecases/MaterialUseCase/DeleteMaterialUseCase"
import { DisplayAddMaterialDataUseCase } from "../application/usecases/MaterialUseCase/DisplayAddMaterialUseCase"
import { DisplayAllMaterialUseCase } from "../application/usecases/MaterialUseCase/DisplayAllMaterialUseCase"
import { FetchBrandByMaterialName } from "../application/usecases/MaterialUseCase/fetchBrandByMaterialName"
import { FetchMaterialByMaterialName } from "../application/usecases/MaterialUseCase/FetchmaterialByMaterialName"
import { FetchMaterialUseCase } from "../application/usecases/MaterialUseCase/FetchMaterialUseCase"
import { FetchUnitRateUseCase } from "../application/usecases/MaterialUseCase/fetChUnitRateUseCase"
import { FindlabourSumUsecase } from "../application/usecases/MaterialUseCase/FindLabourSumUseCase"
import { FindMaterialByIdUseCase } from "../application/usecases/MaterialUseCase/FindMaterialByIdUseCase"
import { FindmaterialSumUseCase } from "../application/usecases/MaterialUseCase/FindMaterialSumUseCase"
import { GetEditMaterialUseCase } from "../application/usecases/MaterialUseCase/GetEditMaterialUseCase"
import { UpdateMaterialUseCase } from "../application/usecases/MaterialUseCase/UpdateMaterialUseCase"
import { AddProjectUseCase } from "../application/usecases/ProjectUseCase/AddProjectUseCase"
import { ChangeStatusUseCase } from "../application/usecases/ProjectUseCase/ChangeStatusUseCase"
import { DeleteProjectUseCase } from "../application/usecases/ProjectUseCase/DeleteProjectUseCase"
import { DisplayAddProjectUseCase } from "../application/usecases/ProjectUseCase/DisplayAddProjectUseCase"
import { DisplayAllProjectUseCase } from "../application/usecases/ProjectUseCase/DisplayAllProjectUseCase"
import { EditProjectUseCase } from "../application/usecases/ProjectUseCase/EditProjectUseCase"
import { FetchProjectUseCase } from "../application/usecases/ProjectUseCase/fetchProjectUseCase"
import { AddSiteToprojectFetchProjectUseCase } from "../application/usecases/SiteManagerUsecase/AddSiteToprojectFetchProjectUseCase"
import { AddSiteToprojectFetchSitemanagerUseCase } from "../application/usecases/SiteManagerUsecase/AddSiteToprojectFetchSitemanagerUseCase"
import { AddSiteToProjectUseCase } from "../application/usecases/SiteManagerUsecase/AddSiteToProjectUseCase"
import { DeleteSiteToProjectUseCase } from "../application/usecases/SiteManagerUsecase/DeleteSitemanagerInProjectUseCase"
import { DeleteSitemanagerUseCase } from "../application/usecases/SiteManagerUsecase/DeleteSitemanagerUseCase"
import { DisplayAllSitemanagerUseCase } from "../application/usecases/SiteManagerUsecase/DisplayAllsitemanagerUseCase"
import { ListSiteToProject } from "../application/usecases/SiteManagerUsecase/ListSiteToProjectUseCase"
import { SaveSitemanagerUseCase } from "../application/usecases/SiteManagerUsecase/SaveSitemanagerUseCase"
import { UpdateSitemanagerUseCase } from "../application/usecases/SiteManagerUsecase/UpdateSitemanagerUseCase"
import { DeleteSpecUseCase } from "../application/usecases/SpecUsecase/DeleteSpecUseCase"
import { getSpecUseCase } from "../application/usecases/SpecUsecase/getSpecUseCase"
import { SpeclistUseCase } from "../application/usecases/SpecUsecase/SpeclistUseCase"
import { SaveSpecUseCase } from "../application/usecases/SpecUsecase/SpecSaveUseCase"
import { SpecSumUseCase } from "../application/usecases/SpecUsecase/specSumUseCase"
import { UpdateSpecUseCase } from "../application/usecases/SpecUsecase/UpdateSpecUseCase"
import { DeleteStageUseCase } from "../application/usecases/StageUseCase/DeleteStageUseCase"
import { FetchCostUseCase } from "../application/usecases/StageUseCase/FetchCostUseCase"
import { FetchStageUsecase } from "../application/usecases/StageUseCase/FetchStageUseCase"
import { StageSaveUseCase } from "../application/usecases/StageUseCase/StageSaveUseCase"
import { UpdateStageUseCase } from "../application/usecases/StageUseCase/UpdateStageUseCase"
import { deleteUnitUseCase } from "../application/usecases/UnitUseCase/DeleteUnitUseCase"
import { DisplayAllUnitUseCase } from "../application/usecases/UnitUseCase/DisplayAllUnitUseCase"
import { FetchUnitUseCase } from "../application/usecases/UnitUseCase/FetchUnitUseCase"
import { SaveUnitUseCase } from "../application/usecases/UnitUseCase/SaveUnitUseCase"
import { updateUnitUseCase } from "../application/usecases/UnitUseCase/updateUnitUseCase"
import { ListProjectUseCase } from "../application/usecases/StageStatusUpdationUseCase/ListProjectUseCase"
import { JwtService } from "../services/JwtService"
import { UnitRepository } from "../infrastructure/repositories/UnitRepository"
import { SitemanagerLoginUseCase } from "../application/usecases/SitemanagerAuthenticationUseCase/SitemanagerLoginUseCase"



// ---------------------- Admin Injection ---------------------- //

const adminRepository = new AdminRepository()
const jwtService = new JwtService()
const adminLoginUsecase = new AdminLoginUseCase(adminRepository, jwtService)
export const injectedAdminController = new AdminController(adminLoginUsecase)

// ---------------------- Category Injection ---------------------- //


const materialRepository = new MaterialRepository()
const categoryRepository = new CategoryRepository()
const brandRepository = new BrandRepository()
const projectStockRepository = new ProjectStockRepository()
const specRepository = new SpecRepository()
const unitRepository = new UnitRepository()
const displayAllMaterialUseCase = new DisplayAllMaterialUseCase(materialRepository)
const getAddMaterialUseCase = new DisplayAddMaterialDataUseCase(materialRepository, categoryRepository, brandRepository, unitRepository)
const saveMaterialUseCase = new AddMaterialUseCase(materialRepository, projectStockRepository)
const getEditMaterialUseCase = new GetEditMaterialUseCase(materialRepository, categoryRepository, brandRepository, unitRepository, projectStockRepository)
const updateMaterialUseCase = new UpdateMaterialUseCase(materialRepository, projectStockRepository)
const deleteMaterialUseCase = new DeleteMaterialUseCase(materialRepository, projectStockRepository, specRepository)
const fetchMaterialUseCase = new FetchMaterialUseCase(materialRepository)
const fetchMaterialByMaterialName = new FetchMaterialByMaterialName(materialRepository)
const fetchbrandByname = new FetchBrandByMaterialName(materialRepository)
const fetUnitRateUseCase = new FetchUnitRateUseCase(materialRepository)
const findMaterialByIdUsecase = new FindMaterialByIdUseCase(materialRepository)
export const injectedMaterialController = new MaterialController(displayAllMaterialUseCase, getAddMaterialUseCase, saveMaterialUseCase,
   getEditMaterialUseCase, updateMaterialUseCase, deleteMaterialUseCase, fetchMaterialUseCase, fetchMaterialByMaterialName, fetchbrandByname, fetUnitRateUseCase, findMaterialByIdUsecase)


// ---------------------- Project Injection ---------------------- //

const projectRepository = new ProjectRepository()
const userRepository = new UserRepository()
const estimationRepository = new EstimationRepository()
const displayProjectUseCase = new DisplayAllProjectUseCase(projectRepository)
const displayAddProjectUseCase = new DisplayAddProjectUseCase(userRepository)
const addProjectUseCase = new AddProjectUseCase(projectRepository)
const editProjectUseCase = new EditProjectUseCase(projectRepository)
const removeProjectUseCase = new DeleteProjectUseCase(projectRepository, projectStockRepository, estimationRepository)
const changeStatusUseCase = new ChangeStatusUseCase(projectRepository)
const fetchProjectUseCase = new FetchProjectUseCase(projectRepository)
export const injectedProjectController = new ProjectController(displayProjectUseCase, displayAddProjectUseCase, addProjectUseCase, editProjectUseCase, removeProjectUseCase, changeStatusUseCase, fetchProjectUseCase)


// ---------------------- Project Injection ---------------------- //

const labourRepository = new LabourRepository()
const fetchLabourByIdUseCase = new FetchLabourByIdUseCase(labourRepository)
const fetchallLabourusecase = new FetchAllLabourUseCase(labourRepository)
const displayAllLabourUseCase = new DisplayAllLabourUseCase(labourRepository)
const addLabourUseCase = new AddLabourUseCase(labourRepository)
const updateLabourUseCase = new UpdateLabourUseCase(labourRepository)
const deleteLabourUseCase = new DeleteLabourUseCase(labourRepository, specRepository)
export const injectedLabourController = new LabourController(displayAllLabourUseCase, addLabourUseCase, updateLabourUseCase, deleteLabourUseCase, fetchallLabourusecase, fetchLabourByIdUseCase)

// ---------------------- Sitemanager Injection ---------------------- //

const Hasher = new BcryptHasher()
const sitemanagerRepository = new SitemanagerRepository()
const displayAllSitemanagerUseCase = new DisplayAllSitemanagerUseCase(sitemanagerRepository)
const addSitemanagerUseCase = new SaveSitemanagerUseCase(sitemanagerRepository)
const editSitemanagerUsecase = new UpdateSitemanagerUseCase(sitemanagerRepository)
const deleteSitemanagerUseCase = new DeleteSitemanagerUseCase(sitemanagerRepository)
const listProjectUseCase = new ListProjectUseCase(projectRepository)
const sitemanagerLoginUseCase = new SitemanagerLoginUseCase(sitemanagerRepository,jwtService,Hasher)
export const injectedSitemanagerController = new SitemanagerController(displayAllSitemanagerUseCase, addSitemanagerUseCase, editSitemanagerUsecase, deleteSitemanagerUseCase, sitemanagerLoginUseCase, listProjectUseCase)

// ---------------------- Add Sitemanager To Project Injection ---------------------- //

const addSiteToprojectRepoSitory = new AddSiteToProjectRepository()
const addSiteToProjectUseCase = new AddSiteToProjectUseCase(projectRepository)
const listSiteToProjectUseCase = new ListSiteToProject(addSiteToprojectRepoSitory)
const deleteSitetoprojectuseCase = new DeleteSiteToProjectUseCase(projectRepository)
const addSiteToprojectFetchProjectUseCase = new AddSiteToprojectFetchProjectUseCase(addSiteToprojectRepoSitory)
const addSiteToprojectFetchSitemanagerUseCase = new AddSiteToprojectFetchSitemanagerUseCase(addSiteToprojectRepoSitory)
export const injectAddSiteController = new AddSiteController(addSiteToProjectUseCase, listSiteToProjectUseCase, deleteSitetoprojectuseCase, addSiteToprojectFetchProjectUseCase, addSiteToprojectFetchSitemanagerUseCase)


// ----------------------Specification Injection ---------------------- //

const speclistusecase = new SpeclistUseCase(specRepository)
const specSaveuseCase = new SaveSpecUseCase(specRepository)
const specsumusecase = new SpecSumUseCase(materialRepository, labourRepository)
const deleteSpecusecase = new DeleteSpecUseCase(specRepository, estimationRepository)
const getspecUseCase = new getSpecUseCase(specRepository)
const findmaterialSumusecase = new FindmaterialSumUseCase(materialRepository)
const findlaboursumusecase = new FindlabourSumUsecase(labourRepository)
const updateSpecUseCase = new UpdateSpecUseCase(specRepository)
export const injectSpecController = new SpecController(speclistusecase, specSaveuseCase, specsumusecase, deleteSpecusecase, getspecUseCase, findmaterialSumusecase, findlaboursumusecase, updateSpecUseCase)

// ----------------------Estimation Injection ---------------------- //

const stageRepository = new StageRepository()
const saveestimationuseCase = new SaveEstimationUseCase(estimationRepository)
const displayEstimationUseCase = new DisplayEstimationUseCase(estimationRepository)
const deleteEstimationuseCase = new DeleteEstimationUseCase(estimationRepository, stageRepository)
const uploadestimationUsecase = new UploadEstimateImageUseCase(projectRepository)
const fetchexistestimationusecase = new FetchExistEstimationUseCase(estimationRepository)
const updateEstimationUsecase = new UpdateEstimationUsecase(estimationRepository, stageRepository)
export const injectEstimationController = new EstimationController(saveestimationuseCase, displayEstimationUseCase, deleteEstimationuseCase, uploadestimationUsecase, fetchexistestimationusecase, updateEstimationUsecase)

// ----------------------Stage Injection ---------------------- //

const fetchCostusecase = new FetchCostUseCase(estimationRepository)
const stagesaveusecase = new StageSaveUseCase(projectRepository, stageRepository)
const fetchStageusecase = new FetchStageUsecase(projectRepository)
const deletestageusecase = new DeleteStageUseCase(stageRepository)
const updateStageUseCase = new UpdateStageUseCase(stageRepository, projectRepository)
export const injectStageController = new StageController(fetchCostusecase, stagesaveusecase, fetchStageusecase, deletestageusecase, updateStageUseCase)


const purchaseRepository = new PurchaseRepository()
const transferRepository = new TransferRepository()
const receiveRepository = new ReceiveRepository()
const attendanceRepository = new AttendanceRepository()
const bugetAndActualuseCase = new BudgetAndActualUseCase(projectRepository,purchaseRepository,transferRepository,receiveRepository,attendanceRepository)
const bugetAndActualMaterialUseCase = new BudgetAndActualMaterialUseCase(projectRepository,purchaseRepository,transferRepository,receiveRepository,estimationRepository)
const bugetAndActualLabourUseCase = new BudgetAndActualLabourUseCase(projectRepository,estimationRepository,attendanceRepository)


