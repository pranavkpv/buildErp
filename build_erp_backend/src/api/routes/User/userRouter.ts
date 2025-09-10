import { Router } from 'express';
import { JwtService } from '../../../application/services/JwtService';
import { userMiddleware } from '../../../infrastructure/middlewares/userMiddleware';
import { withLogging } from '../../../infrastructure/middlewares/withLoggingMiddleware';
import { validatechangePassword, validateUpdateprofile, validateUpdateProfileImage } from '../../../infrastructure/middlewares/validation/userprofile.validation';
import { injecteduserprofileController } from '../../DI/UserProfile';
import { injectSpecController } from '../../DI/Specification';
import { injectedRequirementController, injectEstimationController } from '../../DI/Estimation';

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
            withLogging(injectSpecController.getSpecnameandId)
        );
        this.userRoute.get(
            '/getmaterialbySpec',
            withLogging(injectSpecController.getMaterialandBrandById)
        );
        this.userRoute.post(
            '/addRequirement',
            withLogging(injectedRequirementController.saveRequirement)
        );
        this.userRoute.patch(
            '/addRequirement/:id',
            withLogging(injectedRequirementController.updateEstimateBy)
        );
        this.userRoute.get(
            '/getEstimation/:id',
            withLogging(injectEstimationController.getEstimationById)
        );
         this.userRoute.get(
            '/getMaterialEstimation/:id',
            withLogging(injectEstimationController.getMaterialEstimationById)
        );
         this.userRoute.get(
            '/getLabourEstimation/:id',
            withLogging(injectEstimationController.getLabourEstimationById)
        );
         this.userRoute.get(
            '/getAdditionEstimation/:id',
            withLogging(injectEstimationController.getAdditionEstimationById)
        );
          this.userRoute.patch(
            '/rejectEstimation/:id',
            withLogging(injectEstimationController.rejectEstimation)
        );
          this.userRoute.patch(
            '/approveEstimation/:id',
            withLogging(injectEstimationController.ApproveEstimation)
        );
    }
}
