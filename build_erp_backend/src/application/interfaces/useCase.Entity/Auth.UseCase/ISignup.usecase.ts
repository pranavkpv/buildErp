import { commonOutput } from "../../../dto/common";
import { userSignupinput } from "../../../entities/user.entity";


export interface ISignupUserUseCase{
   execute(input: userSignupinput): Promise<commonOutput>
}