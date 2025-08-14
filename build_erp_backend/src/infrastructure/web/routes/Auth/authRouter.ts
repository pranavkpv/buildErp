import { Router } from "express";
import { injectedRefreshTokenController } from "../../../../DI/authInject";
import { withLogging } from "../../../../middlewares/withLoggingMiddleware";
import { injectAuthController } from "../../../../DI/userInject";
import { injectedMaterialController } from "../../../../DI/adminInject";

export class authRoute {
    public authRoute: Router
    constructor() {
        this.authRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.authRoute.post('/refreshToken', withLogging(injectedRefreshTokenController.handleRefreshToken))
        this.authRoute.post(
            "/signup",
            withLogging(injectAuthController.signUp)
        );
        this.authRoute.post(
            "/googleLogin",
            withLogging(injectAuthController.GoogleLogin)
        );
        this.authRoute.post(
            "/verifyOtp",
            withLogging(injectAuthController.verifyOTP)
        );
        this.authRoute.post(
            "/resendOtp",
            withLogging(injectAuthController.resendOtp)
        );
        this.authRoute.post(
            "/login",
            withLogging(injectAuthController.login)
        );
        this.authRoute.post(
            "/forgotOTP",
            withLogging(injectAuthController.SendOTP)
        );
        this.authRoute.post(
            "/verifyForgotOtp",
            withLogging(injectAuthController.verifyForgotOTP)
        );
        this.authRoute.put(
            "/updatepassword",
            withLogging(injectAuthController.updatePassword)
        );
        this.authRoute.get(
            "/projectListUser",
            withLogging(injectAuthController.fetchAllProjectListInUser)
        );
     

    }
}