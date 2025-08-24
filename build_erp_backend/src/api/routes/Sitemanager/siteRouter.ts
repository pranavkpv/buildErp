import { Router } from "express";
import { JwtService } from "../../../application/services/JwtService";
import { siteManagerMiddleware } from "../../../infrastructure/middlewares/siteMiddleware";
import { withLogging } from "../../../infrastructure/middlewares/withLoggingMiddleware";
import { injectAttendanceController, injectedChangepasswordcontroller, injectedChatController, injectedPurchaseController, injectedReceiveController, injectedStatusController, injectedTransferController } from "../../di/sitemanagerInject";
import { validateStatusChange } from "../../../infrastructure/middlewares/validation/sitemanager.validation";
import { injecteduserprofileController } from "../../di/userprofile.injection";
import { injectedLabourController, injectedSitemanagerController } from "../../di/adminInject";
import { injectedMaterialController } from "../../di/material.injection";

export class SitemanagerRoute {
   public sitemanagerRoute: Router;

   constructor() {
      this.sitemanagerRoute = Router();
      this.setRoute();
   }

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
         withLogging(injectedSitemanagerController.getSitemanagerProjects)
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

      this.sitemanagerRoute.put(
         "/status/:id",
         validateStatusChange,
         withLogging(injectedStatusController.updateStageStatus)
      );

      this.sitemanagerRoute.put(
         "/upload",
         withLogging(injectedStatusController.uploadStageImages)
      );

      // ================================
      // 🔹 Attendance
      // ================================
      this.sitemanagerRoute.post(
         "/attendance",
         withLogging(injectAttendanceController.createAttendance)
      );
      this.sitemanagerRoute.put(
         "/editAttendance",
         withLogging(injectAttendanceController.updateAttendance)
      );
      this.sitemanagerRoute.get(
         "/attendance",
         withLogging(injectAttendanceController.getAttendanceList)
      );
      this.sitemanagerRoute.delete(
         "/attendance/:id",
         withLogging(injectAttendanceController.removeAttendance)
      );
      this.sitemanagerRoute.put(
         "/attendance/:id",
         withLogging(injectAttendanceController.approveAttendance)
      );
      this.sitemanagerRoute.get(
         "/editfetchattendance/:id",
         withLogging(injectAttendanceController.getAttendanceById)
      );

      // ================================
      // 🔹 Purchase
      // ================================
      this.sitemanagerRoute.get(
         "/purchase",
         withLogging(injectedPurchaseController.getPurchases)
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
         withLogging(injectedReceiveController.getReceive)
      );
      this.sitemanagerRoute.post(
         "/receive",
         withLogging(injectedReceiveController.saveReceive)
      );
      this.sitemanagerRoute.put(
         "/receive/:id",
         withLogging(injectedReceiveController.updateReceive)
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
         withLogging(injectedMaterialController.getUniqueMaterialNames)
      );
      this.sitemanagerRoute.get(
         "/fetchMatbyBrand/:material",
         withLogging(injectedMaterialController.getBrandsByMaterialName)
      );
      this.sitemanagerRoute.get(
         "/fetMatbyUnit/:material",
         withLogging(injectedMaterialController.getUnitsByMaterialName)
      );
      this.sitemanagerRoute.get(
         "/unitRate",
         withLogging(injectedMaterialController.getUnitRate)
      );
      this.sitemanagerRoute.get(
         "/fetchlabour",
         withLogging(injectedLabourController.getAllLabourList)
      );
      this.sitemanagerRoute.get(
         "/chats/:id",
         withLogging(injecteduserprofileController.fetchMessages)
      );


   }
}
