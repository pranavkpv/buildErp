import { Router } from "express";
import { withLogging } from "../../../infrastructure/middlewares/withLoggingMiddleware";
import { adminMiddleWare } from "../../../infrastructure/middlewares/adminMiddleware";
import { validateAddSitemanagerToproject } from "../../../infrastructure/middlewares/validation/addsitemanagerToproject.validation";
import { injectAddSitemanagerToprojectController } from "../../di/addSiteToproject,Injection";
import { injectAdminDashboardController } from "../../di/admin.dashboard.injection";
import { validateSaveEstimation, validateUploadEstimationImage } from "../../../infrastructure/middlewares/validation/estimation.validaion";
import { validateAddLabour } from "../../../infrastructure/middlewares/validation/labour.validation";
import { validateAddMaterial } from "../../../infrastructure/middlewares/validation/material.validation";
import { validateProjectAdd } from "../../../infrastructure/middlewares/validation/project.validation";
import { injectedProjectController } from "../../di/project.Injection";
import { validateSpecification } from "../../../infrastructure/middlewares/validation/spec.validation";
import { injectedMaterialController } from "../../di/material.injection";
import { validateStageAction } from "../../../infrastructure/middlewares/validation/stage.validation";
import { validateBrandAction } from "../../../infrastructure/middlewares/validation/brand.validation";
import { injectStageController } from "../../di/stage.injection";
import { injectedBrandController } from "../../di/Brand.Injection";
import { validateCategoryAction } from "../../../infrastructure/middlewares/validation/category.validation";
import { injectedAddCategoryController, injectedDeleteCategoryController, injectedEditCategoryController, injectedFetchCategoryListController } from "../../di/Categoryi.Injection";
import { validateUnitAction } from "../../../infrastructure/middlewares/validation/unit.validation";
import { JwtService } from "../../../application/services/JwtService";
import { injectedUnitController } from "../../di/Unit.Injection";
import { injectedAdminController, injectedLabourController, injectedSitemanagerController, injectEstimationController, injectSpecController } from "../../di/adminInject";
import { validateAddSitemanager } from "../../../infrastructure/middlewares/validation/sitemanager.validation";


export class AdminRoute {
  public adminRoute: Router;

  constructor() {
    this.adminRoute = Router();
    this.setRoute();
  }

