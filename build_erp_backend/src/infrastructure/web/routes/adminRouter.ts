
import { Router } from "express";
import { adminMiddleWare } from "../../../middlewares/adminMiddleware";
import { JwtServiceImpl } from "../../../services/JwtService";

import { injectAddSiteController, injectAdminDashboardController, injectBrandController, injectedAdminController, injectedCategoryController, injectedLabourController, injectedMaterialController, injectedProjectController, injectedSitemanagerController, injectedUnitController, injectEstimationController, injectSpecController, injectStageController } from "../../../DI/adminInject";
import { withLogging } from "../../../middlewares/withLoggingMiddleware";



export class AdminRoute {
   public adminRoute: Router
   constructor() {
      this.adminRoute = Router()
      this.setRoute()
   }
   private setRoute() {
      const jwtService = new JwtServiceImpl()

      this.adminRoute.post('/login', withLogging(injectedAdminController.login))
      this.adminRoute.post('/logout', adminMiddleWare(jwtService), withLogging(injectedAdminController.logout))

      this.adminRoute.get('/category', adminMiddleWare(jwtService), withLogging(injectedCategoryController.categoryList))
      this.adminRoute.post('/category', adminMiddleWare(jwtService), withLogging(injectedCategoryController.addCategory))
      this.adminRoute.put('/category/:id', adminMiddleWare(jwtService), withLogging(injectedCategoryController.editCategory))
      this.adminRoute.delete('/category/:id', adminMiddleWare(jwtService), withLogging(injectedCategoryController.deleteCategory))

      this.adminRoute.get('/unit', adminMiddleWare(jwtService), withLogging(injectedUnitController.getUnit))
      this.adminRoute.post('/unit', adminMiddleWare(jwtService), withLogging(injectedUnitController.addUnit))
      this.adminRoute.put('/unit/:id', adminMiddleWare(jwtService), withLogging(injectedUnitController.editUnit))
      this.adminRoute.delete('/unit/:id', adminMiddleWare(jwtService), withLogging(injectedUnitController.removeUnit))
      this.adminRoute.get("/getUnit", adminMiddleWare(jwtService), withLogging(injectedUnitController.displayAllUnit))

      this.adminRoute.get('/brand', adminMiddleWare(jwtService), withLogging(injectBrandController.brandList))
      this.adminRoute.post('/brand', adminMiddleWare(jwtService), withLogging(injectBrandController.addBrand))
      this.adminRoute.put('/brand/:id', adminMiddleWare(jwtService), withLogging(injectBrandController.editBrand))
      this.adminRoute.delete('/brand/:id', adminMiddleWare(jwtService), withLogging(injectBrandController.removeBrand))

      this.adminRoute.get('/material', adminMiddleWare(jwtService), withLogging(injectedMaterialController.materialList))
      this.adminRoute.get("/addmaterial", adminMiddleWare(jwtService), withLogging(injectedMaterialController.addMaterialList))
      this.adminRoute.post("/material", adminMiddleWare(jwtService), withLogging(injectedMaterialController.saveMaterial))
      this.adminRoute.get("/editmaterial/:id", adminMiddleWare(jwtService), withLogging(injectedMaterialController.editMaterialList))
      this.adminRoute.put("/material/:id", adminMiddleWare(jwtService), withLogging(injectedMaterialController.updateMaterial))
      this.adminRoute.delete("/material/:id", adminMiddleWare(jwtService), withLogging(injectedMaterialController.removeMaterial))
      this.adminRoute.get("/fetchMaterial", withLogging(injectedMaterialController.fetchUniqueMaterial))
      this.adminRoute.get("/fetMatbyUnit/:material", withLogging(injectedMaterialController.fetchMaterialByUnit))
      this.adminRoute.get("/fetchMatbyBrand/:material", withLogging(injectedMaterialController.fetchBrandbyName))
      this.adminRoute.get("/unitRate", withLogging(injectedMaterialController.fetchUnitrate))
      this.adminRoute.get("/getmaterial/:id", adminMiddleWare(jwtService), withLogging(injectedMaterialController.getMaterial))


      this.adminRoute.get("/project", adminMiddleWare(jwtService), withLogging(injectedProjectController.projectData))
      this.adminRoute.get("/addproject", adminMiddleWare(jwtService), withLogging(injectedProjectController.addProjectdata))
      this.adminRoute.post("/project", adminMiddleWare(jwtService), withLogging(injectedProjectController.saveProject))
      this.adminRoute.put("/project/:id", adminMiddleWare(jwtService), withLogging(injectedProjectController.updateProject))
      this.adminRoute.delete("/project/:id", adminMiddleWare(jwtService), withLogging(injectedProjectController.removeProject))
      this.adminRoute.put("/status/:id", adminMiddleWare(jwtService), withLogging(injectedProjectController.projectStatus))
      this.adminRoute.get("/getproject", withLogging(injectedProjectController.getProject))

      this.adminRoute.get("/labour", adminMiddleWare(jwtService), withLogging(injectedLabourController.getLabour))
      this.adminRoute.post("/labour", adminMiddleWare(jwtService), withLogging(injectedLabourController.saveLabour))
      this.adminRoute.delete("/labour/:id", adminMiddleWare(jwtService), withLogging(injectedLabourController.removeLabour))
      this.adminRoute.put("/labour/:id", adminMiddleWare(jwtService), withLogging(injectedLabourController.updateLabour))
      this.adminRoute.get("/fetchlabour", withLogging(injectedLabourController.fetchlabour))
      this.adminRoute.get("/getLabour/:id", adminMiddleWare(jwtService), withLogging(injectedLabourController.getLabourBYId))

      this.adminRoute.get("/sitemanager", adminMiddleWare(jwtService), withLogging(injectedSitemanagerController.getSitemanager))
      this.adminRoute.post("/sitemanager", adminMiddleWare(jwtService), withLogging(injectedSitemanagerController.addSitemanager))
      this.adminRoute.put("/sitemanager/:id", adminMiddleWare(jwtService), withLogging(injectedSitemanagerController.editSitemanager))
      this.adminRoute.delete("/sitemanager/:id", adminMiddleWare(jwtService), withLogging(injectedSitemanagerController.deleteSitemanager))

      this.adminRoute.get("/addToSite", adminMiddleWare(jwtService), withLogging(injectAddSiteController.listSite))
      this.adminRoute.get("/addSiteToProjectData", adminMiddleWare(jwtService), withLogging(injectAddSiteController.fetchProject))
      this.adminRoute.get("/addSiteToSiteData", adminMiddleWare(jwtService), withLogging(injectAddSiteController.fetchSitemanager))
      this.adminRoute.post("/addToSite", adminMiddleWare(jwtService), withLogging(injectAddSiteController.saveData))
      this.adminRoute.delete("/addToSite/:id/:sitemanagerId", adminMiddleWare(jwtService), withLogging(injectAddSiteController.deleteSite))

      this.adminRoute.get("/spec", adminMiddleWare(jwtService), withLogging(injectSpecController.getSpeclist))
      this.adminRoute.post("/spec", adminMiddleWare(jwtService), withLogging(injectSpecController.saveSpec))
      this.adminRoute.put("/spec/:id", adminMiddleWare(jwtService), withLogging(injectSpecController.updateSpec))
      this.adminRoute.get("/fetchSum", adminMiddleWare(jwtService), withLogging(injectSpecController.fetchlabourMaterial))
      this.adminRoute.delete("/deleteSpec/:id", adminMiddleWare(jwtService), withLogging(injectSpecController.deleteSpec))
      this.adminRoute.get("/getSpec", adminMiddleWare(jwtService), withLogging(injectSpecController.fetchSpec))
      this.adminRoute.get("/getMatsum", adminMiddleWare(jwtService), withLogging(injectSpecController.findMaterialSum))
      this.adminRoute.get("/getLabSum", adminMiddleWare(jwtService), withLogging(injectSpecController.findLaboursum))

      this.adminRoute.post("/saveEstimation", adminMiddleWare(jwtService), withLogging(injectEstimationController.SaveEstimation))
      this.adminRoute.get("/fetchEstimation", adminMiddleWare(jwtService), withLogging(injectEstimationController.fetchEstimation))
      this.adminRoute.delete("/deleteEstimation/:id", adminMiddleWare(jwtService), withLogging(injectEstimationController.deleteEstimation))
      this.adminRoute.post("/uploadEstimated", adminMiddleWare(jwtService), withLogging(injectEstimationController.uploadImage))
      this.adminRoute.get("/fetchExistEstimation/:id", withLogging(injectEstimationController.fetchExistEstimation))
      this.adminRoute.post("/updateEstimation", adminMiddleWare(jwtService), withLogging(injectEstimationController.updateEstimation))


      this.adminRoute.get("/fetchbudget/:id", adminMiddleWare(jwtService), withLogging(injectStageController.fetchCost))
      this.adminRoute.post("/saveStage", adminMiddleWare(jwtService), withLogging(injectStageController.stageSave))
      this.adminRoute.get("/fetchstage", adminMiddleWare(jwtService), withLogging(injectStageController.fetchStage))
      this.adminRoute.post("/stageDelete", adminMiddleWare(jwtService), withLogging(injectStageController.deleteStage))
      this.adminRoute.put("/editStage/:id", adminMiddleWare(jwtService), withLogging(injectStageController.updateStage))

      this.adminRoute.get("/budgetActual", adminMiddleWare(jwtService), withLogging(injectAdminDashboardController.fetchBudgetVsActual))

      
   }

}

