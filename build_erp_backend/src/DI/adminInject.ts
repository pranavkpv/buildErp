import { AddSiteToProjectRepository } from "../infrastructure/persistence/AddSiteToProjectRepository"
import { AdminRepository } from "../infrastructure/persistence/AdminRepository"
import { AttendanceRepository } from "../infrastructure/persistence/AttendanceRepository"
import { BrandRepository } from "../infrastructure/persistence/BrandRepository"
import { CategoryRepository } from "../infrastructure/persistence/CategoryRepository"
import { EstimationRepository } from "../infrastructure/persistence/EstimationRepository"
import { LabourRepository } from "../infrastructure/persistence/LabourRepository"
import { MaterialRepository } from "../infrastructure/persistence/MaterialRepository"
import { ProjectRepository } from "../infrastructure/persistence/ProjectRepository"
import { ProjectStockRepository } from "../infrastructure/persistence/ProjectStockRepository"
import { PurchaseRepository } from "../infrastructure/persistence/PurchaseRepository"
import { ReceiveRepository } from "../infrastructure/persistence/ReceiveRepository"
import { SitemanagerRepository } from "../infrastructure/persistence/SitemanagerRepository"
import { SpecRepository } from "../infrastructure/persistence/SpecRepository"
import { StageRepository } from "../infrastructure/persistence/StageRepository"
import { TransferRepository } from "../infrastructure/persistence/TransferRepository"
import { UserRepository } from "../infrastructure/persistence/UserRepository"
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher"
import { AddSiteController } from "../infrastructure/web/controllers/admin/addSiteController"
import { AdminController } from "../infrastructure/web/controllers/admin/adminController"
import { AdminDashboardController } from "../infrastructure/web/controllers/admin/dashboardController"
import { EstimationController } from "../infrastructure/web/controllers/admin/estimationController"
import { LabourController } from "../infrastructure/web/controllers/admin/labourController"
import { MaterialController } from "../infrastructure/web/controllers/admin/materialController"
import { ProjectController } from "../infrastructure/web/controllers/admin/projectController"
import { SitemanagerController } from "../infrastructure/web/controllers/admin/sitemanagerController"
import { SpecController } from "../infrastructure/web/controllers/admin/specController"
import { StageController } from "../infrastructure/web/controllers/admin/stageController"
import { AdminLoginUseCase } from "../useCases/AdminUseCase/AdminLoginUseCase"
import { BudgetAndActualLabourUseCase } from "../useCases/AdminUseCase/BudgetAndActualLabourUseCase"
import { BudgetAndActualMaterialUseCase } from "../useCases/AdminUseCase/BudgetAndActualMaterialUsecase"
import { BudgetAndActualUseCase } from "../useCases/AdminUseCase/BudgetAndActualUseCase"
import { DeleteEstimationUseCase } from "../useCases/EstimationUseCase/DeleteEstimationUseCase"
import { DisplayEstimationUseCase } from "../useCases/EstimationUseCase/DisplayEstimationUseCase"
import { FetchExistEstimationUseCase } from "../useCases/EstimationUseCase/FetchExistEstimationUseCase"
import { SaveEstimationUseCase } from "../useCases/EstimationUseCase/saveEstimationUseCase"
import { UpdateEstimationUsecase } from "../useCases/EstimationUseCase/UpdateEstimationUseCase"
import { UploadEstimateImageUseCase } from "../useCases/EstimationUseCase/UploadEstimateImageUseCase"
import { AddLabourUseCase } from "../useCases/LabourUseCase/AddLabourUseCase"
import { DeleteLabourUseCase } from "../useCases/LabourUseCase/DeleteLabourUseCase"
import { DisplayAllLabourUseCase } from "../useCases/LabourUseCase/DisplayAllLabourUseCase"
import { FetchAllLabourUseCase } from "../useCases/LabourUseCase/fetchAllLabourUseCase"
import { FetchLabourByIdUseCase } from "../useCases/LabourUseCase/FetchLabourByIdUseCase"
import { UpdateLabourUseCase } from "../useCases/LabourUseCase/UpdateLabourUseCase"
import { AddMaterialUseCase } from "../useCases/MaterialUseCase/AddMaterialUseCase"
import { DeleteMaterialUseCase } from "../useCases/MaterialUseCase/DeleteMaterialUseCase"
import { DisplayAddMaterialDataUseCase } from "../useCases/MaterialUseCase/DisplayAddMaterialUseCase"
import { DisplayAllMaterialUseCase } from "../useCases/MaterialUseCase/DisplayAllMaterialUseCase"
import { FetchBrandByMaterialName } from "../useCases/MaterialUseCase/fetchBrandByMaterialName"
import { FetchMaterialByMaterialName } from "../useCases/MaterialUseCase/FetchmaterialByMaterialName"
import { FetchMaterialUseCase } from "../useCases/MaterialUseCase/FetchMaterialUseCase"
import { FetchUnitRateUseCase } from "../useCases/MaterialUseCase/fetChUnitRateUseCase"
import { FindlabourSumUsecase } from "../useCases/MaterialUseCase/FindLabourSumUseCase"
import { FindMaterialByIdUseCase } from "../useCases/MaterialUseCase/FindMaterialByIdUseCase"
import { FindmaterialSumUseCase } from "../useCases/MaterialUseCase/FindMaterialSumUseCase"
import { GetEditMaterialUseCase } from "../useCases/MaterialUseCase/GetEditMaterialUseCase"
import { UpdateMaterialUseCase } from "../useCases/MaterialUseCase/UpdateMaterialUseCase"
import { AddProjectUseCase } from "../useCases/ProjectUseCase/AddProjectUseCase"
import { ChangeStatusUseCase } from "../useCases/ProjectUseCase/ChangeStatusUseCase"
import { DeleteProjectUseCase } from "../useCases/ProjectUseCase/DeleteProjectUseCase"
import { DisplayAddProjectUseCase } from "../useCases/ProjectUseCase/DisplayAddProjectUseCase"
import { DisplayAllProjectUseCase } from "../useCases/ProjectUseCase/DisplayAllProjectUseCase"
import { EditProjectUseCase } from "../useCases/ProjectUseCase/EditProjectUseCase"
import { FetchProjectUseCase } from "../useCases/ProjectUseCase/fetchProjectUseCase"
import { AddSiteToprojectFetchProjectUseCase } from "../useCases/SiteManagerUsecase/AddSiteToprojectFetchProjectUseCase"
import { AddSiteToprojectFetchSitemanagerUseCase } from "../useCases/SiteManagerUsecase/AddSiteToprojectFetchSitemanagerUseCase"
import { AddSiteToProjectUseCase } from "../useCases/SiteManagerUsecase/AddSiteToProjectUseCase"
import { DeleteSiteToProjectUseCase } from "../useCases/SiteManagerUsecase/DeleteSitemanagerInProjectUseCase"
import { DeleteSitemanagerUseCase } from "../useCases/SiteManagerUsecase/DeleteSitemanagerUseCase"
import { DisplayAllSitemanagerUseCase } from "../useCases/SiteManagerUsecase/DisplayAllsitemanagerUseCase"
import { ListSiteToProject } from "../useCases/SiteManagerUsecase/ListSiteToProjectUseCase"
import { SaveSitemanagerUseCase } from "../useCases/SiteManagerUsecase/SaveSitemanagerUseCase"
import { UpdateSitemanagerUseCase } from "../useCases/SiteManagerUsecase/UpdateSitemanagerUseCase"
import { DeleteSpecUseCase } from "../useCases/SpecUsecase/DeleteSpecUseCase"
import { getSpecUseCase } from "../useCases/SpecUsecase/getSpecUseCase"
import { SpeclistUseCase } from "../useCases/SpecUsecase/SpeclistUseCase"
import { SaveSpecUseCase } from "../useCases/SpecUsecase/SpecSaveUseCase"
import { SpecSumUseCase } from "../useCases/SpecUsecase/specSumUseCase"
import { UpdateSpecUseCase } from "../useCases/SpecUsecase/UpdateSpecUseCase"
import { DeleteStageUseCase } from "../useCases/StageUseCase/DeleteStageUseCase"
import { FetchCostUseCase } from "../useCases/StageUseCase/FetchCostUseCase"
import { FetchStageUsecase } from "../useCases/StageUseCase/FetchStageUseCase"
import { StageSaveUseCase } from "../useCases/StageUseCase/StageSaveUseCase"
import { UpdateStageUseCase } from "../useCases/StageUseCase/UpdateStageUseCase"
import { deleteUnitUseCase } from "../useCases/UnitUseCase/DeleteUnitUseCase"
import { DisplayAllUnitUseCase } from "../useCases/UnitUseCase/DisplayAllUnitUseCase"
import { FetchUnitUseCase } from "../useCases/UnitUseCase/FetchUnitUseCase"
import { SaveUnitUseCase } from "../useCases/UnitUseCase/SaveUnitUseCase"
import { updateUnitUseCase } from "../useCases/UnitUseCase/updateUnitUseCase"
import { ListProjectUseCase } from "../useCases/StageStatusUpdationUseCase/ListProjectUseCase"
import { JwtService } from "../services/JwtService"
import { UnitRepository } from "../infrastructure/persistence/UnitRepository"
import { SitemanagerLoginUseCase } from "../useCases/SitemanagerAuthenticationUseCase/SitemanagerLoginUseCase"



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
export const injectAdminDashboardController = new AdminDashboardController(bugetAndActualuseCase,bugetAndActualMaterialUseCase,bugetAndActualLabourUseCase)


