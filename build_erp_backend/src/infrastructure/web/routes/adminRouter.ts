
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
import { LabourController } from "../controllers/admin/labourController";



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

   router.post('/login', adminController.login)
   router.post('/logout',adminMiddleWare(jwtService),adminController.logout)

   router.get('/category',adminMiddleWare(jwtService), categoryController.categoryList)
   router.post('/category',adminMiddleWare(jwtService), categoryController.addCategory)
   router.put('/category/:id',adminMiddleWare(jwtService), categoryController.editCategory)
   router.delete('/category/:id',adminMiddleWare(jwtService), categoryController.deleteCategory)

   router.get('/unit',adminMiddleWare(jwtService), unitController.getUnit)
   router.post('/unit',adminMiddleWare(jwtService), unitController.addUnit)
   router.put('/unit/:id',adminMiddleWare(jwtService), unitController.editUnit)
   router.delete('/unit/:id',adminMiddleWare(jwtService), unitController.removeUnit)
   router.get("/getUnit",adminMiddleWare(jwtService),unitController.displayAllUnit)

   router.get('/brand',adminMiddleWare(jwtService), brandController.brandList)
   router.post('/brand',adminMiddleWare(jwtService), brandController.addBrand)
   router.put('/brand/:id',adminMiddleWare(jwtService), brandController.editBrand)
   router.delete('/brand/:id',adminMiddleWare(jwtService), brandController.removeBrand)

   router.get('/material',adminMiddleWare(jwtService), materialController.materialList)
   router.get("/addmaterial",adminMiddleWare(jwtService), materialController.addMaterialList)
   router.post("/material",adminMiddleWare(jwtService), materialController.saveMaterial)
   router.get("/editmaterial/:id",adminMiddleWare(jwtService), materialController.editMaterialList)
   router.put("/material",adminMiddleWare(jwtService), materialController.updateMaterial)
   router.delete("/material/:id",adminMiddleWare(jwtService), materialController.removeMaterial)
   router.get("/fetchMaterial",adminMiddleWare(jwtService),materialController.fetchUniqueMaterial)
   router.get("/fetMatbyUnit/:material",adminMiddleWare(jwtService),materialController.fetchMaterialByUnit)
   router.get("/fetchMatbyBrand/:material",adminMiddleWare(jwtService),materialController.fetchBrandbyName)
   router.get("/unitRate",adminMiddleWare(jwtService),materialController.fetchUnitrate)
   router.get("/getmaterial/:id",adminMiddleWare(jwtService),materialController.getMaterial)


   router.get("/project",adminMiddleWare(jwtService), projectController.projectData)
   router.get("/addproject",adminMiddleWare(jwtService), projectController.addProjectdata)
   router.post("/project",adminMiddleWare(jwtService), projectController.saveProject)
   router.put("/project/:id",adminMiddleWare(jwtService), projectController.updateProject)
   router.delete("/project/:id",adminMiddleWare(jwtService), projectController.removeProject)
   router.put("/status/:id",adminMiddleWare(jwtService), projectController.projectStatus)
   router.get("/getproject",projectController.getProject)

   router.get("/labour",adminMiddleWare(jwtService), labourController.getLabour)
   router.post("/labour",adminMiddleWare(jwtService), labourController.saveLabour)
   router.delete("/labour/:id",adminMiddleWare(jwtService), labourController.removeLabour)
   router.put("/labour/:id",adminMiddleWare(jwtService), labourController.updateLabour)
   router.get("/fetchlabour",labourController.fetchlabour)
   router.get("/getLabour/:id",adminMiddleWare(jwtService),labourController.getLabourBYId)

   router.get("/sitemanager",adminMiddleWare(jwtService),sitemanagerController.getSitemanager)
   router.post("/sitemanager",adminMiddleWare(jwtService),sitemanagerController.addSitemanager)
   router.put("/sitemanager/:id",adminMiddleWare(jwtService),sitemanagerController.editSitemanager)
   router.delete("/sitemanager/:id",adminMiddleWare(jwtService),sitemanagerController.deleteSitemanager)

   router.get("/addToSite",adminMiddleWare(jwtService),addSiteController.listSite)
   router.get("/addSiteToProjectData",adminMiddleWare(jwtService),addSiteController.fetchProject)
   router.get("/addSiteToSiteData",adminMiddleWare(jwtService),addSiteController.fetchSitemanager)
   router.post("/addToSite",adminMiddleWare(jwtService),addSiteController.saveData)
   router.delete("/addToSite/:id/:sitemanagerId",adminMiddleWare(jwtService),addSiteController.deleteSite)

   router.get("/spec",adminMiddleWare(jwtService),specController.getSpeclist)
   router.post("/spec",adminMiddleWare(jwtService),specController.saveSpec)
   router.put("/spec/:id",adminMiddleWare(jwtService),specController.updateSpec)
   router.get("/fetchSum",adminMiddleWare(jwtService),specController.fetchlabourMaterial)
   router.delete("/deleteSpec/:id",adminMiddleWare(jwtService),specController.deleteSpec)
   router.get("/getSpec",adminMiddleWare(jwtService),specController.fetchSpec)


   router.get("/getMatsum",adminMiddleWare(jwtService),specController.findMaterialSum)
   router.get("/getLabSum",adminMiddleWare(jwtService),specController.findLaboursum)
   router.post("/saveEstimation",adminMiddleWare(jwtService),estimationController.SaveEstimation)
   router.get("/fetchEstimation",adminMiddleWare(jwtService),estimationController.fetchEstimation)
   router.delete("/deleteEstimation/:id",adminMiddleWare(jwtService),estimationController.deleteEstimation)
   router.post("/uploadEstimated",adminMiddleWare(jwtService),estimationController.uploadImage)
   router.get("/fetchExistEstimation/:id",estimationController.fetchExistEstimation)
   router.post("/updateEstimation",adminMiddleWare(jwtService),estimationController.updateEstimation)


   router.get("/fetchbudget/:id",adminMiddleWare(jwtService),stageController.fetchCost)
   router.post("/saveStage",adminMiddleWare(jwtService),stageController.stageSave)
   router.get("/fetchstage",adminMiddleWare(jwtService),stageController.fetchStage)
   router.post("/stageDelete",adminMiddleWare(jwtService),stageController.deleteStage)
   router.put("/editStage/:id",adminMiddleWare(jwtService),stageController.updateStage)

   


   return router
}


export default createAdminRoute
