import { IUserRepository } from "../../../domain/Entities/IRepository/IUser";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { sendEmail } from "../../../Shared/utils/sendEmail";
import { commonOutput } from "../../dto/common";
import { IEditEmailUseCase } from "../../IUseCases/IUserProfile/IEditEmail";

export class EditEmailUseCase implements IEditEmailUseCase {
   constructor(
      private _userRepository: IUserRepository
   ) { }
   async execute(email: string,id:string): Promise<commonOutput> {
      const existUser = await this._userRepository.getUserById(id);
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND);
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpCreatedAt = new Date();
      const text = `Dear ${ existUser.username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`;
      const emailSend = await sendEmail(email, 'OTP verification', text);
      if (emailSend) {
         console.log(otp);
         await this._userRepository.saveOTpAndTime(otp, otpCreatedAt, email,existUser._id)
         return ResponseHelper.success(userSuccessMessage.OTP_SEND);
      } else {
         return ResponseHelper.badRequest(userFailedMessage.OTP_SEND_FAIL);
      }    
   }
}