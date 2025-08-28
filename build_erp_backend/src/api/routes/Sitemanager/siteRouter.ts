import { Router } from "express";
import { JwtService } from "../../../application/services/JwtService";
import { siteManagerMiddleware } from "../../../infrastructure/middlewares/siteMiddleware";
import { withLogging } from "../../../infrastructure/middlewares/withLoggingMiddleware";
import { validateStatusChange } from "../../../infrastructure/middlewares/validation/sitemanager.validation";
import { injectedSitemanagerController } from "../../DI/Sitemanager";
import { injectedMaterialController } from "../../DI/Material";
import { injectedLabourController } from "../../DI/Labour";
import { injecteduserprofileController } from "../../DI/UserProfile";
import { injectedStageStatusController } from "../../DI/StageStatus";
import { injectAttendanceController } from "../../DI/Attendance";
import { injectedPurchaseController } from "../../DI/Purchase";
import { injectedTransferController } from "../../DI/Transfer";
import { injectedReceiveController } from "../../DI/Receive";
import { injectedChatController } from "../../DI/Chat";
import { injectedProjectController } from "../../DI/Project";


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
         "/siteproject",
         withLogging(injectedSitemanagerController.getSitemanagerProjects)
      );

      // ================================
      // 🔹 Change Password
      // ================================
      this.sitemanagerRoute.put(
         "/changepass",
         withLogging(injectedSitemanagerController.changePassword)
      );

      // ================================
      // 🔹 Stage Status
      // ================================

      this.sitemanagerRoute.put(
         "/status/:id",
         validateStatusChange,
         withLogging(injectedStageStatusController.updateStageStatus)
      );

      this.sitemanagerRoute.put(
         "/upload",
         withLogging(injectedStageStatusController.uploadStageImages)
      );

      this.sitemanagerRoute.get(
         "/siteStage/:id",
         withLogging(injectedStageStatusController.getStageByProjectId)
      )

      // ================================
      // 🔹 Attendance
      // ================================
      this.sitemanagerRoute.post(
         "/attendance",
         withLogging(injectAttendanceController.createAttendance)
      );
      this.sitemanagerRoute.put(
         "/editAttendance/:id",
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
         withLogging(injectedTransferController.fetchTransfers)
      );
      this.sitemanagerRoute.get(
         "/toProject/:id",
         withLogging(injectedTransferController.fetchToProjects)
      );
      this.sitemanagerRoute.post(
         "/transfer",
         withLogging(injectedTransferController.createTransfer)
      );
      this.sitemanagerRoute.put(
         "/transfer/:id",
         withLogging(injectedTransferController.updateTransfer)
      );
      this.sitemanagerRoute.delete(
         "/transfer/:id",
         withLogging(injectedTransferController.removeTransfer)
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
