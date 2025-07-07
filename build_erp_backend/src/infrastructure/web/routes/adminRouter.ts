
import { Router } from "express";
import { adminController } from "../controllers/admin/adminController";

import { ProjectController } from "../controllers/admin/projectController";
import {  SitemanagerController } from "../controllers/admin/sitemanagerController";
import { UnitController } from "../controllers/admin/unitController";
import { AddSiteController } from "../controllers/admin/addSiteController";
import { CategoryController } from "../controllers/admin/categoryController";
import { MaterialController } from "../controllers/admin/materialController";
import { brandController } from "../controllers/admin/brandController";
import { LabourController } from "../controllers/admin/labourController";
import { SpecController } from "../controllers/admin/specController";
import { EstimationController } from "../controllers/admin/estimationController";
import { StageController } from "../controllers/admin/satgeController";



const createAdminRoute = (adminController: adminController,
   categoryController: CategoryController, unitController: UnitController,
   brandController: brandController, materialController: MaterialController,
   projectController: ProjectController, labourController: LabourController,
   sitemanagerController : SitemanagerController,addSiteController:AddSiteController,
   specController : SpecController,estimationController:EstimationController,
   stageController : StageController 

): Router => {
   const router = Router()
   router.post('/login', adminController.login)
   router.post('/logout',adminController.logout)

   router.get('/category', categoryController.categoryList)
   router.post('/category', categoryController.addCategory)
   router.put('/category', categoryController.editCategory)
   router.delete('/category', categoryController.deleteCategory)

   router.get('/unit', unitController.getUnit)
   router.post('/unit', unitController.addUnit)
   router.put('/unit', unitController.editUnit)
   router.delete('/unit', unitController.removeUnit)
   router.get("/getUnit",unitController.displayAllUnit)

   router.get('/brand', brandController.brandList)
   router.post('/brand', brandController.addBrand)
   router.put('/brand', brandController.editBrand)
   router.delete('/brand', brandController.removeBrand)

   router.get('/material', materialController.materialList)
   router.get("/addmaterial", materialController.addMaterialList)
   router.post("/material", materialController.saveMaterial)
   router.get("/editmaterial", materialController.editMaterialList)
   router.put("/material", materialController.updateMaterial)
   router.delete("/material", materialController.removeMaterial)
   router.get("/fetchMaterial",materialController.fetchUniqueMaterial)
   router.get("/fetMatbyUnit",materialController.fetchMaterialByUnit)
   router.get("/fetchMatbyBrand",materialController.fetchBrandbyName)
   router.get("/unitRate",materialController.fetchUnitrate)


   router.get("/project", projectController.projectData)
   router.get("/addproject", projectController.addProjectdata)
   router.post("/project", projectController.saveProject)
   router.put("/project", projectController.updateProject)
   router.delete("/project", projectController.removeProject)
   router.put("/status", projectController.projectStatus)
   router.get("/getproject",projectController.getProject)

   router.get("/labour", labourController.getLabour)
   router.post("/labour", labourController.saveLabour)
   router.delete("/labour", labourController.removeLabour)
   router.put("/labour", labourController.updateLabour)
   router.get("/fetchlabour",labourController.fetchlabour)

   router.get("/sitemanager",sitemanagerController.getSitemanager)
   router.post("/sitemanager",sitemanagerController.addSitemanager)
   router.put("/sitemanager",sitemanagerController.editSitemanager)
   router.delete("/sitemanager",sitemanagerController.deleteSitemanager)

   router.get("/addToSite",addSiteController.listSite)
   router.get("/addSiteToProjectData",addSiteController.fetchProject)
   router.get("/addSiteToSiteData",addSiteController.fetchSitemanager)
   router.post("/addToSite",addSiteController.saveData)
   router.delete("/addToSite",addSiteController.deleteSite)

   router.get("/spec",specController.getSpeclist)
   router.post("/spec",specController.saveSpec)
   router.get("/fetchSum",specController.fetchlabourMaterial)
   router.delete("/deleteSpec",specController.deleteSpec)
   router.get("/getSpec",specController.fetchSpec)


   router.get("/getMatsum",specController.findMaterialSum)
   router.get("/getLabSum",specController.findLaboursum)
   router.post("/saveEstimation",estimationController.SaveEstimation)
   router.get("/fetchEstimation",estimationController.fetchEstimation)
   router.delete("/deleteEstimation",estimationController.deleteEstimation)
   router.post("/uploadEstimated",estimationController.uploadImage)


   router.get("/fetchbudget",stageController.fetchCost)
   router.post("/saveStage",stageController.stageSave)
   router.get("/fetchstage",stageController.fetchStage)
   router.post("/stageDelete",stageController.deleteStage)
   


   return router
}


export default createAdminRoute
