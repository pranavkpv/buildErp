import { Router } from "express";
import { JwtServiceImpl } from "../../../services/JwtService";
import { siteManagerMiddleware } from "../../../middlewares/siteMiddleware";
import { ISitemanagerControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/ISitemanagerControllerEntity";
import { IchangePasswordControllerEntity } from "../../../Entities/ControllerEntities/SitemanagerControllerEntities/IChangePasswordControllerEntity";
import { IstatusControllerEntity } from "../../../Entities/ControllerEntities/SitemanagerControllerEntities/IStatusControllerEntity";
import { IAttendanceControllerEntity } from "../../../Entities/ControllerEntities/SitemanagerControllerEntities/IAttendanceControllerEntity";


const createSitemanagerRoute = (sitemanagerController: ISitemanagerControllerEntity,
   changepasswordcontroller: IchangePasswordControllerEntity, statusController: IstatusControllerEntity,
   attendanceController: IAttendanceControllerEntity): Router => {
   const router = Router()
    const jwtService = new JwtServiceImpl()
   router.post("/login",siteManagerMiddleware(jwtService), sitemanagerController.loginSitemanager)
   router.post("/logout",siteManagerMiddleware(jwtService), sitemanagerController.logoutSitemanager)
   router.get("/siteproject/:user",siteManagerMiddleware(jwtService),sitemanagerController.getSitemanagerProject)


   router.put("/changepass/:id",siteManagerMiddleware(jwtService), changepasswordcontroller.changedPassword)
   router.get("/stageFetch/:id",statusController.fetchStageData)
   router.put("/status/:id",siteManagerMiddleware(jwtService), statusController.changeStatus)
   router.put("/upload",siteManagerMiddleware(jwtService),statusController.uploadImage)
 

   router.post("/attendance",siteManagerMiddleware(jwtService), attendanceController.addAttendance)
   router.put("/editAttendance",siteManagerMiddleware(jwtService),attendanceController.editAttendance)
   router.get("/attendance",siteManagerMiddleware(jwtService),attendanceController.fetchAttendance)
   router.delete("/attendance/:id",siteManagerMiddleware(jwtService),attendanceController.deleteAttendance)
   router.put("/attendance/:id",siteManagerMiddleware(jwtService),attendanceController.approveAttendance)
   router.get("/editfetchattendance/:id",siteManagerMiddleware(jwtService),attendanceController.fetchEditcontroller)

   return router
}

export default createSitemanagerRoute;
