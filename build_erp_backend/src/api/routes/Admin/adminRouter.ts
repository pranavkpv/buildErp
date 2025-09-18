import { Router } from 'express';
import { withLogging } from '../../../infrastructure/middlewares/withLoggingMiddleware';
import { adminMiddleWare } from '../../../infrastructure/middlewares/adminMiddleware';
import { validateAddSitemanagerToproject } from '../../../infrastructure/middlewares/validation/addsitemanagerToproject.validation';
import { validateSaveEstimation, validateUploadEstimationImage } from '../../../infrastructure/middlewares/validation/estimation.validaion';
import { validateAddLabour } from '../../../infrastructure/middlewares/validation/labour.validation';
import { validateAddMaterial } from '../../../infrastructure/middlewares/validation/material.validation';
import { validateProjectEdit } from '../../../infrastructure/middlewares/validation/project.validation';
import { validateSpecification } from '../../../infrastructure/middlewares/validation/spec.validation';
import { validateBrandAction } from '../../../infrastructure/middlewares/validation/brand.validation';
import { validateCategoryAction } from '../../../infrastructure/middlewares/validation/category.validation';
import { validateUnitAction } from '../../../infrastructure/middlewares/validation/unit.validation';
import { JwtService } from '../../../application/services/JwtService';
import { validateAddSitemanager } from '../../../infrastructure/middlewares/validation/sitemanager.validation';
import { injectedAdminController } from '../../DI/Admin';
import { injectAddSitemanagerToprojectController } from '../../DI/AddSitemanagerToProject';
import { injectedCategoryController } from '../../DI/Category';
import { injectedUnitController } from '../../DI/Unit';
import { injectedBrandController } from '../../DI/Brand';
import { injectedMaterialController } from '../../DI/Material';
import { injectedProjectController } from '../../DI/Project';
import { injectedLabourController } from '../../DI/Labour';
import { injectedSitemanagerController } from '../../DI/Sitemanager';
import { validateStageAction } from '../../../infrastructure/middlewares/validation/stage.validation';
import { injectSpecController } from '../../DI/Specification';
import { injectEstimationController } from '../../DI/Estimation';
import { injectStageController } from '../../DI/Stage';
import { injectAdminDashboardController } from '../../DI/AdminDashboard';
import { validateAdminLogin } from '../../../infrastructure/middlewares/validation/admin.validation';
import { injectedBannerController } from '../../DI/Banner';
import { validateBannerInput } from '../../../infrastructure/middlewares/validation/banner.validation';




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
        this.adminRoute.post('/login',
            validateAdminLogin,
            withLogging(injectedAdminController.adminLogin));

        // ✅ Protect all routes after this middleware
        this.adminRoute.use(adminMiddleWare(jwtService));

        // =====================================================================
        // 🟢 SITE ASSIGNMENT ROUTES
        // =====================================================================
        this.adminRoute.get('/addSiteToSiteData',
            withLogging(injectAddSitemanagerToprojectController.fetchSiteManagers));

        this.adminRoute.post('/addToSite',
            validateAddSitemanagerToproject,
            withLogging(injectAddSitemanagerToprojectController.addSiteManagerToProject));

        this.adminRoute.delete('/addToSite/:id/:sitemanagerId',
            withLogging(injectAddSitemanagerToprojectController.removeSiteManagerFromProject));

        this.adminRoute.get('/addToSite',
            withLogging(injectAddSitemanagerToprojectController.listProjectsWithSiteManagers));


        this.adminRoute.post('/logout', withLogging(injectedAdminController.adminLogout));

        // =====================================================================
        // 🟢 CATEGORY ROUTES
        // =====================================================================
        this.adminRoute.post('/category',
            validateCategoryAction,
            withLogging(injectedCategoryController.createCategory));

        this.adminRoute.get('/category',
            withLogging(injectedCategoryController.getAllCategories));

        this.adminRoute.put('/category/:id',
            validateCategoryAction,
            withLogging(injectedCategoryController.updateCategory));

        this.adminRoute.patch('/category/:id',
            withLogging(injectedCategoryController.deleteCategory));

        // =====================================================================
        // 🟢 UNIT ROUTES
        // =====================================================================
        this.adminRoute.get('/unit',
            withLogging(injectedUnitController.getUnits));

        this.adminRoute.post('/unit',
            validateUnitAction,
            withLogging(injectedUnitController.createUnit));

        this.adminRoute.put('/unit/:id',
            validateUnitAction,
            withLogging(injectedUnitController.updateUnit));

        this.adminRoute.patch('/unit/:id',
            withLogging(injectedUnitController.deleteUnit));

        this.adminRoute.get('/getUnit',
            withLogging(injectedUnitController.fetchAllUnits));

        // =====================================================================
        // 🟢 BRAND ROUTES
        // =====================================================================
        this.adminRoute.get('/brand',
            withLogging(injectedBrandController.getAllBrands));

        this.adminRoute.post('/brand',
            validateBrandAction,
            withLogging(injectedBrandController.addBrand));

        this.adminRoute.put('/brand/:id',
            validateBrandAction,
            withLogging(injectedBrandController.updateBrand));

        this.adminRoute.patch('/brand/:id',
            withLogging(injectedBrandController.deleteBrand));

        // =====================================================================
        // 🟢 MATERIAL ROUTES
        // =====================================================================
        this.adminRoute.get('/material',
            withLogging(injectedMaterialController.getPaginatedMaterialList));

        this.adminRoute.get('/addmaterial',
            withLogging(injectedMaterialController.getAddMaterialDependencies));

        this.adminRoute.post('/material',
            validateAddMaterial,
            withLogging(injectedMaterialController.createMaterial));

        this.adminRoute.get('/editmaterial/:id',
            withLogging(injectedMaterialController.getEditMaterialDependencies));

        this.adminRoute.put('/material/:id', adminMiddleWare(jwtService),
            validateAddMaterial,
            withLogging(injectedMaterialController.updateMaterial));

        this.adminRoute.patch('/material/:id',
            withLogging(injectedMaterialController.deleteMaterial));

        this.adminRoute.get('/fetchMaterial',
            withLogging(injectedMaterialController.getUniqueMaterialNames));

        this.adminRoute.get('/fetMatbyUnit/:material',
            withLogging(injectedMaterialController.getUnitsByMaterialName));

        this.adminRoute.get('/fetchMatbyBrand/:material',
            withLogging(injectedMaterialController.getBrandsByMaterialName));

        this.adminRoute.get('/unitRate',
            withLogging(injectedMaterialController.getUnitRate));

        this.adminRoute.get('/getmaterial/:id',
            withLogging(injectedMaterialController.getMaterialById));

        // =====================================================================
        // 🟢 PROJECT ROUTES
        // =====================================================================
        this.adminRoute.get('/getprojectAddSitemanagerProject',
            withLogging(injectedProjectController.getProjectsForSiteManager));

        this.adminRoute.get('/getAllproject',
            withLogging(injectedProjectController.getAllProjects));

        this.adminRoute.get('/getproject',
            withLogging(injectedProjectController.getAllProjects));

        this.adminRoute.get('/project',
            withLogging(injectedProjectController.getPaginatedProjects));

        this.adminRoute.get('/addproject',
            withLogging(injectedProjectController.getAddProjectData));

        this.adminRoute.put('/project/:id',
            validateProjectEdit,
            withLogging(injectedProjectController.updateProject));

        this.adminRoute.delete('/project/:id',
            withLogging(injectedProjectController.deleteProject));

        this.adminRoute.put('/status/:id',
            withLogging(injectedProjectController.changeProjectStatus));

        this.adminRoute.get('/pendingProjects',
            withLogging(injectedProjectController.getPendingProjects));


        // =====================================================================
        // 🟢 LABOUR ROUTES
        // =====================================================================
        this.adminRoute.get('/labour',
            withLogging(injectedLabourController.getPaginatedLabourList));

        this.adminRoute.post('/labour',
            validateAddLabour,
            withLogging(injectedLabourController.createLabour));

        this.adminRoute.patch('/labour/:id',
            withLogging(injectedLabourController.deleteLabour));

        this.adminRoute.put('/labour/:id',
            validateAddLabour,
            withLogging(injectedLabourController.updateLabour));

        this.adminRoute.get('/fetchlabour',
            withLogging(injectedLabourController.getAllLabourList));

        this.adminRoute.get('/getLabour/:id',
            withLogging(injectedLabourController.getLabourById));

        // =====================================================================
        // 🟢 SITE MANAGER ROUTES
        // =====================================================================
        this.adminRoute.get('/sitemanager',
            withLogging(injectedSitemanagerController.getSitemanagers));

        this.adminRoute.post('/sitemanager',
            validateAddSitemanager,
            withLogging(injectedSitemanagerController.createSitemanager));

        this.adminRoute.put('/sitemanager/:id',
            validateAddSitemanager,
            withLogging(injectedSitemanagerController.updateSitemanager));

        this.adminRoute.delete('/sitemanager/:id',
            withLogging(injectedSitemanagerController.deleteSitemanager));

        // =====================================================================
        // 🟢 SPECIFICATION ROUTES
        // =====================================================================

        this.adminRoute.get('/getSpec',
            withLogging(injectSpecController.getSpecifications));

        this.adminRoute.get('/getMatsum',
            withLogging(injectSpecController.calculateMaterialSum));

        this.adminRoute.get('/getLabSum',
            withLogging(injectSpecController.calculateLabourSum));

        this.adminRoute.get('/spec',
            withLogging(injectSpecController.getSpecificationList));

        this.adminRoute.post('/spec',
            validateSpecification,
            withLogging(injectSpecController.createSpecification));

        this.adminRoute.put('/spec/:id',
            validateSpecification,
            withLogging(injectSpecController.updateSpecification));

        this.adminRoute.get('/fetchSum',
            withLogging(injectSpecController.getLabourMaterialSum));

        this.adminRoute.patch('/deleteSpec/:id',
            withLogging(injectSpecController.removeSpecification));



        // =====================================================================
        // 🟢 ESTIMATION ROUTES
        // =====================================================================
        this.adminRoute.post('/saveEstimation',
            validateSaveEstimation,
            withLogging(injectEstimationController.createEstimation));

        this.adminRoute.patch('/sendEstimation/:id',
            withLogging(injectEstimationController.sendEstimation));

        this.adminRoute.post('/updateEstimation',
            validateSaveEstimation,
            withLogging(injectEstimationController.modifyEstimation));

        this.adminRoute.get('/fetchEstimation',
            withLogging(injectEstimationController.getAllEstimations));

        this.adminRoute.patch('/uploadEstimateImage/:id',
            validateUploadEstimationImage,
            withLogging(injectEstimationController.uploadEstimationImage));


        this.adminRoute.get('/fetchExistEstimation/:id',
            withLogging(injectEstimationController.getSpecListByEstimation));

        this.adminRoute.get('/EstimationImage/:id',
            withLogging(injectEstimationController.getEstimationImage));


        // =====================================================================
        // 🟢 STAGE ROUTES
        // =====================================================================
        this.adminRoute.get('/fetchbudget/:id',
            withLogging(injectStageController.fetchProjectCost));

        this.adminRoute.post('/saveStage',
            validateStageAction,
            withLogging(injectStageController.saveStage));

        this.adminRoute.get('/fetchstage',
            withLogging(injectStageController.getAllStages));

        this.adminRoute.delete('/stageDelete/:id',
            withLogging(injectStageController.removeStage));

        this.adminRoute.put('/editStage/:id',
            validateStageAction,
            withLogging(injectStageController.updateStage));

        this.adminRoute.get('/stageFetch/:id',
            withLogging(injectStageController.getStageData));

        this.adminRoute.get('/stageForverify',
            withLogging(injectStageController.getStageForVerify));

        this.adminRoute.patch('/verifyPay/:id',
            withLogging(injectStageController.verifyPayment));

        // =====================================================================
        // 🟢 DASHBOARD ROUTES
        // =====================================================================
        this.adminRoute.get('/budgetActual',
            withLogging(injectAdminDashboardController.fetchBudgetVsActual));

        this.adminRoute.get('/budgetActualMaterial',
            withLogging(injectAdminDashboardController.fetchBudgetVsActualMaterial));

        this.adminRoute.get('/budgetActualLabour',
            withLogging(injectAdminDashboardController.fetchBudgetVsActualLabour));


        // =====================================================================
        // 🟢 ADD BANNER
        // =====================================================================

        this.adminRoute.post('/addBanner',
            validateBannerInput,
            withLogging(injectedBannerController.addBanner),
        );
        this.adminRoute.get('/banner',
            withLogging(injectedBannerController.getBanner),
        );
        this.adminRoute.put('/banner/:id',
            validateBannerInput,
            withLogging(injectedBannerController.editBanner),
        );
        this.adminRoute.delete('/banner/:id',
            withLogging(injectedBannerController.deleteBanner),
        );
    }
}
