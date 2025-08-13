import { Router } from "express";
import { injectedRefreshTokenController } from "../../../../DI/authInject";
import { withLogging } from "../../../../middlewares/withLoggingMiddleware";
import { injectAuthController } from "../../../../DI/userInject";

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
    }
}