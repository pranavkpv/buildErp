import { IUserRepository } from '../../../domain/Entities/IRepository/IUser';
import { userFailedMessage, userSuccessMessage } from '../../../Shared/Messages/User.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { sendEmail } from '../../../Shared/utils/sendEmail';
import { commonOutput } from '../../dto/common';
import { IEditEmailResendOTPUseCase } from '../../IUseCases/IUserProfile/IEditEmailResendOTP';

export class EditEmailResendOTPUseCase implements IEditEmailResendOTPUseCase {
    constructor(
      private _userRepository: IUserRepository,
    ) { }
    async execute(): Promise<commonOutput> {
        const getRedisStoreData = await this._userRepository.getredisDataInUpdateEmail();
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtpCreatedAt = new Date();
        getRedisStoreData.otp = newOtp;
        getRedisStoreData.otpCreatedAt = newOtpCreatedAt;
        const existUser = await this._userRepository.getUserById(getRedisStoreData.id);
        if (!existUser) {
            return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND);
        }
        const text = `Dear ${ existUser.username }, your One-Time Password (OTP) for signing up with BuildERP is ${ newOtp }. Do not share this code with anyone.`;
        const emailSend = await sendEmail(existUser.email, 'OTP verification', text);
        if (emailSend) {
            console.log(newOtp);
            await this._userRepository.saveOTpAndTime(newOtp, newOtpCreatedAt,getRedisStoreData.email,getRedisStoreData.id);
            return ResponseHelper.success(userSuccessMessage.OTP_SEND);
        } else {
            return ResponseHelper.badRequest(userFailedMessage.OTP_SEND_FAIL);
        }
    }
}