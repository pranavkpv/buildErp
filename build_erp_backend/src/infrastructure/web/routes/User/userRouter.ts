import { Router } from "express";
import { userMiddleware } from "../../../../middlewares/userMiddleware";
import { withLogging } from "../../../../middlewares/withLoggingMiddleware";
import { injectAuthController, InjectAuthprojectController } from "../../../../DI/userInject";
import { JwtService } from "../../../../services/JwtService";

/**
 * userRoute
 * ---------
 * Handles all public and authenticated user-related API endpoints.
 * Includes authentication, password management, profile updates,
 * project fetching, and chat functionality.
 */
export class userRoute {
   public userRoute: Router;

   constructor() {
      this.userRoute = Router();
      this.setRoute();
   }

   /**
    * Define all User API routes
    */
   private setRoute() {
      const jwtService = new JwtService();
   
      // ================================
      // 🔹 Middleware for authentication
      // ================================
      this.userRoute.use(userMiddleware(jwtService));
      // ================================
      // 🔹 Authenticated Account Routes
      // ================================
      this.userRoute.put(
         "/changepassword/:id",
         withLogging(injectAuthController.ChangePassword)
      );
      this.userRoute.post(
         "/logout",
         withLogging(injectAuthController.logout)
      );

      // ================================
      // 🔹 Projects
      // ================================
      this.userRoute.get(
         "/fetchuserproject/:user",
         withLogging(InjectAuthprojectController.fetchProject)
      );
      this.userRoute.get(
         "/fetchstatusbaseproject/:status",
         withLogging(InjectAuthprojectController.fetchProjectStatusBaseProject)
      );

      // ================================
      // 🔹 Profile
      // ================================
      this.userRoute.patch(
         "/updateprofile/:id",
         withLogging(injectAuthController.UpdateProfile)
      );
      this.userRoute.patch(
         "/updateprofileImage/:id",
         withLogging(injectAuthController.updateProfileImage)
      );

      // ================================
      // 🔹 Chat
      // ================================
      this.userRoute.get(
         "/fetchatList",
         withLogging(injectAuthController.fetChatList)
      );
      this.userRoute.get(
         "/chats/:id",
         withLogging(injectAuthController.fetchMessage)
      );
   }
}
