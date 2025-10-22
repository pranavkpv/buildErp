import { Router } from 'express';
import { JwtService } from '../../../application/services/JwtService';
import { siteManagerMiddleware } from '../../../infrastructure/middlewares/siteMiddleware';
import { withLogging } from '../../../infrastructure/middlewares/withLoggingMiddleware';
import {
  validateSitemanagerChangePassword,
  validateSitemanagerLogin,
  validateStatusChange,
} from '../../../infrastructure/middlewares/validation/sitemanager.validation';
import { injectedSitemanagerController } from '../../DI/Sitemanager';
import { injectedMaterialController } from '../../DI/Material';
import { injectedLabourController } from '../../DI/Labour';
import { injecteduserprofileController } from '../../DI/UserProfile';
import { injectedStageStatusController } from '../../DI/StageStatus';
import { injectAttendanceController } from '../../DI/Attendance';
import { injectedPurchaseController } from '../../DI/Purchase';
import { injectedTransferController } from '../../DI/Transfer';
import { injectedReceiveController } from '../../DI/Receive';
import { injectedChatController } from '../../DI/Chat';
import { validateAttendance } from '../../../infrastructure/middlewares/validation/attendance.validation';
import { validatePurchase } from '../../../infrastructure/middlewares/validation/purchase.validation';
import { validateTransfer } from '../../../infrastructure/middlewares/validation/transfer.validation';
import { receiveValidation } from '../../../infrastructure/middlewares/validation/receive.validation';
import { injectedProjectController } from '../../DI/Project';
import { injectEstimationController } from '../../DI/Estimation';
import { SITEMANAGER_ROUTES } from '../../../Shared/Constants/Router.sitemanager.constant';


export class SitemanagerRoute {
  public sitemanagerRoute: Router;

  constructor() {
    this.sitemanagerRoute = Router();
    this.setRoute();
  }

  private setRoute() {
    const jwtService = new JwtService();

    // =======================================
    // 🔹 Public Routes
    // =======================================
    this.sitemanagerRoute.post(
      SITEMANAGER_ROUTES.LOGIN,
      validateSitemanagerLogin,
      withLogging(injectedSitemanagerController.loginSitemanager)
    );

    // =======================================
    // 🔹 Authentication Middleware
    // =======================================
    this.sitemanagerRoute.use(siteManagerMiddleware(jwtService));

    // =======================================
    // 🔹 Authentication
    // =======================================
    this.sitemanagerRoute.post(
      SITEMANAGER_ROUTES.LOGOUT,
      withLogging(injectedSitemanagerController.logoutSitemanager)
    );

    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.CHANGE_PASSWORD,
      validateSitemanagerChangePassword,
      withLogging(injectedSitemanagerController.changePassword)
    );

