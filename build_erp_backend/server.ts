import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import "./src/infrastructure/auth/passport"
import session from "express-session";
import fileUpload from 'express-fileupload';




// import Usecase
import { DisplayAllSitemanagerUseCase } from './src/useCases/admin/Site/DisplayAllsitemanagerUseCase';
import { UpdateSitemanagerUseCase } from './src/useCases/admin/Site/UpdateSitemanagerUseCase';



//import controller 
import { AuthController } from './src/infrastructure/web/controllers/user/AuthController';
import { ProjectController } from './src/infrastructure/web/controllers/admin/projectController';
import { SitemanagerController } from './src/infrastructure/web/controllers/admin/sitemanagerController';
import { UnitController } from './src/infrastructure/web/controllers/admin/unitController';


//import route
import createAdminRoute from './src/infrastructure/web/routes/adminRouter';
import createAuthRoute from './src/infrastructure/web/routes/userRouter';




import { connectDB } from './src/Database/DB/ConnectDB';
import { BcryptHasher } from './src/infrastructure/secuirity/BcryptHasher';
import { AddSiteController } from './src/infrastructure/web/controllers/admin/addSiteController';
import { RefreshTokenUseCase } from './src/useCases/user/Authentication/RefreshTokenUseCase';
import { JwtServiceImpl } from './src/services/JwtService';
import {  AddSiteToProjectRepository } from './src/infrastructure/persistence/AddSiteToProjectRepository';
import createSitemanagerRoute from './src/infrastructure/web/routes/siteRouter';
import passport, { Passport } from 'passport';
import { googlAuthUseCase } from './src/useCases/user/Authentication/GoogleAuthUseCase';
import { SignupUserUseCase } from './src/useCases/user/Authentication/SignupUserUseCase';
import { VerifyOTPUseCases } from './src/useCases/user/Authentication/VerifyOTPuseCases';
import { ResendOTPUseCase } from './src/useCases/user/Authentication/ResendOTPUseCase';
import { UserLoginUseCase } from './src/useCases/user/Authentication/UserLoginUseCase';
import { AdminLoginUseCase } from './src/useCases/admin/Dashboard/AdminLoginUseCase';
import { DisplayAllCategoryUseCase } from './src/useCases/admin/Category/DisplayAllCategoryUseCase';
import { SaveCategoryUseCase } from './src/useCases/admin/Category/SaveCategoryUseCase';
import { UpdateCategoryUseCase } from './src/useCases/admin/Category/UpdateCategoryUseCase';
import { DeleteCategoryUseCase } from './src/useCases/admin/Category/DeleteCategoryUseCase';
import { DisplayAllUnitUseCase } from './src/useCases/admin/Unit/DisplayAllUnitUseCase';
import { SaveUnitUseCase } from './src/useCases/admin/Unit/SaveUnitUseCase';
import { updateUnitUseCase } from './src/useCases/admin/Unit/updateUnitUseCase';
import { deleteUnitUseCase } from './src/useCases/admin/Unit/DeleteUnitUseCase';
import { DisplayAllBrandUseCase } from './src/useCases/admin/Brand/DisplayAllBrandUseCase';
import { SaveBrandUseCase } from './src/useCases/admin/Brand/SaveBrandUseCase';
import { UpdateBrandUseCase } from './src/useCases/admin/Brand/UpdateBrandUseCase';
import { DeleteBrandUseCase } from './src/useCases/admin/Brand/DeleteBrandUseCase';
import { DisplayAllMaterialUseCase } from './src/useCases/admin/Material/DisplayAllMaterialUseCase';
import { DisplayAddMaterialDataUseCase } from './src/useCases/admin/Material/DisplayAddMaterialUseCase';
import { AddMaterialUseCase } from './src/useCases/admin/Material/AddMaterialUseCase';
import { GetEditMaterialUseCase } from './src/useCases/admin/Material/GetEditMaterialUseCase';
import { UpdateMaterialUseCase } from './src/useCases/admin/Material/UpdateMaterialUseCase';
import { DeleteMaterialUseCase } from './src/useCases/admin/Material/DeleteMaterialUseCase';
import { DisplayAllProjectUseCase } from './src/useCases/admin/Project/DisplayAllProjectUseCase';
import { DisplayAddProjectUseCase } from './src/useCases/admin/Project/DisplayAddProjectUseCase';
import { AddProjectUseCase } from './src/useCases/admin/Project/AddProjectUseCase';
import { EditProjectUseCase } from './src/useCases/admin/Project/EditProjectUseCase';
import { DeleteProjectUseCase } from './src/useCases/admin/Project/DeleteProjectUseCase';
import { ChangeStatusUseCase } from './src/useCases/admin/Project/ChangeStatusUseCase';
import { DisplayAllLabourUseCase } from './src/useCases/admin/Labour/DisplayAllLabourUseCase';
import { AddLabourUseCase } from './src/useCases/admin/Labour/AddLabourUseCase';
import { UpdateLabourUseCase } from './src/useCases/admin/Labour/UpdateLabourUseCase';
import { DeleteLabourUseCase } from './src/useCases/admin/Labour/DeleteLabourUseCase';
import { SaveSitemanagerUseCase } from './src/useCases/admin/Site/SaveSitemanagerUseCase';
import { DeleteSitemanagerUseCase } from './src/useCases/admin/Site/DeleteSitemanagerUseCase';
import { AddSiteToProjectUseCase } from './src/useCases/admin/Site/AddSiteToProjectUseCase';
import { ListSiteToProject } from './src/useCases/admin/Site/ListSiteToProjectUseCase';
import { DeleteSiteToProjectUseCase } from './src/useCases/admin/Site/DeleteSitemanagerInProjectUseCase';
import { AddSiteToprojectFetchProjectUseCase } from './src/useCases/admin/Site/AddSiteToprojectFetchProjectUseCase';
import { AddSiteToprojectFetchSitemanagerUseCase } from './src/useCases/admin/Site/AddSiteToprojectFetchSitemanagerUseCase';
import { SitemanagerLoginUseCase } from './src/useCases/sitemanager/Authentication/SitemanagerLoginUseCase';
import { UpdateSitemanagerPasswordUseCase } from './src/useCases/sitemanager/Authentication/UpdateSitemanagerPasswordUseCase';
import { CategoryController } from './src/infrastructure/web/controllers/admin/categoryController';
import { MaterialController } from './src/infrastructure/web/controllers/admin/materialController';
import { LabourController } from './src/infrastructure/web/controllers/admin/labourController';
import { changePasswordController } from './src/infrastructure/web/controllers/sitemanager/changePasswordController';
import { SpecController } from './src/infrastructure/web/controllers/admin/specController';
import { SpeclistUseCase } from './src/useCases/admin/Spec/SpeclistUseCase';
import {  SpecRepository } from './src/infrastructure/persistence/SpecRepository';
import { FetchUnitUseCase } from './src/useCases/admin/Unit/FetchUnitUseCase';
import { FetchMaterialUseCase } from './src/useCases/admin/Material/FetchMaterialUseCase';
import { FetchMaterialByMaterialName } from './src/useCases/admin/Material/FetchmaterialByMaterialName';
import { FetchBrandByMaterialName } from './src/useCases/admin/Material/fetchBrandByMaterialName';
import { FetchUnitRateUseCase } from './src/useCases/admin/Material/fetChUnitRateUseCase';
import { FetchAllLabourUseCase } from './src/useCases/admin/Labour/fetchAllLabourUseCase';
import { SaveSpecUseCase } from './src/useCases/admin/Spec/SpecSaveUseCase';
import { SpecSumUseCase } from './src/useCases/admin/Spec/specSumUseCase';
import { DeleteSpecUseCase } from './src/useCases/admin/Spec/DeleteSpecUseCase';
import { FetchProjectUseCase } from './src/useCases/admin/Project/fetchProjectUseCase';
import { getSpecUseCase } from './src/useCases/admin/Spec/getSpecUseCase';
import { FindmaterialSumUseCase } from './src/useCases/admin/Material/FindMaterialSumUseCase';
import { FindlabourSumUsecase } from './src/useCases/admin/Material/FindLabourSumUseCase';
import { EstimationController } from './src/infrastructure/web/controllers/admin/estimationController';
import { SaveEstimationUseCase } from './src/useCases/admin/Estimation/saveEstimationUseCase';
import {  EstimationRepository } from './src/infrastructure/persistence/EstimationRepository';
import { DisplayEstimationUseCase } from './src/useCases/admin/Estimation/DisplayEstimationUseCase';
import { DeleteEstimationUseCase } from './src/useCases/admin/Estimation/DeleteEstimationUseCase';
import { StageController } from './src/infrastructure/web/controllers/admin/stageController';
import { FetchCostUseCase } from './src/useCases/admin/Stage/FetchCostUseCase';
import { StageSaveUseCase } from './src/useCases/admin/Stage/StageSaveUseCase';
import {  StageRepository } from './src/infrastructure/persistence/StageRepository';
import { FetchStageUsecase } from './src/useCases/admin/Stage/FetchStageUseCase';
import { statusController } from './src/infrastructure/web/controllers/sitemanager/statusController';
import { FetchStatusUseCase } from './src/useCases/sitemanager/StageStatusUpdation/FetchStatusUseCase';
import { StageStatusChangeUseCase } from './src/useCases/sitemanager/StageStatusUpdation/StageSatusChangeUseCase';
import { AttendanceController } from './src/infrastructure/web/controllers/sitemanager/AttendanceController';
import { addAttendanceUseCase } from './src/useCases/sitemanager/Attendance/AddAttendanceUseCase';
import { fetchAttendanceUseCase } from './src/useCases/sitemanager/Attendance/FetchAttendanceUseCase';
import { DeleteAttendanceUseCase } from './src/useCases/sitemanager/Attendance/DeleteAttandanceUseCase';
import { ApproveAttendanceUseCase } from './src/useCases/sitemanager/Attendance/approveAttendanceuseCase';
import { FetchAttendanceByIdUseCase } from './src/useCases/sitemanager/Attendance/FetchAttendanceBYIdUseCase';
import { EditAttendanceUseCase } from './src/useCases/sitemanager/Attendance/EditAttendanceUseCase';
import { DeleteStageUseCase } from './src/useCases/admin/Stage/DeleteStageUseCase';
import { UploadEstimateImageUseCase } from './src/useCases/admin/Estimation/UploadEstimateImageUseCase';
import { AuthProjectController } from './src/infrastructure/web/controllers/user/AuthprojectController';
import { FetchUserProjectUseCase } from './src/useCases/user/ProjectDisplay/fetchUsersProjectUsecase';
import { UploadStatusImageUseCase } from './src/useCases/sitemanager/StageStatusUpdation/UploadStatusImageUseCase';
import { SendOTPUseCase } from './src/useCases/user/Authentication/SendOTPUseCase';
import { UpdatePasswordUseCase } from './src/useCases/user/Authentication/UpdatePasswordUseCase';
import { VerifyForgotUseCase } from './src/useCases/user/Authentication/VerifyForgotUseCase';
import { ListProjectUseCase } from './src/useCases/sitemanager/StageStatusUpdation/ListProjectUseCase';
import { UpdateStageUseCase } from './src/useCases/admin/Stage/UpdateStageUseCase';
import { FetchExistEstimationUseCase } from './src/useCases/admin/Estimation/FetchExistEstimationUseCase';
import { UpdateEstimationUsecase } from './src/useCases/admin/Estimation/UpdateEstimationUseCase';
import { UserRepository } from './src/infrastructure/persistence/UserRepository';
import { AttendanceRepository } from './src/infrastructure/persistence/AttendanceRepository';
import { SitemanagerRepository } from './src/infrastructure/persistence/SitemanagerRepository';
import { LabourRepository } from './src/infrastructure/persistence/LabourRepository';
import { ProjectRepository } from './src/infrastructure/persistence/ProjectRepository';
import { ProjectStockRepository } from './src/infrastructure/persistence/ProjectStockRepository';
import { MaterialRepository } from './src/infrastructure/persistence/MaterialRepository';
import { BrandRepository } from './src/infrastructure/persistence/BrandRepository';
import { UnitRepository } from './src/infrastructure/persistence/UnitRepository';
import { CategoryRepository } from './src/infrastructure/persistence/CategoryRepository';
import { AdminRepository } from './src/infrastructure/persistence/AdminRepository';
import { AdminController } from './src/infrastructure/web/controllers/admin/adminController';
import { BrandController } from './src/infrastructure/web/controllers/admin/brandController';
import { errorHandler } from './src/middlewares/errorHandler';
import { FetchStatusBaseProjectUseCase } from './src/useCases/user/ProjectDisplay/fetchStatusBaseProjectUseCase';
import { FindMaterialByIdUseCase } from './src/useCases/admin/Material/FindMaterialByIdUseCase';
import { FetchLabourByIdUseCase } from './src/useCases/admin/Labour/FetchLabourByIdUseCase';
import { UpdateSpecUseCase } from './src/useCases/admin/Spec/UpdateSpecUseCase';



