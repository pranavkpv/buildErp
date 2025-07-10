import { Router } from "express";
import { AuthController } from "../controllers/user/AuthController";
import { JwtServiceImpl } from "../../../services/JwtService";
import passport from "passport";
import { AuthProjectController } from "../controllers/user/AuthprojectController";

const createAuthRoute = (authcontroller: AuthController,authprojectController:AuthProjectController): Router => {
   const router = Router()
   const jwtService = new JwtServiceImpl()
   //initiate google auth route
   router.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
   );

   // handle google auth callback
   router.get(
      "/auth/google/callback",
      passport.authenticate("google", {
         successRedirect: `${ process.env.VITE_BASE_URL }`,
         failureRedirect: `${ process.env.VITE_BASE_URL }/login`,
      })
   );

   router.get("/auth/user", (req, res) => {
      if (req.isAuthenticated()) {
         res.json(req.user);
      } else {
         res.status(401).json({ message: "Not logged in" });
      }
   });

   router.post('/signup', authcontroller.signUp)
   router.post('/verifyOtp', authcontroller.verifyOTP)
   router.post('/resendOtp', authcontroller.resendOtp)
   router.post('/login', authcontroller.login)
   router.post("/forgotOTP",authcontroller.SendOTP)
   router.post("/verifyForgotOtp",authcontroller.verifyForgotOTP)
   router.put("/updatepassword",authcontroller.updatePassword)
   router.post("/logout",authcontroller.logout)

   //your project
   router.get("/fetchuserproject",authprojectController.fetchProject)




   return router
}

export default createAuthRoute;
