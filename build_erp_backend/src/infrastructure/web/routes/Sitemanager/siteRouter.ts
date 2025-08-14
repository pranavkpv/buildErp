import { Router } from "express";
import { siteManagerMiddleware } from "../../../../middlewares/siteMiddleware";
import { withLogging } from "../../../../middlewares/withLoggingMiddleware";
import { injectedLabourController, injectedMaterialController, injectedSitemanagerController } from "../../../../DI/adminInject";
import {
   injectAttendanceController,
   injectedChangepasswordcontroller,
   injectedChatController,
   injectedPurchaseController,
   injectedReceiveController,
   injectedStatusController,
   injectedTransferController
} from "../../../../DI/sitemanagerInject";
import { JwtService } from "../../../../services/JwtService";
import { injectAuthController } from "../../../../DI/userInject";

/**
 * SitemanagerRoute
 * ----------------
 * Handles all API endpoints for Site Manager operations.
 * Includes authentication, attendance, purchase, transfer,
 * receive, status updates, and chat functionality.
 */
export class SitemanagerRoute {
   public sitemanagerRoute: Router;

   constructor() {
      this.sitemanagerRoute = Router();
      this.setRoute();
   }

   /**
    * Define all Site Manager API routes
    */
   private setRoute() {
      const jwtService = new JwtService();

      // ================================
      // 🔹 Public Routes (No token required)
      // ================================
      this.sitemanagerRoute.post(
         "/login",
         withLogging(injectedSitemanagerController.loginSitemanager)
      );

      // ================================
      // 🔹 Middleware for authentication
      // ================================
      this.sitemanagerRoute.use(siteManagerMiddleware(jwtService));

      // ================================
      // 🔹 Authentication Routes
      // ================================
      this.sitemanagerRoute.post(
         "/logout",
         withLogging(injectedSitemanagerController.logoutSitemanager)
      );

      // ================================
      // 🔹 Project Routes
      // ================================
      this.sitemanagerRoute.get(
         "/siteproject/:user",
         withLogging(injectedSitemanagerController.getSitemanagerProject)
      );

      // ================================
      // 🔹 Change Password
      // ================================
      this.sitemanagerRoute.put(
         "/changepass/:id",
         withLogging(injectedChangepasswordcontroller.changedPassword)
      );

      // ================================
      // 🔹 Stage Status
      // ================================
      this.sitemanagerRoute.get(
         "/stageFetch/:id",
         withLogging(injectedStatusController.fetchStageData)
      );
      this.sitemanagerRoute.put(
         "/status/:id",
         withLogging(injectedStatusController.changeStatus)
      );
      this.sitemanagerRoute.put(
         "/upload",
         withLogging(injectedStatusController.uploadImage)
      );

      // ================================
      // 🔹 Attendance
      // ================================
      this.sitemanagerRoute.post(
         "/attendance",
         withLogging(injectAttendanceController.addAttendance)
      );
      this.sitemanagerRoute.put(
         "/editAttendance",
         withLogging(injectAttendanceController.editAttendance)
      );
      this.sitemanagerRoute.get(
         "/attendance",
         withLogging(injectAttendanceController.fetchAttendance)
      );
      this.sitemanagerRoute.delete(
         "/attendance/:id",
         withLogging(injectAttendanceController.deleteAttendance)
      );
      this.sitemanagerRoute.put(
         "/attendance/:id",
         withLogging(injectAttendanceController.approveAttendance)
      );
      this.sitemanagerRoute.get(
         "/editfetchattendance/:id",
         withLogging(injectAttendanceController.fetchEditcontroller)
      );

      // ================================
      // 🔹 Purchase
      // ================================
      this.sitemanagerRoute.get(
         "/purchase",
         withLogging(injectedPurchaseController.getpurchase)
      );
      this.sitemanagerRoute.post(
         "/purchase",
         withLogging(injectedPurchaseController.savePurchase)
      );
      this.sitemanagerRoute.put(
         "/purchase/:id",
         withLogging(injectedPurchaseController.updatePurchase)
      );
      this.sitemanagerRoute.delete(
         "/purchase/:id",
         withLogging(injectedPurchaseController.deletePurchase)
      );
      this.sitemanagerRoute.patch(
         "/purchase/:id",
         withLogging(injectedPurchaseController.approvePurchase)
      );

      // ================================
      // 🔹 Transfer
      // ================================
      this.sitemanagerRoute.get(
         "/transfer",
         withLogging(injectedTransferController.getTransfer)
      );
      this.sitemanagerRoute.get(
         "/toProject/:id",
         withLogging(injectedTransferController.getToProject)
      );
      this.sitemanagerRoute.post(
         "/transfer",
         withLogging(injectedTransferController.saveTransfer)
      );
      this.sitemanagerRoute.put(
         "/transfer/:id",
         withLogging(injectedTransferController.updateTransfer)
      );
      this.sitemanagerRoute.delete(
         "/transfer/:id",
         withLogging(injectedTransferController.deleteTransfer)
      );
      this.sitemanagerRoute.patch(
         "/transfer/:id",
         withLogging(injectedTransferController.approveTransfer)
      );
      this.sitemanagerRoute.get(
         "/receiveTransfer/:id",
         withLogging(injectedTransferController.receiveTransfer)
      );

      // ================================
      // 🔹 Receive
      // ================================
      this.sitemanagerRoute.get(
         "/receive",
         withLogging(injectedReceiveController.getRecieve)
      );
      this.sitemanagerRoute.post(
         "/receive",
         withLogging(injectedReceiveController.saveRecieve)
      );
      this.sitemanagerRoute.put(
         "/receive/:id",
         withLogging(injectedReceiveController.updateRecieve)
      );
      this.sitemanagerRoute.delete(
         "/receive/:id",
         withLogging(injectedReceiveController.deleteReceive)
      );
      this.sitemanagerRoute.patch(
         "/receive/:id",
         withLogging(injectedReceiveController.approveReceive)
      );

      // ================================
      // 🔹 Chat
      // ================================
      this.sitemanagerRoute.get(
         "/chatProject",
         withLogging(injectedChatController.fetchUserDetailsforChat)
      );

      this.sitemanagerRoute.get(
         "/fetchMaterial",
         withLogging(injectedMaterialController.fetchUniqueMaterial)
      );
      this.sitemanagerRoute.get(
         "/fetchMatbyBrand/:material",
         withLogging(injectedMaterialController.fetchBrandbyName)
      );
      this.sitemanagerRoute.get(
         "/fetMatbyUnit/:material",
         withLogging(injectedMaterialController.fetchMaterialByUnit)
      );
      this.sitemanagerRoute.get(
         "/unitRate",
         withLogging(injectedMaterialController.fetchUnitrate)
      );
      this.sitemanagerRoute.get(
         "/fetchlabour",
         withLogging(injectedLabourController.fetchlabour)
      );
      this.sitemanagerRoute.get(
         "/chats/:id",
         withLogging(injectAuthController.fetchMessage)
      );


   }
}
