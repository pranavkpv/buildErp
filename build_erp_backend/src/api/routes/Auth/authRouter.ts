import { Router } from 'express';
import { withLogging } from '../../../infrastructure/middlewares/withLoggingMiddleware';
import {
  validateForgotOtpSend,
  validateResendotp,
  validateSignup,
  validateUserLogin,
  validateVerifyotp,
} from '../../../infrastructure/middlewares/validation/auth.validation';
import { injectAuthController } from '../../DI/Auth';
import { injectedBannerController } from '../../DI/Banner';
import { injectedProjectController } from '../../DI/Project';
import { injectedNotificationController } from '../../DI/Notification';
import { AUTH_ROUTES } from '../../../Shared/Constants/Router.auth.constant';


export class AuthRoute {
  public authRoute: Router;

  constructor() {
    this.authRoute = Router();
    this.setRoute();
  }

  private setRoute() {
    // =====================================================================
    // 🟢 AUTH ROUTES
    // =====================================================================
    this.authRoute.post(
      AUTH_ROUTES.SIGNUP,
      validateSignup,
      withLogging(injectAuthController.registerUser)
    );

    this.authRoute.post(
      AUTH_ROUTES.VERIFY_OTP,
      validateVerifyotp,
      withLogging(injectAuthController.verifySignupOtp)
    );

    this.authRoute.post(
      AUTH_ROUTES.RESEND_OTP,
      validateResendotp,
      withLogging(injectAuthController.resendSignupOtp)
    );

    this.authRoute.post(
      AUTH_ROUTES.LOGIN,
      validateUserLogin,
      withLogging(injectAuthController.loginUser)
    );

    this.authRoute.post(
      AUTH_ROUTES.GOOGLE_LOGIN,
      withLogging(injectAuthController.loginWithGoogle)
    );

    this.authRoute.post(
      AUTH_ROUTES.FORGOT_OTP,
      validateForgotOtpSend,
      withLogging(injectAuthController.sendOtp)
    );

    this.authRoute.post(
      AUTH_ROUTES.VERIFY_FORGOT_OTP,
      validateVerifyotp,
      withLogging(injectAuthController.verifyForgotPasswordOtp)
    );

    this.authRoute.put(
      AUTH_ROUTES.UPDATE_PASSWORD,
      validateUserLogin,
      withLogging(injectAuthController.updateUserPassword)
    );

    // =====================================================================
    // 🟢 PROJECT ROUTES
    // =====================================================================
    this.authRoute.get(
      AUTH_ROUTES.PROJECT_LIST_USER,
      withLogging(injectAuthController.fetchUserProjects)
    );

    this.authRoute.get(
      AUTH_ROUTES.FETCH_EXIST_ESTIMATION,
      withLogging(injectAuthController.fetchExistEstimation)
    );

    this.authRoute.get(
      AUTH_ROUTES.STAGE_FETCH,
      withLogging(injectAuthController.fetchStageData)
    );

    this.authRoute.get(
      AUTH_ROUTES.FETCH_STATUS_BASE_PROJECT,
      withLogging(injectAuthController.fetchProjectStatusByFilters)
    );

    // =====================================================================
    // 🟢 TOKEN & BANNER
    // =====================================================================
    this.authRoute.post(
      AUTH_ROUTES.REFRESH_TOKEN,
      withLogging(injectAuthController.handleRefreshToken)
    );

    this.authRoute.get(
      AUTH_ROUTES.BANNER,
      withLogging(injectedBannerController.fetchAllBanner)
    );

    // =====================================================================
    // 🟢 DASHBOARD & NOTIFICATION
    // =====================================================================
    this.authRoute.get(
      AUTH_ROUTES.PROJECT_STATUS_COUNT,
      withLogging(
        injectedProjectController.fetchAllProjectwithStatusAndcount
      )
    );

    this.authRoute.get(
      AUTH_ROUTES.NOTIFICATION,
      withLogging(injectedNotificationController.fetchUserBaseNotification)
    );

    this.authRoute.patch(
      AUTH_ROUTES.NOTIFICATION_UPDATE,
      withLogging(injectedNotificationController.markReadInNotification)
    );
  }
}