  private setRoute() {
    const jwtService = new JwtService();

    // =====================================================================
    // 🟢 AUTH ROUTES
    // =====================================================================
    this.adminRoute.post("/login", withLogging(injectedAdminController.login));

    // ✅ Protect all routes after this middleware
    this.adminRoute.use(adminMiddleWare(jwtService));

    // =====================================================================
    // 🟢 SITE ASSIGNMENT ROUTES
    // =====================================================================
    this.adminRoute.get("/addSiteToSiteData",
      withLogging(injectAddSitemanagerToprojectController.fetchSitemanager));

    this.adminRoute.post("/addToSite",
      validateAddSitemanagerToproject,
      withLogging(injectAddSitemanagerToprojectController.saveData));

    this.adminRoute.delete("/addToSite/:id/:sitemanagerId",
      withLogging(injectAddSitemanagerToprojectController.deleteSite));

    this.adminRoute.get("/addToSite",
      withLogging(injectAddSitemanagerToprojectController.listSite));


    this.adminRoute.post("/logout", withLogging(injectedAdminController.logout));

    // =====================================================================
    // 🟢 CATEGORY ROUTES
    // =====================================================================
    this.adminRoute.post("/category",
      validateCategoryAction,
      withLogging(injectedAddCategoryController.addCategoryHandler));

    this.adminRoute.get("/category",
      withLogging(injectedFetchCategoryListController.categoryListHandler));

    this.adminRoute.put("/category/:id",
      validateCategoryAction,
      withLogging(injectedEditCategoryController.editCategoryHandler));

    this.adminRoute.delete("/category/:id",
      withLogging(injectedDeleteCategoryController.deleteCategoryHandler));

    // =====================================================================
    // 🟢 UNIT ROUTES
    // =====================================================================
    this.adminRoute.get("/unit", 
      withLogging(injectedUnitController.getUnitHandler));

    this.adminRoute.post("/unit", 
      validateUnitAction,
      withLogging(injectedUnitController.addUnitHandler));

    this.adminRoute.put("/unit/:id", 
      validateUnitAction,
      withLogging(injectedUnitController.editUnitHandler));

    this.adminRoute.delete("/unit/:id", 
      withLogging(injectedUnitController.removeUnitHandler));

    this.adminRoute.get("/getUnit",
      withLogging(injectedUnitController.displayAllUnitHandler));

    // =====================================================================
    // 🟢 BRAND ROUTES
    // =====================================================================
    this.adminRoute.get("/brand",
      withLogging(injectedBrandController.brandListHandler));

    this.adminRoute.post("/brand",
      validateBrandAction,
      withLogging(injectedBrandController.addBrandHandler));

    this.adminRoute.put("/brand/:id",
      validateBrandAction,
      withLogging(injectedBrandController.editBrandHandler));

    this.adminRoute.delete("/brand/:id",
      withLogging(injectedBrandController.removeBrandHandler));

    // =====================================================================
    // 🟢 MATERIAL ROUTES
    // =====================================================================
    this.adminRoute.get("/material",
      withLogging(injectedMaterialController.materialList));

    this.adminRoute.get("/addmaterial",
      withLogging(injectedMaterialController.addMaterialList));

    this.adminRoute.post("/material",
      validateAddMaterial,
      withLogging(injectedMaterialController.saveMaterial));

    this.adminRoute.get("/editmaterial/:id",
      withLogging(injectedMaterialController.editMaterialList));

    this.adminRoute.put("/material/:id", adminMiddleWare(jwtService),
      validateAddMaterial,
      withLogging(injectedMaterialController.updateMaterial));

    this.adminRoute.delete("/material/:id",
      withLogging(injectedMaterialController.removeMaterial));

    this.adminRoute.get("/fetchMaterial",
      withLogging(injectedMaterialController.fetchUniqueMaterial));

    this.adminRoute.get("/fetMatbyUnit/:material",
      withLogging(injectedMaterialController.fetchMaterialByUnit));

    this.adminRoute.get("/fetchMatbyBrand/:material",
      withLogging(injectedMaterialController.fetchBrandbyName));

    this.adminRoute.get("/unitRate",
      withLogging(injectedMaterialController.fetchUnitrate));

    this.adminRoute.get("/getmaterial/:id",
      withLogging(injectedMaterialController.getMaterial));

    // =====================================================================
    // 🟢 PROJECT ROUTES
    // =====================================================================
    this.adminRoute.get("/getprojectAddSitemanagerProject",
      withLogging(injectedProjectController.getprojectAddSitemanagerProject));

    this.adminRoute.get("/getAllproject",
      withLogging(injectedProjectController.getAllProject))

    this.adminRoute.get("/getproject", 
      withLogging(injectedProjectController.getAllProject));

    this.adminRoute.get("/project",
      withLogging(injectedProjectController.projectData));

    this.adminRoute.get("/addproject",
      withLogging(injectedProjectController.addProjectdata));

    this.adminRoute.post("/project",
      validateProjectAdd,
      withLogging(injectedProjectController.saveProject));

    this.adminRoute.put("/project/:id",
      validateProjectAdd,
      withLogging(injectedProjectController.updateProject));

    this.adminRoute.delete("/project/:id",
      withLogging(injectedProjectController.removeProject));

    this.adminRoute.put("/status/:id",
      withLogging(injectedProjectController.projectStatus));


    // =====================================================================
    // 🟢 LABOUR ROUTES
    // =====================================================================
    this.adminRoute.get("/labour",
      withLogging(injectedLabourController.getLabour));

    this.adminRoute.post("/labour",
      validateAddLabour,
      withLogging(injectedLabourController.saveLabour));

    this.adminRoute.delete("/labour/:id",
      withLogging(injectedLabourController.removeLabour));

    this.adminRoute.put("/labour/:id",
      validateAddLabour,
      withLogging(injectedLabourController.updateLabour));

    this.adminRoute.get("/fetchlabour",
      withLogging(injectedLabourController.fetchlabour));

    this.adminRoute.get("/getLabour/:id", 
      withLogging(injectedLabourController.getLabourBYId));

    // =====================================================================
    // 🟢 SITE MANAGER ROUTES
    // =====================================================================
    this.adminRoute.get("/sitemanager",
      withLogging(injectedSitemanagerController.getSitemanager));

    this.adminRoute.post("/sitemanager",
      validateAddSitemanager,
      withLogging(injectedSitemanagerController.addSitemanager));

    this.adminRoute.put("/sitemanager/:id",
      validateAddSitemanager,
      withLogging(injectedSitemanagerController.editSitemanager));

    this.adminRoute.delete("/sitemanager/:id",
      withLogging(injectedSitemanagerController.deleteSitemanager));

    // =====================================================================
    // 🟢 SPECIFICATION ROUTES
    // =====================================================================

    this.adminRoute.get("/getSpec",
      withLogging(injectSpecController.fetchSpec));

    this.adminRoute.get("/getMatsum",
      withLogging(injectSpecController.findMaterialSum));

    this.adminRoute.get("/getLabSum",
      withLogging(injectSpecController.findLaboursum));

    this.adminRoute.get("/spec",
      withLogging(injectSpecController.getSpeclist));

    this.adminRoute.post("/spec",
      validateSpecification,
      withLogging(injectSpecController.saveSpec));

    this.adminRoute.put("/spec/:id",
      validateSpecification,
      withLogging(injectSpecController.updateSpec));

    this.adminRoute.get("/fetchSum", 
      withLogging(injectSpecController.fetchlabourMaterial));

    this.adminRoute.delete("/deleteSpec/:id",
      withLogging(injectSpecController.deleteSpec));



    // =====================================================================
    // 🟢 ESTIMATION ROUTES
    // =====================================================================
    this.adminRoute.post("/saveEstimation",
      validateSaveEstimation,
      withLogging(injectEstimationController.SaveEstimation));

    this.adminRoute.delete("/deleteEstimation/:id",
      withLogging(injectEstimationController.deleteEstimation));

    this.adminRoute.post("/updateEstimation",
      validateSaveEstimation,
      withLogging(injectEstimationController.updateEstimation));

    this.adminRoute.get("/fetchEstimation",
      withLogging(injectEstimationController.fetchEstimation));

    this.adminRoute.post("/uploadEstimated",
      validateUploadEstimationImage,
      withLogging(injectEstimationController.uploadImage));


    this.adminRoute.get("/fetchExistEstimation/:id", 
      withLogging(injectEstimationController.fetchExistEstimation));


    // =====================================================================
    // 🟢 STAGE ROUTES
    // =====================================================================
    this.adminRoute.get("/fetchbudget/:id",
      withLogging(injectStageController.fetchCost));

    this.adminRoute.post("/saveStage",
      validateStageAction,
      withLogging(injectStageController.stageSave));

    this.adminRoute.get("/fetchstage",
      withLogging(injectStageController.fetchStage));

    this.adminRoute.delete("/stageDelete/:id",
      withLogging(injectStageController.deleteStage));

    this.adminRoute.put("/editStage/:id",
      validateStageAction,
      withLogging(injectStageController.updateStage));

    this.adminRoute.get("/stageFetch/:id",
      withLogging(injectStageController.fetchStageData));

    // =====================================================================
    // 🟢 DASHBOARD ROUTES
    // =====================================================================
    this.adminRoute.get("/budgetActual",
      withLogging(injectAdminDashboardController.fetchBudgetVsActual));

    this.adminRoute.get("/budgetActualMaterial",
      withLogging(injectAdminDashboardController.fetchBudgetVsActualMaterial));

    this.adminRoute.get("/budgetActualLabour",
      withLogging(injectAdminDashboardController.fetchBudgetVsActualLabour));
  }
}
