import { Router } from "express";
import { SitemanagerController } from "../controllers/admin/sitemanagerController";
import { changePasswordController } from "../controllers/sitemanager/changePasswordController";
import { statusController } from "../controllers/sitemanager/statusController";
import { AttendanceController } from "../controllers/sitemanager/AttendanceController";


const createSitemanagerRoute = (sitemanagerController: SitemanagerController,
   changepasswordcontroller: changePasswordController, statusController: statusController,
   attendanceController: AttendanceController): Router => {
   const router = Router()
   router.post("/login", sitemanagerController.loginSitemanager)
   router.post("/logout", sitemanagerController.logoutSitemanager)
   router.post("/changepass", changepasswordcontroller.changedPassword)
   router.get("/stageFetch", statusController.fetchStageData)
   router.put("/status", statusController.changeStatus)

   router.post("/attendance", attendanceController.addAttendance)
   router.put("/editAttendance",attendanceController.editAttendance)
   router.get("/attendance",attendanceController.fetchAttendance)
   router.delete("/attendance",attendanceController.deleteAttendance)
   router.put("/attendance",attendanceController.approveAttendance)
   router.get("/editfetchattendance",attendanceController.fetchEditcontroller)


   return router
}

export default createSitemanagerRoute;
