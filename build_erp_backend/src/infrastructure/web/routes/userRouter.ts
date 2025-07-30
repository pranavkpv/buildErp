import { Router } from "express";
import { JwtServiceImpl } from "../../../services/JwtService";
import { authMiddleware } from "../../../middlewares/authMiddleware";
import { IAuthControllerEntity } from "../../../Entities/ControllerEntities/UserControllerEntities/AuthControllerEntity";
import { IAuthProjectControllerEntity } from "../../../Entities/ControllerEntities/UserControllerEntities/AuthProjectControllerEntity";
import { withLogging } from "../../../middlewares/withLoggingMiddleware";
import { injectAuthController, InjectAuthprojectController } from "../../../DI/userInject";

export class userRoute {
   public userRoute: Router
   constructor() {
      this.userRoute = Router()
      this.setRoute()
   }
   private setRoute() {
      const jwtService = new JwtServiceImpl()

      this.userRoute.post("/googleLogin", withLogging(injectAuthController.GoogleLogin))
      this.userRoute.post('/signup', withLogging(injectAuthController.signUp))
      this.userRoute.post('/verifyOtp', withLogging(injectAuthController.verifyOTP))
      this.userRoute.post('/resendOtp', withLogging(injectAuthController.resendOtp))
      this.userRoute.post('/login', withLogging(injectAuthController.login)) 

      this.userRoute.post("/forgotOTP", withLogging(injectAuthController.SendOTP))
      this.userRoute.post("/verifyForgotOtp", withLogging(injectAuthController.verifyForgotOTP))
      this.userRoute.put("/updatepassword", withLogging(injectAuthController.updatePassword))
      this.userRoute.put("/changepassword/:id", authMiddleware(jwtService), withLogging(injectAuthController.ChangePassword))
      this.userRoute.post("/logout", authMiddleware(jwtService), withLogging(injectAuthController.logout))

      this.userRoute.get("/fetchuserproject/:user", authMiddleware(jwtService), withLogging(InjectAuthprojectController.fetchProject))
      this.userRoute.get("/fetchstatusbaseproject/:status", withLogging(InjectAuthprojectController.fetchProjectStatusBaseProject))
      this.userRoute.patch('/updateprofile/:id', authMiddleware(jwtService), withLogging(injectAuthController.UpdateProfile))
      this.userRoute.patch("/updateprofileImage/:id", authMiddleware(jwtService), withLogging(injectAuthController.updateProfileImage))

   }
}

