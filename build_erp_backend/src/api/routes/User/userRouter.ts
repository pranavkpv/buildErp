import { Router } from "express";
import { JwtService } from "../../../application/services/JwtService";
import { userMiddleware } from "../../../infrastructure/middlewares/userMiddleware";
import { withLogging } from "../../../infrastructure/middlewares/withLoggingMiddleware";
import { validatechangePassword, validateUpdateprofile, validateUpdateProfileImage } from "../../../infrastructure/middlewares/validation/userprofile.validation";
import { injecteduserprofileController } from "../../DI/UserProfile";

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
         withLogging(injecteduserprofileController.updateProfile)
      );


      this.userRoute.patch(
         "/updateprofileImage",
         validateUpdateProfileImage,
         withLogging(injecteduserprofileController.updateProfileImage)
      );

      this.userRoute.put(
         "/changepassword",
         validatechangePassword,
         withLogging(injecteduserprofileController.changePassword)
      );

      this.userRoute.get(
         "/fetchuserproject",
         withLogging(injecteduserprofileController.fetchProjects)
      );

      this.userRoute.get(
         "/fetchatList",
         withLogging(injecteduserprofileController.fetchChatList)
      );

      this.userRoute.get(
         "/chats/:id",
         withLogging(injecteduserprofileController.fetchMessages)
      );

      this.userRoute.post(
         "/logout",
         withLogging(injecteduserprofileController.logout)
      ); 

   }
}
