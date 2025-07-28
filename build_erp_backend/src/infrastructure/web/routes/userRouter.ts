import { Router } from "express";
import { JwtServiceImpl } from "../../../services/JwtService";
import { authMiddleware } from "../../../middlewares/authMiddleware";
import { IAuthControllerEntity } from "../../../Entities/ControllerEntities/UserControllerEntities/AuthControllerEntity";
import { IAuthProjectControllerEntity } from "../../../Entities/ControllerEntities/UserControllerEntities/AuthProjectControllerEntity";
import { withLogging } from "../../../middlewares/withLoggingMiddleware";

const createAuthRoute = (authcontroller: IAuthControllerEntity, authprojectController: IAuthProjectControllerEntity): Router => {
   const router = Router()
   const jwtService = new JwtServiceImpl()
  

   router.post("/googleLogin",withLogging(authcontroller.GoogleLogin))
   router.post('/signup', withLogging(authcontroller.signUp))
   router.post('/verifyOtp', withLogging(authcontroller.verifyOTP))
   router.post('/resendOtp', withLogging(authcontroller.resendOtp))
   router.post('/login', withLogging(authcontroller.login))
   router.post("/forgotOTP", withLogging(authcontroller.SendOTP))
   router.post("/verifyForgotOtp", withLogging(authcontroller.verifyForgotOTP))
   router.put("/updatepassword", withLogging(authcontroller.updatePassword))
   router.put("/changepassword/:id",authMiddleware(jwtService),withLogging(authcontroller.ChangePassword))
   router.post("/logout", authMiddleware(jwtService), withLogging(authcontroller.logout))
   //your project
   router.get("/fetchuserproject/:user", authMiddleware(jwtService), withLogging(authprojectController.fetchProject))
   //status based project list
   router.get("/fetchstatusbaseproject/:status", withLogging(authprojectController.fetchProjectStatusBaseProject))
   router.patch('/updateprofile/:id', authMiddleware(jwtService), withLogging(authcontroller.UpdateProfile))
   router.patch("/updateprofileImage/:id",authMiddleware(jwtService),withLogging(authcontroller.updateProfileImage))
   return router
}

export default createAuthRoute;
