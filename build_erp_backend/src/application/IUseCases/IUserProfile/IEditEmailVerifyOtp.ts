import { commonOutput } from "../../dto/common";
import { userLoginDTO } from "../../dto/user.dto";

export interface IEditEmailVerifyOtpUseCase {
   execute(otp: string):
      Promise<commonOutput<userLoginDTO> | commonOutput>
}