    // =======================================
    // 🔹 Project Routes
    // =======================================
    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.SITE_PROJECT,
      withLogging(injectedSitemanagerController.getSitemanagerProjects)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.PROJECT_WITH_COMPLETION,
      withLogging(injectedProjectController.getSitemanagersProjectsWithCompletion)
    );

    // =======================================
    // 🔹 Stage Status
    // =======================================
    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.STATUS_UPDATE,
      validateStatusChange,
      withLogging(injectedStageStatusController.updateStageStatus)
    );

    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.UPLOAD_STAGE_IMAGES,
      withLogging(injectedStageStatusController.uploadStageImages)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.SITE_STAGE,
      withLogging(injectedStageStatusController.getStageByProjectId)
    );

    // =======================================
    // 🔹 Attendance
    // =======================================
    this.sitemanagerRoute.post(
      SITEMANAGER_ROUTES.ATTENDANCE,
      validateAttendance,
      withLogging(injectAttendanceController.createAttendanceRecord)
    );

    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.EDIT_ATTENDANCE,
      validateAttendance,
      withLogging(injectAttendanceController.updateAttendanceRecord)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.ATTENDANCE,
      withLogging(injectAttendanceController.getAttendanceRecords)
    );

    this.sitemanagerRoute.delete(
      SITEMANAGER_ROUTES.ATTENDANCE_ID,
      withLogging(injectAttendanceController.deleteAttendanceRecord)
    );

    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.ATTENDANCE_ID,
      withLogging(injectAttendanceController.approveAttendanceRecord)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.EDIT_FETCH_ATTENDANCE,
      withLogging(injectAttendanceController.getAttendanceRecordById)
    );

    // =======================================
    // 🔹 Purchase
    // =======================================
    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.PURCHASE,
      withLogging(injectedPurchaseController.getPurchases)
    );

    this.sitemanagerRoute.post(
      SITEMANAGER_ROUTES.PURCHASE,
      validatePurchase,
      withLogging(injectedPurchaseController.savePurchase)
    );

    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.PURCHASE_ID,
      validatePurchase,
      withLogging(injectedPurchaseController.updatePurchase)
    );

    this.sitemanagerRoute.delete(
      SITEMANAGER_ROUTES.PURCHASE_ID,
      withLogging(injectedPurchaseController.deletePurchase)
    );

    this.sitemanagerRoute.patch(
      SITEMANAGER_ROUTES.PURCHASE_ID,
      withLogging(injectedPurchaseController.approvePurchase)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.LAST_INVOICE,
      withLogging(injectedPurchaseController.getLastInvoice)
    );

    // =======================================
    // 🔹 Transfer
    // =======================================
    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.TRANSFER,
      withLogging(injectedTransferController.fetchTransfers)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.TO_PROJECT,
      withLogging(injectedTransferController.fetchToProjects)
    );

    this.sitemanagerRoute.post(
      SITEMANAGER_ROUTES.TRANSFER,
      validateTransfer,
      withLogging(injectedTransferController.createTransfer)
    );

    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.TRANSFER_ID,
      validateTransfer,
      withLogging(injectedTransferController.updateTransfer)
    );

    this.sitemanagerRoute.delete(
      SITEMANAGER_ROUTES.TRANSFER_ID,
      withLogging(injectedTransferController.removeTransfer)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.RECEIVE_TRANSFER,
      withLogging(injectedTransferController.receiveTransfer)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.FETCH_STOCK_LIST,
      withLogging(injectedTransferController.fullStockList)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.LAST_TRANSFER,
      withLogging(injectedTransferController.getLastTransfer)
    );

    // =======================================
    // 🔹 Receive
    // =======================================
    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.RECEIVE,
      withLogging(injectedReceiveController.getReceive)
    );

    this.sitemanagerRoute.post(
      SITEMANAGER_ROUTES.RECEIVE,
      receiveValidation,
      withLogging(injectedReceiveController.saveReceive)
    );

    this.sitemanagerRoute.put(
      SITEMANAGER_ROUTES.RECEIVE_ID,
      receiveValidation,
      withLogging(injectedReceiveController.updateReceive)
    );

    this.sitemanagerRoute.delete(
      SITEMANAGER_ROUTES.RECEIVE_ID,
      withLogging(injectedReceiveController.deleteReceive)
    );

    this.sitemanagerRoute.patch(
      SITEMANAGER_ROUTES.RECEIVE_ID,
      withLogging(injectedReceiveController.approveReceive)
    );

    // =======================================
    // 🔹 Chat
    // =======================================
    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.CHAT_PROJECT,
      withLogging(injectedChatController.fetchUserDetailsforChat)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.CHATS_BY_ID,
      withLogging(injecteduserprofileController.fetchMessages)
    );

    // =======================================
    // 🔹 Material & Labour
    // =======================================
    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.FETCH_MATERIAL,
      withLogging(injectedMaterialController.getUniqueMaterialNames)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.FETCH_MAT_BY_BRAND,
      withLogging(injectedMaterialController.getBrandsByMaterialName)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.FETCH_MAT_BY_UNIT,
      withLogging(injectedMaterialController.getUnitsByMaterialName)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.UNIT_RATE,
      withLogging(injectedMaterialController.getUnitRate)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.FETCH_LABOUR,
      withLogging(injectedLabourController.getAllLabourList)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.STOCK,
      withLogging(injectedMaterialController.fetchStock)
    );

    // =======================================
    // 🔹 Dashboard / Estimation
    // =======================================
    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.GET_ESTIMATION,
      withLogging(injectEstimationController.getEstimationById)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.GET_MATERIAL_ESTIMATION,
      withLogging(injectEstimationController.getMaterialEstimationById)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.GET_LABOUR_ESTIMATION,
      withLogging(injectEstimationController.getLabourEstimationById)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.GET_ADDITION_ESTIMATION,
      withLogging(injectEstimationController.getAdditionEstimationById)
    );

    this.sitemanagerRoute.get(
      SITEMANAGER_ROUTES.EXPECT_IMAGE,
      withLogging(injectedProjectController.getExpectedImage)
    );
  }
}
