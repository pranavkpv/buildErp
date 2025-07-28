import { Router } from "express";
import { JwtServiceImpl } from "../../../services/JwtService";
import { siteManagerMiddleware } from "../../../middlewares/siteMiddleware";
import { ISitemanagerControllerEntity } from "../../../Entities/ControllerEntities/AdminControllerEntities/ISitemanagerControllerEntity";
import { IchangePasswordControllerEntity } from "../../../Entities/ControllerEntities/SitemanagerControllerEntities/IChangePasswordControllerEntity";
import { IstatusControllerEntity } from "../../../Entities/ControllerEntities/SitemanagerControllerEntities/IStatusControllerEntity";
import { IAttendanceControllerEntity } from "../../../Entities/ControllerEntities/SitemanagerControllerEntities/IAttendanceControllerEntity";
import { withLogging } from "../../../middlewares/withLoggingMiddleware";


const createSitemanagerRoute = (sitemanagerController: ISitemanagerControllerEntity,
   changepasswordcontroller: IchangePasswordControllerEntity, statusController: IstatusControllerEntity,
   attendanceController: IAttendanceControllerEntity): Router => {
   const router = Router()
    const jwtService = new JwtServiceImpl()
   router.post("/login", withLogging(sitemanagerController.loginSitemanager))
   router.post("/logout",siteManagerMiddleware(jwtService), withLogging(sitemanagerController.logoutSitemanager))
   router.get("/siteproject/:user",siteManagerMiddleware(jwtService),withLogging(sitemanagerController.getSitemanagerProject))


   router.put("/changepass/:id",siteManagerMiddleware(jwtService), withLogging(changepasswordcontroller.changedPassword))
   router.get("/stageFetch/:id",withLogging(statusController.fetchStageData))
   router.put("/status/:id",siteManagerMiddleware(jwtService), withLogging(statusController.changeStatus))
   router.put("/upload",siteManagerMiddleware(jwtService),withLogging(statusController.uploadImage))
 

   router.post("/attendance",siteManagerMiddleware(jwtService), withLogging(attendanceController.addAttendance))
   router.put("/editAttendance",siteManagerMiddleware(jwtService),withLogging(attendanceController.editAttendance))
   router.get("/attendance",siteManagerMiddleware(jwtService),withLogging(attendanceController.fetchAttendance))
   router.delete("/attendance/:id",siteManagerMiddleware(jwtService),withLogging(attendanceController.deleteAttendance))
   router.put("/attendance/:id",siteManagerMiddleware(jwtService),withLogging(attendanceController.approveAttendance))
   router.get("/editfetchattendance/:id",siteManagerMiddleware(jwtService),withLogging(attendanceController.fetchEditcontroller))

   return router
}

export default createSitemanagerRoute;
