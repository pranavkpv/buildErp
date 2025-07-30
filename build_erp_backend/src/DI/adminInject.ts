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
import { SitemanagerRepository } from "../infrastructure/persistence/SitemanagerRepository"
import { SpecRepository } from "../infrastructure/persistence/SpecRepository"
import { StageRepository } from "../infrastructure/persistence/StageRepository"
import { UnitRepository } from "../infrastructure/persistence/UnitRepository"
import { UserRepository } from "../infrastructure/persistence/UserRepository"
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher"
import { AddSiteController } from "../infrastructure/web/controllers/admin/addSiteController"
import { AdminController } from "../infrastructure/web/controllers/admin/adminController"
import { BrandController } from "../infrastructure/web/controllers/admin/brandController"
import { CategoryController } from "../infrastructure/web/controllers/admin/categoryController"
import { EstimationController } from "../infrastructure/web/controllers/admin/estimationController"
import { LabourController } from "../infrastructure/web/controllers/admin/labourController"
import { MaterialController } from "../infrastructure/web/controllers/admin/materialController"
import { ProjectController } from "../infrastructure/web/controllers/admin/projectController"
import { SitemanagerController } from "../infrastructure/web/controllers/admin/sitemanagerController"
import { SpecController } from "../infrastructure/web/controllers/admin/specController"
import { StageController } from "../infrastructure/web/controllers/admin/stageController"
import { UnitController } from "../infrastructure/web/controllers/admin/unitController"
import { JwtServiceImpl } from "../services/JwtService"
import { DeleteBrandUseCase } from "../useCases/admin/Brand/DeleteBrandUseCase"
import { DisplayAllBrandUseCase } from "../useCases/admin/Brand/DisplayAllBrandUseCase"
import { SaveBrandUseCase } from "../useCases/admin/Brand/SaveBrandUseCase"
import { UpdateBrandUseCase } from "../useCases/admin/Brand/UpdateBrandUseCase"
import { DeleteCategoryUseCase } from "../useCases/admin/Category/DeleteCategoryUseCase"
import { DisplayAllCategoryUseCase } from "../useCases/admin/Category/DisplayAllCategoryUseCase"
import { SaveCategoryUseCase } from "../useCases/admin/Category/SaveCategoryUseCase"
import { UpdateCategoryUseCase } from "../useCases/admin/Category/UpdateCategoryUseCase"
import { AdminLoginUseCase } from "../useCases/admin/Dashboard/AdminLoginUseCase"
import { DeleteEstimationUseCase } from "../useCases/admin/Estimation/DeleteEstimationUseCase"
import { DisplayEstimationUseCase } from "../useCases/admin/Estimation/DisplayEstimationUseCase"
import { FetchExistEstimationUseCase } from "../useCases/admin/Estimation/FetchExistEstimationUseCase"
import { SaveEstimationUseCase } from "../useCases/admin/Estimation/saveEstimationUseCase"
import { UpdateEstimationUsecase } from "../useCases/admin/Estimation/UpdateEstimationUseCase"
import { UploadEstimateImageUseCase } from "../useCases/admin/Estimation/UploadEstimateImageUseCase"
import { AddLabourUseCase } from "../useCases/admin/Labour/AddLabourUseCase"
import { DeleteLabourUseCase } from "../useCases/admin/Labour/DeleteLabourUseCase"
import { DisplayAllLabourUseCase } from "../useCases/admin/Labour/DisplayAllLabourUseCase"
import { FetchAllLabourUseCase } from "../useCases/admin/Labour/fetchAllLabourUseCase"
import { FetchLabourByIdUseCase } from "../useCases/admin/Labour/FetchLabourByIdUseCase"
import { UpdateLabourUseCase } from "../useCases/admin/Labour/UpdateLabourUseCase"
import { AddMaterialUseCase } from "../useCases/admin/Material/AddMaterialUseCase"
import { DeleteMaterialUseCase } from "../useCases/admin/Material/DeleteMaterialUseCase"
import { DisplayAddMaterialDataUseCase } from "../useCases/admin/Material/DisplayAddMaterialUseCase"
import { DisplayAllMaterialUseCase } from "../useCases/admin/Material/DisplayAllMaterialUseCase"
import { FetchBrandByMaterialName } from "../useCases/admin/Material/fetchBrandByMaterialName"
import { FetchMaterialByMaterialName } from "../useCases/admin/Material/FetchmaterialByMaterialName"
import { FetchMaterialUseCase } from "../useCases/admin/Material/FetchMaterialUseCase"
import { FetchUnitRateUseCase } from "../useCases/admin/Material/fetChUnitRateUseCase"
import { FindlabourSumUsecase } from "../useCases/admin/Material/FindLabourSumUseCase"
import { FindMaterialByIdUseCase } from "../useCases/admin/Material/FindMaterialByIdUseCase"
import { FindmaterialSumUseCase } from "../useCases/admin/Material/FindMaterialSumUseCase"
import { GetEditMaterialUseCase } from "../useCases/admin/Material/GetEditMaterialUseCase"
import { UpdateMaterialUseCase } from "../useCases/admin/Material/UpdateMaterialUseCase"
import { AddProjectUseCase } from "../useCases/admin/Project/AddProjectUseCase"
import { ChangeStatusUseCase } from "../useCases/admin/Project/ChangeStatusUseCase"
import { DeleteProjectUseCase } from "../useCases/admin/Project/DeleteProjectUseCase"
import { DisplayAddProjectUseCase } from "../useCases/admin/Project/DisplayAddProjectUseCase"
import { DisplayAllProjectUseCase } from "../useCases/admin/Project/DisplayAllProjectUseCase"
import { EditProjectUseCase } from "../useCases/admin/Project/EditProjectUseCase"
import { FetchProjectUseCase } from "../useCases/admin/Project/fetchProjectUseCase"
import { AddSiteToprojectFetchProjectUseCase } from "../useCases/admin/Site/AddSiteToprojectFetchProjectUseCase"
import { AddSiteToprojectFetchSitemanagerUseCase } from "../useCases/admin/Site/AddSiteToprojectFetchSitemanagerUseCase"
import { AddSiteToProjectUseCase } from "../useCases/admin/Site/AddSiteToProjectUseCase"
import { DeleteSiteToProjectUseCase } from "../useCases/admin/Site/DeleteSitemanagerInProjectUseCase"
import { DeleteSitemanagerUseCase } from "../useCases/admin/Site/DeleteSitemanagerUseCase"
import { DisplayAllSitemanagerUseCase } from "../useCases/admin/Site/DisplayAllsitemanagerUseCase"
import { ListSiteToProject } from "../useCases/admin/Site/ListSiteToProjectUseCase"
import { SaveSitemanagerUseCase } from "../useCases/admin/Site/SaveSitemanagerUseCase"
import { UpdateSitemanagerUseCase } from "../useCases/admin/Site/UpdateSitemanagerUseCase"
import { DeleteSpecUseCase } from "../useCases/admin/Spec/DeleteSpecUseCase"
import { getSpecUseCase } from "../useCases/admin/Spec/getSpecUseCase"
import { SpeclistUseCase } from "../useCases/admin/Spec/SpeclistUseCase"
import { SaveSpecUseCase } from "../useCases/admin/Spec/SpecSaveUseCase"
import { SpecSumUseCase } from "../useCases/admin/Spec/specSumUseCase"
import { UpdateSpecUseCase } from "../useCases/admin/Spec/UpdateSpecUseCase"
import { DeleteStageUseCase } from "../useCases/admin/Stage/DeleteStageUseCase"
import { FetchCostUseCase } from "../useCases/admin/Stage/FetchCostUseCase"
import { FetchStageUsecase } from "../useCases/admin/Stage/FetchStageUseCase"
import { StageSaveUseCase } from "../useCases/admin/Stage/StageSaveUseCase"
import { UpdateStageUseCase } from "../useCases/admin/Stage/UpdateStageUseCase"
import { deleteUnitUseCase } from "../useCases/admin/Unit/DeleteUnitUseCase"
import { DisplayAllUnitUseCase } from "../useCases/admin/Unit/DisplayAllUnitUseCase"
import { FetchUnitUseCase } from "../useCases/admin/Unit/FetchUnitUseCase"
import { SaveUnitUseCase } from "../useCases/admin/Unit/SaveUnitUseCase"
import { updateUnitUseCase } from "../useCases/admin/Unit/updateUnitUseCase"
import { SitemanagerLoginUseCase } from "../useCases/sitemanager/Authentication/SitemanagerLoginUseCase"
import { ListProjectUseCase } from "../useCases/sitemanager/StageStatusUpdation/ListProjectUseCase"



