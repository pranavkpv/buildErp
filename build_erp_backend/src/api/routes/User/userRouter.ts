// src/interface/routes/user.routes.ts

import express, { Router } from 'express';
import { JwtService } from '../../../application/services/JwtService';
import { userMiddleware } from '../../../infrastructure/middlewares/userMiddleware';
import { withLogging } from '../../../infrastructure/middlewares/withLoggingMiddleware';
import {
  validatechangePassword,
  validateUpdateprofile,
  validateUpdateProfileImage,
} from '../../../infrastructure/middlewares/validation/userprofile.validation';
import { validateProjectAdd } from '../../../infrastructure/middlewares/validation/project.validation';
import { validateUploadEstimationImage } from '../../../infrastructure/middlewares/validation/estimation.validaion';

import { injecteduserprofileController } from '../../DI/UserProfile';
import { injectSpecController } from '../../DI/Specification';
import { injectedRequirementController, injectEstimationController } from '../../DI/Estimation';
import { injectedProjectController } from '../../DI/Project';
import { injectStageController } from '../../DI/Stage';
import { injectedTransferController } from '../../DI/Transfer';
import { USER_ROUTES } from '../../../Shared/Constants/Router.user.constant';



export class UserRoute {
  public userRoute: Router;

  constructor() {
    this.userRoute = Router();
    this.setRoutes();
  }

  private setRoutes() {
    const jwtService = new JwtService();

    // =============================
    // 🔹 Webhook Route (Public)
    // =============================
    this.userRoute.post(
      USER_ROUTES.PAYMENT_WEBHOOK,
      express.raw({ type: 'application/json' }),
      withLogging(injectStageController.handleWebhook),
    );

    // =============================
    // 🔹 Authenticated Routes
    // =============================
    this.userRoute.use(userMiddleware(jwtService));

    // =============================
    // 🔹 Profile Management
    // =============================
    this.userRoute.patch(USER_ROUTES.UPDATE_PROFILE, validateUpdateprofile, withLogging(injecteduserprofileController.updateProfile));
    this.userRoute.patch(USER_ROUTES.UPDATE_PROFILE_IMAGE, validateUpdateProfileImage, withLogging(injecteduserprofileController.updateProfileImage));
    this.userRoute.put(USER_ROUTES.CHANGE_PASSWORD, validatechangePassword, withLogging(injecteduserprofileController.changePassword));

    // =============================
    // 🔹 Project & Chat
    // =============================
    this.userRoute.get(USER_ROUTES.FETCH_USER_PROJECT, withLogging(injecteduserprofileController.fetchProjects));
    this.userRoute.get(USER_ROUTES.FETCH_CHAT_LIST, withLogging(injecteduserprofileController.fetchChatList));
    this.userRoute.get(USER_ROUTES.FETCH_CHAT_MESSAGES, withLogging(injecteduserprofileController.fetchMessages));

    // =============================
    // 🔹 Authentication
    // =============================
    this.userRoute.post(USER_ROUTES.LOGOUT, withLogging(injecteduserprofileController.logout));
    this.userRoute.post(USER_ROUTES.EDIT_EMAIL, withLogging(injecteduserprofileController.editEmail));
    this.userRoute.post(USER_ROUTES.EDIT_EMAIL_RESEND, withLogging(injecteduserprofileController.editEmailResendOtp));
    this.userRoute.post(USER_ROUTES.EDIT_EMAIL_VERIFY, withLogging(injecteduserprofileController.editEmailVerifyOTP));

    // =============================
    // 🔹 Specification
    // =============================
    this.userRoute.get(USER_ROUTES.GET_SPEC, withLogging(injectSpecController.getSpecnameandId));
    this.userRoute.get(USER_ROUTES.GET_MATERIAL_BY_SPEC, withLogging(injectSpecController.getMaterialandBrandById));

    // =============================
    // 🔹 Estimation
    // =============================
    this.userRoute.post(USER_ROUTES.ADD_REQUIREMENT, withLogging(injectedRequirementController.saveRequirement));
    this.userRoute.patch(USER_ROUTES.UPDATE_REQUIREMENT, withLogging(injectedRequirementController.updateEstimateBy));
    this.userRoute.get(USER_ROUTES.GET_ESTIMATION, withLogging(injectEstimationController.getEstimationById));
    this.userRoute.patch(USER_ROUTES.UPLOAD_ESTIMATE_IMAGE, validateUploadEstimationImage, withLogging(injectEstimationController.uploadEstimationImage));
    this.userRoute.get(USER_ROUTES.GET_MATERIAL_ESTIMATION, withLogging(injectEstimationController.getMaterialEstimationById));
    this.userRoute.get(USER_ROUTES.GET_LABOUR_ESTIMATION, withLogging(injectEstimationController.getLabourEstimationById));
    this.userRoute.get(USER_ROUTES.GET_ADDITION_ESTIMATION, withLogging(injectEstimationController.getAdditionEstimationById));
    this.userRoute.patch(USER_ROUTES.REJECT_ESTIMATION, withLogging(injectEstimationController.rejectEstimation));
    this.userRoute.patch(USER_ROUTES.APPROVE_ESTIMATION, withLogging(injectEstimationController.ApproveEstimation));

    // =============================
    // 🔹 Project Creation
    // =============================
    this.userRoute.post(USER_ROUTES.CREATE_PROJECT, validateProjectAdd, withLogging(injectedProjectController.createProject));
    this.userRoute.get(USER_ROUTES.EXPECT_IMAGE, withLogging(injectedProjectController.getExpectedImage));

    // =============================
    // 🔹 Payments
    // =============================
    this.userRoute.post(USER_ROUTES.CREATE_PAYMENT_INTENT, withLogging(injectStageController.paymentIntendCreation));
    this.userRoute.post(USER_ROUTES.WALLET_PAYMENT, withLogging(injectStageController.createWalletPayment));

    // =============================
    // 🔹 Transfer
    // =============================
    this.userRoute.get(USER_ROUTES.TRANSFER, withLogging(injectedTransferController.getUserBaseTransfer));
    this.userRoute.patch(USER_ROUTES.REJECT_TRANSFER, withLogging(injectedTransferController.rejectTransferById));
    this.userRoute.patch(USER_ROUTES.APPROVE_TRANSFER, withLogging(injectedTransferController.approveTransfer));

    // =============================
    // 🔹 Wallet & Dashboard
    // =============================
    this.userRoute.get(USER_ROUTES.WALLET_HISTORY, withLogging(injectStageController.getwalletHistory));
    this.userRoute.get(USER_ROUTES.DASHBOARD, withLogging(injecteduserprofileController.getDashboard));
  }
}
