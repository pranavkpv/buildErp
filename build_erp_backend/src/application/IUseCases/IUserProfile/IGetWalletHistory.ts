import { commonOutput } from "../../dto/common";
import { walletDTO } from "../../dto/payment.dto";
import { listingInput } from "../../Entities/common.entity";

export interface IGetWalletHistoryUseCase {
   execute(input:listingInput):Promise<commonOutput<{data:walletDTO[],totalPage:number}> | commonOutput>
}