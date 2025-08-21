import { Router } from "express";
import { withLogging } from "../../../infrastructure/middlewares/withLoggingMiddleware";
import { validateforgotOtpSend, validateResendotp, validateSignup, validateuserLogin, validateVerifyotp } from "../../../infrastructure/middlewares/validation/auth.validation";
import { injectAuthController } from "../../di/auth.injection";


export class authRoute {
    public authRoute: Router
    constructor() {
        this.authRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        //signup
        this.authRoute.post(
            "/signup",
            validateSignup,
            withLogging(injectAuthController.register)
        );
        //verify otp
        this.authRoute.post(
            "/verifyOtp",
            validateVerifyotp,
            withLogging(injectAuthController.verifySignupOtp)
        );
        //resendOtp
        this.authRoute.post(
            "/resendOtp",
            validateResendotp,
            withLogging(injectAuthController.resendSignupOtp)
        );
        //login
        this.authRoute.post(
            "/login",
            validateuserLogin,
            withLogging(injectAuthController.login)
        );
        //google login
        this.authRoute.post(
            "/googleLogin",
            withLogging(injectAuthController.loginWithGoogle)
        );
        //forgot otp send
        this.authRoute.post(
            "/forgotOTP",
            validateforgotOtpSend,
            withLogging(injectAuthController.sendOtp)
        );
        //verify the forgot password otp
        this.authRoute.post(
            "/verifyForgotOtp",
            validateVerifyotp,
            withLogging(injectAuthController.verifyForgotPasswordOtp)
        );
        //updatepassword
        this.authRoute.put(
            "/updatepassword",
            validateuserLogin,
            withLogging(injectAuthController.updatePassword)
        );
        //all project fetch
        this.authRoute.get(
            "/projectListUser",
            withLogging(injectAuthController.fetchUserProjects)
        );
        //fetch specification of corresponding project
        this.authRoute.get(
            "/fetchExistEstimation/:id",
            withLogging(injectAuthController.fetchExistEstimation)
        );
        //fetch stage data of corresponding project
        this.authRoute.get(
            "/stageFetch/:id",
            withLogging(injectAuthController.fetchStageData)
        );
        //fetch status base project data
        this.authRoute.get(
            "/fetchstatusbaseproject/:status",
            withLogging(injectAuthController.fetchProjectStatusBaseProject)
        );

        this.authRoute.post('/refreshToken', 
            withLogging(injectAuthController.handleRefreshToken))

    }
}