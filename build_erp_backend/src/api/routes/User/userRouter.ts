import { Router } from 'express';
import { JwtService } from '../../../application/services/JwtService';
import { userMiddleware } from '../../../infrastructure/middlewares/userMiddleware';
import { withLogging } from '../../../infrastructure/middlewares/withLoggingMiddleware';
import { validatechangePassword, validateUpdateprofile, validateUpdateProfileImage } from '../../../infrastructure/middlewares/validation/userprofile.validation';
import { injecteduserprofileController } from '../../DI/UserProfile';
import { injectSpecController } from '../../DI/Specification';
import { injectedRequirementController, injectEstimationController } from '../../DI/Estimation';
import { validateProjectAdd } from '../../../infrastructure/middlewares/validation/project.validation';
import { injectedProjectController } from '../../DI/Project';
import { validateUploadEstimationImage } from '../../../infrastructure/middlewares/validation/estimation.validaion';
import express from 'express';
import { injectStageController } from '../../DI/Stage';
import { injectedTransferController } from '../../DI/Transfer';

export class userRoute {
    public userRoute: Router;

    constructor() {
        this.userRoute = Router();
        this.setRoute();
    }

    private setRoute() {
        const jwtService = new JwtService();
        this.userRoute.post(
            '/payment/webhook', express.raw({ type: 'application/json' }),
            withLogging(injectStageController.handleWebhook)
        );

        this.userRoute.use(userMiddleware(jwtService));
        this.userRoute.patch(
            '/updateprofile',
            validateUpdateprofile,
            withLogging(injecteduserprofileController.updateProfile),
        );


        this.userRoute.patch(
            '/updateprofileImage',
            validateUpdateProfileImage,
            withLogging(injecteduserprofileController.updateProfileImage),
        );

        this.userRoute.put(
            '/changepassword',
            validatechangePassword,
            withLogging(injecteduserprofileController.changePassword),
        );

        this.userRoute.get(
            '/fetchuserproject',
            withLogging(injecteduserprofileController.fetchProjects),
        );

        this.userRoute.get(
            '/fetchatList',
            withLogging(injecteduserprofileController.fetchChatList),
        );

        this.userRoute.get(
            '/chats/:id',
            withLogging(injecteduserprofileController.fetchMessages),
        );

        this.userRoute.post(
            '/logout',
            withLogging(injecteduserprofileController.logout),
        );

        this.userRoute.post(
            '/editEmail',
            withLogging(injecteduserprofileController.editEmail),
        );

        this.userRoute.post(
            '/editEmailresend',
            withLogging(injecteduserprofileController.editEmailResendOtp),
        );

        this.userRoute.post(
            '/editEmailVerify',
            withLogging(injecteduserprofileController.editEmailVerifyOTP),
        );
        this.userRoute.get(
            '/getSpec',
            withLogging(injectSpecController.getSpecnameandId),
        );
        this.userRoute.get(
            '/getmaterialbySpec',
            withLogging(injectSpecController.getMaterialandBrandById),
        );
        this.userRoute.post(
            '/addRequirement',
            withLogging(injectedRequirementController.saveRequirement),
        );
        this.userRoute.patch(
            '/addRequirement/:id',
            withLogging(injectedRequirementController.updateEstimateBy),
        );
        this.userRoute.get(
            '/getEstimation/:id',
            withLogging(injectEstimationController.getEstimationById),
        );
        this.userRoute.patch('/uploadEstimateImage/:id',
            validateUploadEstimationImage,
            withLogging(injectEstimationController.uploadEstimationImage));
        this.userRoute.get(
            '/getMaterialEstimation/:id',
            withLogging(injectEstimationController.getMaterialEstimationById),
        );
        this.userRoute.get(
            '/getLabourEstimation/:id',
            withLogging(injectEstimationController.getLabourEstimationById),
        );
        this.userRoute.get(
            '/getAdditionEstimation/:id',
            withLogging(injectEstimationController.getAdditionEstimationById),
        );
        this.userRoute.patch(
            '/rejectEstimation/:id',
            withLogging(injectEstimationController.rejectEstimation),
        );
        this.userRoute.patch(
            '/approveEstimation/:id',
            withLogging(injectEstimationController.ApproveEstimation),
        );
        this.userRoute.post(
            '/project',
            validateProjectAdd,
            withLogging(injectedProjectController.createProject)
        );
        this.userRoute.get(
            '/expectImage/:id',
            withLogging(injectedProjectController.getExpectedImage)
        );
        this.userRoute.post(
            '/create-payment-intent',
            withLogging(injectStageController.paymentIntendCreation)
        );
        this.userRoute.get(
            '/transfer',
            withLogging(injectedTransferController.getUserBaseTransfer)
        );
        this.userRoute.patch(
            '/rejectTransfer/:id',
            withLogging(injectedTransferController.rejectTransferById)
        );
        this.userRoute.patch(
            '/transfer/:id',
            withLogging(injectedTransferController.approveTransfer),
        );
    }
}