// ---------------------- Admin Injection ---------------------- //

const adminRepository = new AdminRepository()
const JwtService = new JwtServiceImpl()
const adminLoginUsecase = new AdminLoginUseCase(adminRepository, JwtService)
export const injectedAdminController = new AdminController(adminLoginUsecase)

// ---------------------- Category Injection ---------------------- //

const categoryRepository = new CategoryRepository()
const materialRepository = new MaterialRepository()
const displayAllCategoryUseCase = new DisplayAllCategoryUseCase(categoryRepository)
const addCategoryUseCase = new SaveCategoryUseCase(categoryRepository)
const editcategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository, materialRepository)
export const injectedCategoryController = new CategoryController(displayAllCategoryUseCase, addCategoryUseCase, editcategoryUseCase, deleteCategoryUseCase)

// ---------------------- Unit Injection ---------------------- //


const unitRepository = new UnitRepository()
const displayUnitUseCase = new DisplayAllUnitUseCase(unitRepository)
const addUnitUseCase = new SaveUnitUseCase(unitRepository)
const editUnitUseCase = new updateUnitUseCase(unitRepository)
const newdeleteUnitUseCase = new deleteUnitUseCase(unitRepository, materialRepository)
const fetchunitusecase = new FetchUnitUseCase(unitRepository)
export const injectedUnitController = new UnitController(displayUnitUseCase, addUnitUseCase, editUnitUseCase, newdeleteUnitUseCase, fetchunitusecase)

// ---------------------- Brand Injection ---------------------- //

const brandRepository = new BrandRepository()
const displayBrandUseCase = new DisplayAllBrandUseCase(brandRepository)
const addBrandUseCase = new SaveBrandUseCase(brandRepository)
const editBrandUseCase = new UpdateBrandUseCase(brandRepository)
const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository, materialRepository)
export const injectBrandController = new BrandController(displayBrandUseCase, addBrandUseCase, editBrandUseCase, deleteBrandUseCase)

// ---------------------- Material Injection ---------------------- //

const projectStockRepository = new ProjectStockRepository()
const specRepository = new SpecRepository()
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

const hasher = new BcryptHasher()
const sitemanagerRepository = new SitemanagerRepository()
const displayAllSitemanagerUseCase = new DisplayAllSitemanagerUseCase(sitemanagerRepository)
const addSitemanagerUseCase = new SaveSitemanagerUseCase(sitemanagerRepository)
const editSitemanagerUsecase = new UpdateSitemanagerUseCase(sitemanagerRepository)
const deleteSitemanagerUseCase = new DeleteSitemanagerUseCase(sitemanagerRepository)
const sitemanagerLoginUseCase = new SitemanagerLoginUseCase(sitemanagerRepository, JwtService, hasher)
const listProjectUseCase = new ListProjectUseCase(projectRepository)
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


