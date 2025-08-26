import { commonOutput } from "../../dto/common";
import { userSignupinput } from "../../Entities/user.entity";


export interface ISignupUserUseCase{
   execute(input: userSignupinput): Promise<commonOutput>
}