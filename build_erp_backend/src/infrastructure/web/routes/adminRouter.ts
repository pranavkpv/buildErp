
import { Router } from "express";
import { adminMiddleWare } from "../../../middlewares/adminMiddleware";
import { JwtServiceImpl } from "../../../services/JwtService";
import { IAdminControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IAdminControllerEntity";
import { ICategoryControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/ICategoryControllerEntity";
import { IUnitControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IUnitControllerEntity";
import { IBrandControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IBrandControllerEntity";
import { IMaterialControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IMaterialControllerEntity";
import { IProjectControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IProjectControllerEntity";
import { ILabourControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/ILabourControllerEntity";
import { ISitemanagerControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/ISitemanagerControllerEntity";
import { IAddSiteControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IAddSiteControllerEntity";
import { ISpecControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/ISpecControllerEntity";
import { IEstimationControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IEstimationControllerEntity";
import { IStageControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/IStageControllerEntity";
import { withLogging } from "../../../middlewares/withLoggingMiddleware";



const createAdminRoute = (adminController: IAdminControllerEntity,
   categoryController: ICategoryControllerEntity, unitController: IUnitControllerEntity,
   brandController: IBrandControllerEntity, materialController: IMaterialControllerEntity,
   projectController: IProjectControllerEntity, labourController: ILabourControllerEntity,
   sitemanagerController : ISitemanagerControllerEntity,addSiteController:IAddSiteControllerEntity,
   specController : ISpecControllerEntity,estimationController:IEstimationControllerEntity,
   stageController : IStageControllerEntity

): Router => {
   const router = Router()
    const jwtService = new JwtServiceImpl()

   router.post('/login', withLogging(adminController.login))
   router.post('/logout',adminMiddleWare(jwtService),withLogging(adminController.logout))

   router.get('/category',adminMiddleWare(jwtService), withLogging(categoryController.categoryList))
   router.post('/category',adminMiddleWare(jwtService), withLogging(categoryController.addCategory))
   router.put('/category/:id',adminMiddleWare(jwtService), withLogging(categoryController.editCategory))
   router.delete('/category/:id',adminMiddleWare(jwtService), withLogging(categoryController.deleteCategory))

   router.get('/unit',adminMiddleWare(jwtService), withLogging(unitController.getUnit))
   router.post('/unit',adminMiddleWare(jwtService), withLogging(unitController.addUnit))
   router.put('/unit/:id',adminMiddleWare(jwtService), withLogging(unitController.editUnit))
   router.delete('/unit/:id',adminMiddleWare(jwtService), withLogging(unitController.removeUnit))
   router.get("/getUnit",adminMiddleWare(jwtService),withLogging(unitController.displayAllUnit))

   router.get('/brand',adminMiddleWare(jwtService), withLogging(brandController.brandList))
   router.post('/brand',adminMiddleWare(jwtService), withLogging(brandController.addBrand))
   router.put('/brand/:id',adminMiddleWare(jwtService), withLogging(brandController.editBrand))
   router.delete('/brand/:id',adminMiddleWare(jwtService), withLogging(brandController.removeBrand))

   router.get('/material',adminMiddleWare(jwtService), withLogging(materialController.materialList))
   router.get("/addmaterial",adminMiddleWare(jwtService), withLogging(materialController.addMaterialList))
   router.post("/material",adminMiddleWare(jwtService), withLogging(materialController.saveMaterial))
   router.get("/editmaterial/:id",adminMiddleWare(jwtService), withLogging(materialController.editMaterialList))
   router.put("/material/:id",adminMiddleWare(jwtService), withLogging(materialController.updateMaterial))
   router.delete("/material/:id",adminMiddleWare(jwtService), withLogging(materialController.removeMaterial))
   router.get("/fetchMaterial",adminMiddleWare(jwtService),withLogging(materialController.fetchUniqueMaterial))
   router.get("/fetMatbyUnit/:material",adminMiddleWare(jwtService),withLogging(materialController.fetchMaterialByUnit))
   router.get("/fetchMatbyBrand/:material",adminMiddleWare(jwtService),withLogging(materialController.fetchBrandbyName))
   router.get("/unitRate",adminMiddleWare(jwtService),withLogging(materialController.fetchUnitrate))
   router.get("/getmaterial/:id",adminMiddleWare(jwtService),withLogging(materialController.getMaterial))


   router.get("/project",adminMiddleWare(jwtService), withLogging(projectController.projectData))
   router.get("/addproject",adminMiddleWare(jwtService), withLogging(projectController.addProjectdata))
   router.post("/project",adminMiddleWare(jwtService), withLogging(projectController.saveProject))
   router.put("/project/:id",adminMiddleWare(jwtService), withLogging(projectController.updateProject))
   router.delete("/project/:id",adminMiddleWare(jwtService), withLogging(projectController.removeProject))
   router.put("/status/:id",adminMiddleWare(jwtService), withLogging(projectController.projectStatus))
   router.get("/getproject",withLogging(projectController.getProject))

   router.get("/labour",adminMiddleWare(jwtService), withLogging(labourController.getLabour))
   router.post("/labour",adminMiddleWare(jwtService), withLogging(labourController.saveLabour))
   router.delete("/labour/:id",adminMiddleWare(jwtService), withLogging(labourController.removeLabour))
   router.put("/labour/:id",adminMiddleWare(jwtService), withLogging(labourController.updateLabour))
   router.get("/fetchlabour",withLogging(labourController.fetchlabour))
   router.get("/getLabour/:id",adminMiddleWare(jwtService),withLogging(labourController.getLabourBYId))

   router.get("/sitemanager",adminMiddleWare(jwtService),withLogging(sitemanagerController.getSitemanager))
   router.post("/sitemanager",adminMiddleWare(jwtService),withLogging(sitemanagerController.addSitemanager))
   router.put("/sitemanager/:id",adminMiddleWare(jwtService),withLogging(sitemanagerController.editSitemanager))
   router.delete("/sitemanager/:id",adminMiddleWare(jwtService),withLogging(sitemanagerController.deleteSitemanager))

   router.get("/addToSite",adminMiddleWare(jwtService),withLogging(addSiteController.listSite))
   router.get("/addSiteToProjectData",adminMiddleWare(jwtService),withLogging(addSiteController.fetchProject))
   router.get("/addSiteToSiteData",adminMiddleWare(jwtService),withLogging(addSiteController.fetchSitemanager))
   router.post("/addToSite",adminMiddleWare(jwtService),withLogging(addSiteController.saveData))
   router.delete("/addToSite/:id/:sitemanagerId",adminMiddleWare(jwtService),withLogging(addSiteController.deleteSite))

   router.get("/spec",adminMiddleWare(jwtService),withLogging(specController.getSpeclist))
   router.post("/spec",adminMiddleWare(jwtService),withLogging(specController.saveSpec))
   router.put("/spec/:id",adminMiddleWare(jwtService),withLogging(specController.updateSpec))
   router.get("/fetchSum",adminMiddleWare(jwtService),withLogging(specController.fetchlabourMaterial))
   router.delete("/deleteSpec/:id",adminMiddleWare(jwtService),withLogging(specController.deleteSpec))
   router.get("/getSpec",adminMiddleWare(jwtService),withLogging(specController.fetchSpec))


   router.get("/getMatsum",adminMiddleWare(jwtService),withLogging(specController.findMaterialSum))
   router.get("/getLabSum",adminMiddleWare(jwtService),withLogging(specController.findLaboursum))
   router.post("/saveEstimation",adminMiddleWare(jwtService),withLogging(estimationController.SaveEstimation))
   router.get("/fetchEstimation",adminMiddleWare(jwtService),withLogging(estimationController.fetchEstimation))
   router.delete("/deleteEstimation/:id",adminMiddleWare(jwtService),withLogging(estimationController.deleteEstimation))
   router.post("/uploadEstimated",adminMiddleWare(jwtService),withLogging(estimationController.uploadImage))
   router.get("/fetchExistEstimation/:id",withLogging(estimationController.fetchExistEstimation))
   router.post("/updateEstimation",adminMiddleWare(jwtService),withLogging(estimationController.updateEstimation))


   router.get("/fetchbudget/:id",adminMiddleWare(jwtService),withLogging(stageController.fetchCost))
   router.post("/saveStage",adminMiddleWare(jwtService),withLogging(stageController.stageSave))
   router.get("/fetchstage",adminMiddleWare(jwtService),withLogging(stageController.fetchStage))
   router.post("/stageDelete",adminMiddleWare(jwtService),withLogging(stageController.deleteStage))
   router.put("/editStage/:id",adminMiddleWare(jwtService),withLogging(stageController.updateStage))

   


   return router
}


export default createAdminRoute