require("dotenv").config();


const PORT = process.env.PORT || 3000
const app = express()
app.use(fileUpload({ useTempFiles: true })); 
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
   secret: process.env.SESSION_SECRET || 'your-secret-key',
   resave: false,
   saveUninitialized: false,
   cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
   }
}));

app.use(passport.initialize());
app.use(passport.session());


async function compositeRoot() {
   try {
      await connectDB();



        const adminRepository = new AdminRepository()
      const categoryRepository = new CategoryRepository()
      const unitRepository = new UnitRepository()
      const brandRepository = new BrandRepository()
      const materialRepository = new MaterialRepository()
      const projectStockRepository = new ProjectStockRepository()
      const projectRepository = new ProjectRepository()
      const labourRepository = new LabourRepository()
      const sitemanagerRepository = new SitemanagerRepository()
      const addSiteToprojectRepoSitory = new AddSiteToProjectRepository()
      const specRepository = new SpecRepository()
      const estimationRepository = new EstimationRepository()
      const stageRepository = new StageRepository()
      const attendanceRepository = new AttendanceRepository()
      const userRepository = new UserRepository()

      
      const hasher = new BcryptHasher()
      const JwtService = new JwtServiceImpl()



      const signupUserUseCase = new SignupUserUseCase(userRepository)
      const verifyOTPUseCase = new VerifyOTPUseCases(userRepository, hasher)
      const resendOTPUseCase = new ResendOTPUseCase(userRepository)
      const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, JwtService)
      const userLoginUseCase = new UserLoginUseCase(userRepository, hasher, JwtService)
      const googleauthuseCase = new googlAuthUseCase(userRepository, JwtService)
      const fetchUserprojectUseCase = new FetchUserProjectUseCase(projectRepository)
      const sendotpUsecase = new SendOTPUseCase(userRepository)
      const verifyforgotUsecase = new VerifyForgotUseCase(userRepository)
      const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository,hasher)
      const fetchStatusBaseProjectUseCase = new FetchStatusBaseProjectUseCase(projectRepository)

      const authController = new AuthController(
         signupUserUseCase,
         verifyOTPUseCase,
         resendOTPUseCase,
         userLoginUseCase,
         refreshTokenUseCase,
         googleauthuseCase,
         sendotpUsecase,
         verifyforgotUsecase,
         updatePasswordUseCase
      )
      const authprojectController = new AuthProjectController(fetchUserprojectUseCase,fetchStatusBaseProjectUseCase)
      app.use("/", createAuthRoute(authController,authprojectController))
      //
   


      const adminLoginUsecase = new AdminLoginUseCase(adminRepository, JwtService)
      const displayAllCategoryUseCase = new DisplayAllCategoryUseCase(categoryRepository)
      const addCategoryUseCase = new SaveCategoryUseCase(categoryRepository)
      const editcategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
      const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository, materialRepository)
      const displayUnitUseCase = new DisplayAllUnitUseCase(unitRepository)
      const addUnitUseCase = new SaveUnitUseCase(unitRepository)
      const editUnitUseCase = new updateUnitUseCase(unitRepository)
      const newdeleteUnitUseCase = new deleteUnitUseCase(unitRepository, materialRepository)
      const displayBrandUseCase = new DisplayAllBrandUseCase(brandRepository)
      const addBrandUseCase = new SaveBrandUseCase(brandRepository)
      const editBrandUseCase = new UpdateBrandUseCase(brandRepository)
      const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository, materialRepository)
      const displayAllMaterialUseCase = new DisplayAllMaterialUseCase(materialRepository)
      const getAddMaterialUseCase = new DisplayAddMaterialDataUseCase(materialRepository, categoryRepository, brandRepository, unitRepository)
      const saveMaterialUseCase = new AddMaterialUseCase(materialRepository, projectStockRepository)
      const getEditMaterialUseCase = new GetEditMaterialUseCase(materialRepository, categoryRepository, brandRepository, unitRepository, projectStockRepository)
      const updateMaterialUseCase = new UpdateMaterialUseCase(materialRepository, projectStockRepository)
      const deleteMaterialUseCase = new DeleteMaterialUseCase(materialRepository, projectStockRepository,specRepository)
      const displayProjectUseCase = new DisplayAllProjectUseCase(projectRepository)
      const displayAddProjectUseCase = new DisplayAddProjectUseCase(userRepository)
      const addProjectUseCase = new AddProjectUseCase(projectRepository)
      const editProjectUseCase = new EditProjectUseCase(projectRepository)
      const removeProjectUseCase = new DeleteProjectUseCase(projectRepository)
      const changeStatusUseCase = new ChangeStatusUseCase(projectRepository)
      const displayAllLabourUseCase = new DisplayAllLabourUseCase(labourRepository)
      const addLabourUseCase = new AddLabourUseCase(labourRepository)
      const updateLabourUseCase = new UpdateLabourUseCase(labourRepository)
      const deleteLabourUseCase = new DeleteLabourUseCase(labourRepository,specRepository)
      const displayAllSitemanagerUseCase = new DisplayAllSitemanagerUseCase(sitemanagerRepository)
      const addSitemanagerUseCase = new SaveSitemanagerUseCase(sitemanagerRepository)
      const editSitemanagerUsecase = new UpdateSitemanagerUseCase(sitemanagerRepository)
      const deleteSitemanagerUseCase = new DeleteSitemanagerUseCase(sitemanagerRepository)
      const addSiteToProjectUseCase = new AddSiteToProjectUseCase(projectRepository)
      const listSiteToProjectUseCase = new ListSiteToProject(addSiteToprojectRepoSitory)
      const deleteSitetoprojectuseCase = new DeleteSiteToProjectUseCase(projectRepository)
      const addSiteToprojectFetchProjectUseCase = new AddSiteToprojectFetchProjectUseCase(addSiteToprojectRepoSitory)
      const addSiteToprojectFetchSitemanagerUseCase = new AddSiteToprojectFetchSitemanagerUseCase(addSiteToprojectRepoSitory)
      const sitemanagerLoginUseCase = new SitemanagerLoginUseCase(sitemanagerRepository, JwtService, hasher)
      const updateSitemanagerPassword = new UpdateSitemanagerPasswordUseCase(sitemanagerRepository, hasher)
      const speclistusecase = new SpeclistUseCase(specRepository)
      const fetchunitusecase = new FetchUnitUseCase(unitRepository)
      const fetchMaterialUseCase = new FetchMaterialUseCase(materialRepository)
      const fetchMaterialByMaterialName = new FetchMaterialByMaterialName(materialRepository)
      const fetchbrandByname = new FetchBrandByMaterialName(materialRepository)
      const fetUnitRateUseCase = new FetchUnitRateUseCase(materialRepository)
      const fetchallLabourusecase = new FetchAllLabourUseCase(labourRepository)
      const specSaveuseCase = new SaveSpecUseCase(specRepository)
      const specsumusecase = new SpecSumUseCase(materialRepository, labourRepository)
      const deleteSpecusecase = new DeleteSpecUseCase(specRepository,estimationRepository)
      const fetchProjectUseCase = new FetchProjectUseCase(projectRepository)
      const getspecUseCase = new getSpecUseCase(specRepository)
      const findmaterialSumusecase = new FindmaterialSumUseCase(materialRepository)
      const findlaboursumusecase = new FindlabourSumUsecase(labourRepository)
      const saveestimationuseCase = new SaveEstimationUseCase(estimationRepository)
      const displayEstimationUseCase = new DisplayEstimationUseCase(estimationRepository)
      const deleteEstimationuseCase = new DeleteEstimationUseCase(estimationRepository,stageRepository)
      const fetchCostusecase = new FetchCostUseCase(estimationRepository)
      const stagesaveusecase = new StageSaveUseCase(projectRepository, stageRepository)
      const fetchStageusecase = new FetchStageUsecase(projectRepository)
      const fetchStatusUseCase = new FetchStatusUseCase(stageRepository)
      const stageStatusChangeUseCase = new StageStatusChangeUseCase(stageRepository)
      const addAttendaceUseCase = new addAttendanceUseCase(attendanceRepository)
      const fetchattendanceusecase = new fetchAttendanceUseCase(attendanceRepository)
      const deleteattendanceUsecase = new DeleteAttendanceUseCase(attendanceRepository)
      const approveattendanceuseCase = new ApproveAttendanceUseCase(attendanceRepository)
      const fetchattendancebyIdusecase = new FetchAttendanceByIdUseCase(attendanceRepository)
      const editAttendanceUseCase = new EditAttendanceUseCase(attendanceRepository)
      const deletestageusecase = new DeleteStageUseCase(stageRepository)
      const uploadestimationUsecase = new UploadEstimateImageUseCase(projectRepository)
      const uploadstatusImageusecase = new UploadStatusImageUseCase(stageRepository)
      const listProjectUseCase = new ListProjectUseCase(projectRepository)
      const updateStageUseCase = new UpdateStageUseCase(stageRepository,projectRepository)
      const fetchexistestimationusecase = new FetchExistEstimationUseCase(estimationRepository)
      const updateEstimationUsecase = new UpdateEstimationUsecase(estimationRepository)
      const findMaterialByIdUsecase = new FindMaterialByIdUseCase(materialRepository)
      const fetchLabourByIdUseCase = new FetchLabourByIdUseCase(labourRepository)
      const updateSpecUseCase = new UpdateSpecUseCase(specRepository)



      const newAdminController = new AdminController(adminLoginUsecase)
      const newCategoryController = new CategoryController(displayAllCategoryUseCase, addCategoryUseCase, editcategoryUseCase, deleteCategoryUseCase)
      const newUnitController = new UnitController(displayUnitUseCase, addUnitUseCase, editUnitUseCase, newdeleteUnitUseCase, fetchunitusecase)
      const newBrandController = new BrandController(displayBrandUseCase, addBrandUseCase, editBrandUseCase, deleteBrandUseCase)
      const newMaterialController = new MaterialController(displayAllMaterialUseCase, getAddMaterialUseCase, saveMaterialUseCase,
         getEditMaterialUseCase, updateMaterialUseCase, deleteMaterialUseCase, fetchMaterialUseCase, fetchMaterialByMaterialName, fetchbrandByname, fetUnitRateUseCase,findMaterialByIdUsecase)
      const newProjectController = new ProjectController(displayProjectUseCase, displayAddProjectUseCase, addProjectUseCase, editProjectUseCase, removeProjectUseCase, changeStatusUseCase, fetchProjectUseCase)
      const newLabourController = new LabourController(displayAllLabourUseCase, addLabourUseCase, updateLabourUseCase, deleteLabourUseCase, fetchallLabourusecase , fetchLabourByIdUseCase)
      const newSitemanagerController = new SitemanagerController(displayAllSitemanagerUseCase, addSitemanagerUseCase, editSitemanagerUsecase, deleteSitemanagerUseCase, sitemanagerLoginUseCase,listProjectUseCase)
      const newAddSiteController = new AddSiteController(addSiteToProjectUseCase, listSiteToProjectUseCase, deleteSitetoprojectuseCase, addSiteToprojectFetchProjectUseCase, addSiteToprojectFetchSitemanagerUseCase)
      const changepasswordcontroller = new changePasswordController(updateSitemanagerPassword)
      const newspecController = new SpecController(speclistusecase, specSaveuseCase, specsumusecase, deleteSpecusecase, getspecUseCase, findmaterialSumusecase, findlaboursumusecase,updateSpecUseCase)
      const newestimationController = new EstimationController(saveestimationuseCase, displayEstimationUseCase, deleteEstimationuseCase,uploadestimationUsecase,fetchexistestimationusecase,updateEstimationUsecase)
      const newstageController = new StageController(fetchCostusecase, stagesaveusecase, fetchStageusecase, deletestageusecase,updateStageUseCase)
      const newstatusController = new statusController(fetchStatusUseCase, stageStatusChangeUseCase,uploadstatusImageusecase)
      const newattendanceController = new AttendanceController(addAttendaceUseCase, fetchattendanceusecase, deleteattendanceUsecase, approveattendanceuseCase, fetchattendancebyIdusecase, editAttendanceUseCase)

      app.use("/admin", createAdminRoute(newAdminController,
         newCategoryController, newUnitController, newBrandController, newMaterialController,
         newProjectController, newLabourController, newSitemanagerController, newAddSiteController,
         newspecController, newestimationController, newstageController

      ))

      app.use("/site", createSitemanagerRoute(newSitemanagerController, changepasswordcontroller, newstatusController, newattendanceController))

   } catch (error) {
      console.log(error)
      process.exit(1)
   }
}

compositeRoot();
app.use(errorHandler)

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("server connected successfully")
   })
})
