import { Router } from "express";
import { JwtService } from "../../../application/services/JwtService";
import { userMiddleware } from "../../../infrastructure/middlewares/userMiddleware";
import { withLogging } from "../../../infrastructure/middlewares/withLoggingMiddleware";
import { injecteduserprofileController } from "../../di/userprofile.injection";
import { validatechangePassword, validateUpdateprofile, validateUpdateProfileImage } from "../../../infrastructure/middlewares/validation/userprofile.validation";

export class userRoute {
   public userRoute: Router;

   constructor() {
      this.userRoute = Router();
      this.setRoute();
   }

   private setRoute() {
      const jwtService = new JwtService();
      this.userRoute.use(userMiddleware(jwtService));

      this.userRoute.patch(
         "/updateprofile",
         validateUpdateprofile,
         withLogging(injecteduserprofileController.UpdateProfile)
      );


      this.userRoute.patch(
         "/updateprofileImage",
         validateUpdateProfileImage,
         withLogging(injecteduserprofileController.updateProfileImage)
      );

      this.userRoute.put(
         "/changepassword",
         validatechangePassword,
         withLogging(injecteduserprofileController.ChangePassword)
      );

      this.userRoute.get(
         "/fetchuserproject",
         withLogging(injecteduserprofileController.fetchProject)
      );

      this.userRoute.get(
         "/fetchatList",
         withLogging(injecteduserprofileController.fetChatList)
      );

      this.userRoute.get(
         "/chats/:id",
         withLogging(injecteduserprofileController.fetchMessage)
      );

      this.userRoute.post(
         "/logout",
         withLogging(injecteduserprofileController.logout)
      );

      this.authRoute.post('/refreshToken', withLogging(injectedRefreshTokenController.handleRefreshToken)) 

   }
}
