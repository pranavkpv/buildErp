import { commonOutput } from "../../dto/common";
import { dashBoardDTO } from "../../dto/user.dto";

export interface IGetUserDashBoardUseCase {
   execute(userId: string): Promise<commonOutput<dashBoardDTO> | commonOutput>
}