import { IUserRepository } from '../../../domain/Entities/IRepository/IUser';
import { ISendOTPUseCase } from '../../IUseCases/IAuth/ISendOtp';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { sendEmail } from '../../../Shared/utils/sendEmail';
import { userFailedMessage, userSuccessMessage } from '../../../Shared/Messages/User.Message';
import { commonOutput } from '../../dto/common';

export class SendOTPUseCase implements ISendOTPUseCase {
    constructor(
      private _userRepository: IUserRepository,
    ) { }
    async execute(input: { email: string }): Promise<commonOutput> {
        const { email } = input;
        const existAuth = await this._userRepository.getAuthUserByEmail(email);
        if (existAuth){
            return ResponseHelper.conflictData(userFailedMessage.NOT_NEED);
        }
        const existUser = await this._userRepository.getUserByEmail(email);
        if (!existUser) {
            return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND);
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpCreatedAt = new Date();
        const { username, phone, password } = existUser;
        await this._userRepository.saveTempUser({
            username,
            email,
            phone,
            password,
            otp,
            otpCreatedAt,
        });
        const text = `Dear ${ username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`;
        const emailSend = await sendEmail(email, 'OTP verification', text);
        if (emailSend) {
            console.log(otp);
            return ResponseHelper.success(userSuccessMessage.OTP_SEND);
        } else {
            return ResponseHelper.badRequest(userFailedMessage.OTP_SEND_FAIL);
        }
    }
}