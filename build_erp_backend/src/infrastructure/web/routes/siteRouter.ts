import { Router } from "express";
import { JwtServiceImpl } from "../../../services/JwtService";
import { siteManagerMiddleware } from "../../../middlewares/siteMiddleware";
import { withLogging } from "../../../middlewares/withLoggingMiddleware";
import { injectedSitemanagerController } from "../../../DI/adminInject";
import { injectAttendanceController, injectedChangepasswordcontroller, injectedPurchaseController, injectedStatusController, injectedTransferController } from "../../../DI/sitemanagerInject";


export class SitemanagerRoute {
   public sitemanagerRoute: Router
   constructor() {
      this.sitemanagerRoute = Router()
      this.setRoute()
   }
   private setRoute() {
      const jwtService = new JwtServiceImpl()

      this.sitemanagerRoute.post("/login", withLogging(injectedSitemanagerController.loginSitemanager))
      this.sitemanagerRoute.post("/logout", siteManagerMiddleware(jwtService), withLogging(injectedSitemanagerController.logoutSitemanager))
      this.sitemanagerRoute.get("/siteproject/:user", siteManagerMiddleware(jwtService), withLogging(injectedSitemanagerController.getSitemanagerProject))


      this.sitemanagerRoute.put("/changepass/:id", siteManagerMiddleware(jwtService), withLogging(injectedChangepasswordcontroller.changedPassword))

      this.sitemanagerRoute.get("/stageFetch/:id", withLogging(injectedStatusController.fetchStageData))
      this.sitemanagerRoute.put("/status/:id", siteManagerMiddleware(jwtService), withLogging(injectedStatusController.changeStatus))
      this.sitemanagerRoute.put("/upload", siteManagerMiddleware(jwtService), withLogging(injectedStatusController.uploadImage))


      this.sitemanagerRoute.post("/attendance", siteManagerMiddleware(jwtService), withLogging(injectAttendanceController.addAttendance))
      this.sitemanagerRoute.put("/editAttendance", siteManagerMiddleware(jwtService), withLogging(injectAttendanceController.editAttendance))
      this.sitemanagerRoute.get("/attendance", siteManagerMiddleware(jwtService), withLogging(injectAttendanceController.fetchAttendance))
      this.sitemanagerRoute.delete("/attendance/:id", siteManagerMiddleware(jwtService), withLogging(injectAttendanceController.deleteAttendance))
      this.sitemanagerRoute.put("/attendance/:id", siteManagerMiddleware(jwtService), withLogging(injectAttendanceController.approveAttendance))
      this.sitemanagerRoute.get("/editfetchattendance/:id", siteManagerMiddleware(jwtService), withLogging(injectAttendanceController.fetchEditcontroller))

      this.sitemanagerRoute.get("/purchase", siteManagerMiddleware(jwtService), withLogging(injectedPurchaseController.getpurchase))
      this.sitemanagerRoute.post("/purchase", siteManagerMiddleware(jwtService), withLogging(injectedPurchaseController.savePurchase))
      this.sitemanagerRoute.put("/purchase/:id", siteManagerMiddleware(jwtService), withLogging(injectedPurchaseController.updatePurchase))
      this.sitemanagerRoute.delete("/purchase/:id", siteManagerMiddleware(jwtService), withLogging(injectedPurchaseController.deletePurchase))
      this.sitemanagerRoute.patch("/purchase/:id", siteManagerMiddleware(jwtService), withLogging(injectedPurchaseController.approvePurchase))

      this.sitemanagerRoute.get("/transfer", siteManagerMiddleware(jwtService), withLogging(injectedTransferController.getTransfer))
      this.sitemanagerRoute.get("/toProject/:id", siteManagerMiddleware(jwtService), withLogging(injectedTransferController.getToProject))
      this.sitemanagerRoute.post("/transfer", siteManagerMiddleware(jwtService), withLogging(injectedTransferController.saveTransfer))
      this.sitemanagerRoute.put("/transfer/:id", siteManagerMiddleware(jwtService), withLogging(injectedTransferController.updateTransfer))
      this.sitemanagerRoute.delete("/transfer/:id", siteManagerMiddleware(jwtService), withLogging(injectedTransferController.deleteTransfer))
      this.sitemanagerRoute.patch("/transfer/:id", siteManagerMiddleware(jwtService), withLogging(injectedTransferController.approveTransfer))
   }
}

