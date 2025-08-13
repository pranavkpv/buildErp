// ---------------------------- IMPORTS ---------------------------- //
import { Router } from "express";
import { adminMiddleWare } from "../../../../middlewares/adminMiddleware";
import { withLogging } from "../../../../middlewares/withLoggingMiddleware";
import { JwtService } from "../../../../services/JwtService";
import {
  injectAddSiteController,
  injectAdminDashboardController,
  injectedAdminController,
  injectedLabourController,
  injectedMaterialController,
  injectedProjectController,
  injectedSitemanagerController,
  injectEstimationController,
  injectSpecController,
  injectStageController
} from "../../../../DI/adminInject";
import { injectedAddCategoryController, injectedDeleteCategoryController, injectedEditCategoryController, injectedFetchCategoryListController } from "../../../../DI/Categoryi.Injection";
import { injectedAddUnitController, injectedDeleteUnitController, injectedDisplayAllUnitController, injectedEditUnitController, injectedGetUnitController } from "../../../../DI/Unit.Injection";
import { injectedAddBrandController, injectedDeleteBrandController, injectedDisplayBrandController, injectedEditBrandController } from "../../../../DI/Brand.Injection";

// ---------------------------- ROUTE CLASS ---------------------------- //
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

    this.adminRoute.post("/logout", withLogging(injectedAdminController.logout));

    // =====================================================================
    // 🟢 CATEGORY ROUTES
    // =====================================================================
    this.adminRoute.post("/category", withLogging(injectedAddCategoryController.addCategoryHandler));
    this.adminRoute.get("/category", withLogging(injectedFetchCategoryListController.categoryListHandler));
    this.adminRoute.put("/category/:id", withLogging(injectedEditCategoryController.editCategoryHandler));
    this.adminRoute.delete("/category/:id", withLogging(injectedDeleteCategoryController.deleteCategoryHandler));

    // =====================================================================
    // 🟢 UNIT ROUTES
    // =====================================================================
    this.adminRoute.get("/unit", withLogging(injectedGetUnitController.getUnitHandler));
    this.adminRoute.post("/unit", withLogging(injectedAddUnitController.addUnitHandler));
    this.adminRoute.put("/unit/:id", withLogging(injectedEditUnitController.editUnitHandler));
    this.adminRoute.delete("/unit/:id", withLogging(injectedDeleteUnitController.removeUnitHandler));
    this.adminRoute.get("/getUnit", withLogging(injectedDisplayAllUnitController.displayAllUnitHandler));

    // =====================================================================
    // 🟢 BRAND ROUTES
    // =====================================================================
    this.adminRoute.get("/brand", withLogging(injectedDisplayBrandController.brandListHandler));
    this.adminRoute.post("/brand", withLogging(injectedAddBrandController.addBrandHandler));
    this.adminRoute.put("/brand/:id", withLogging(injectedEditBrandController.editBrandHandler));
    this.adminRoute.delete("/brand/:id", withLogging(injectedDeleteBrandController.removeBrandHandler));

    // =====================================================================
    // 🟢 MATERIAL ROUTES
    // =====================================================================
    this.adminRoute.get("/material", withLogging(injectedMaterialController.materialList));
    this.adminRoute.get("/addmaterial", withLogging(injectedMaterialController.addMaterialList));
    this.adminRoute.post("/material", withLogging(injectedMaterialController.saveMaterial));
    this.adminRoute.get("/editmaterial/:id", withLogging(injectedMaterialController.editMaterialList));
    this.adminRoute.put("/material/:id", adminMiddleWare(jwtService), withLogging(injectedMaterialController.updateMaterial));
    this.adminRoute.delete("/material/:id", withLogging(injectedMaterialController.removeMaterial));
    this.adminRoute.get("/fetchMaterial", withLogging(injectedMaterialController.fetchUniqueMaterial));
    this.adminRoute.get("/fetMatbyUnit/:material", withLogging(injectedMaterialController.fetchMaterialByUnit));
    this.adminRoute.get("/fetchMatbyBrand/:material", withLogging(injectedMaterialController.fetchBrandbyName));
    this.adminRoute.get("/unitRate", withLogging(injectedMaterialController.fetchUnitrate));
    this.adminRoute.get("/getmaterial/:id", withLogging(injectedMaterialController.getMaterial));

    // =====================================================================
    // 🟢 PROJECT ROUTES
    // =====================================================================
    this.adminRoute.get("/project", withLogging(injectedProjectController.projectData));
    this.adminRoute.get("/addproject", withLogging(injectedProjectController.addProjectdata));
    this.adminRoute.post("/project", withLogging(injectedProjectController.saveProject));
    this.adminRoute.put("/project/:id", withLogging(injectedProjectController.updateProject));
    this.adminRoute.delete("/project/:id", withLogging(injectedProjectController.removeProject));
    this.adminRoute.put("/status/:id", withLogging(injectedProjectController.projectStatus));
    this.adminRoute.get("/getproject", withLogging(injectedProjectController.getProject));

    // =====================================================================
    // 🟢 LABOUR ROUTES
    // =====================================================================
    this.adminRoute.get("/labour", withLogging(injectedLabourController.getLabour));
    this.adminRoute.post("/labour", withLogging(injectedLabourController.saveLabour));
    this.adminRoute.delete("/labour/:id", withLogging(injectedLabourController.removeLabour));
    this.adminRoute.put("/labour/:id", withLogging(injectedLabourController.updateLabour));
    this.adminRoute.get("/fetchlabour", withLogging(injectedLabourController.fetchlabour));
    this.adminRoute.get("/getLabour/:id", withLogging(injectedLabourController.getLabourBYId));

    // =====================================================================
    // 🟢 SITE MANAGER ROUTES
    // =====================================================================
    this.adminRoute.get("/sitemanager", withLogging(injectedSitemanagerController.getSitemanager));
    this.adminRoute.post("/sitemanager", withLogging(injectedSitemanagerController.addSitemanager));
    this.adminRoute.put("/sitemanager/:id", withLogging(injectedSitemanagerController.editSitemanager));
    this.adminRoute.delete("/sitemanager/:id", withLogging(injectedSitemanagerController.deleteSitemanager));

    // =====================================================================
    // 🟢 SITE ASSIGNMENT ROUTES
    // =====================================================================
    this.adminRoute.get("/addToSite", withLogging(injectAddSiteController.listSite));
    this.adminRoute.get("/addSiteToProjectData", withLogging(injectAddSiteController.fetchProject));
    this.adminRoute.get("/addSiteToSiteData", withLogging(injectAddSiteController.fetchSitemanager));
    this.adminRoute.post("/addToSite", withLogging(injectAddSiteController.saveData));
    this.adminRoute.delete("/addToSite/:id/:sitemanagerId", withLogging(injectAddSiteController.deleteSite));

    // =====================================================================
    // 🟢 SPECIFICATION ROUTES
    // =====================================================================
    this.adminRoute.get("/spec", withLogging(injectSpecController.getSpeclist));
    this.adminRoute.post("/spec", withLogging(injectSpecController.saveSpec));
    this.adminRoute.put("/spec/:id", withLogging(injectSpecController.updateSpec));
    this.adminRoute.get("/fetchSum", withLogging(injectSpecController.fetchlabourMaterial));
    this.adminRoute.delete("/deleteSpec/:id", withLogging(injectSpecController.deleteSpec));
    this.adminRoute.get("/getSpec", withLogging(injectSpecController.fetchSpec));
    this.adminRoute.get("/getMatsum", withLogging(injectSpecController.findMaterialSum));
    this.adminRoute.get("/getLabSum", withLogging(injectSpecController.findLaboursum));

    // =====================================================================
    // 🟢 ESTIMATION ROUTES
    // =====================================================================
    this.adminRoute.post("/saveEstimation", withLogging(injectEstimationController.SaveEstimation));
    this.adminRoute.get("/fetchEstimation", withLogging(injectEstimationController.fetchEstimation));
    this.adminRoute.delete("/deleteEstimation/:id", withLogging(injectEstimationController.deleteEstimation));
    this.adminRoute.post("/uploadEstimated", withLogging(injectEstimationController.uploadImage));
    this.adminRoute.get("/fetchExistEstimation/:id", withLogging(injectEstimationController.fetchExistEstimation));
    this.adminRoute.post("/updateEstimation", withLogging(injectEstimationController.updateEstimation));

    // =====================================================================
    // 🟢 STAGE ROUTES
    // =====================================================================
    this.adminRoute.get("/fetchbudget/:id", withLogging(injectStageController.fetchCost));
    this.adminRoute.post("/saveStage", withLogging(injectStageController.stageSave));
    this.adminRoute.get("/fetchstage", withLogging(injectStageController.fetchStage));
    this.adminRoute.post("/stageDelete", withLogging(injectStageController.deleteStage));
    this.adminRoute.put("/editStage/:id", withLogging(injectStageController.updateStage));

    // =====================================================================
    // 🟢 DASHBOARD ROUTES
    // =====================================================================
    this.adminRoute.get("/budgetActual", withLogging(injectAdminDashboardController.fetchBudgetVsActual));
    this.adminRoute.get("/budgetActualMaterial", withLogging(injectAdminDashboardController.fetchBudgetVsActualMaterial));
    this.adminRoute.get("/budgetActualLabour", withLogging(injectAdminDashboardController.fetchBudgetVsActualLabour));
  }
}
