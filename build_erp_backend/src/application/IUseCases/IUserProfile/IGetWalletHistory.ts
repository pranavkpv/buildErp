import { commonOutput } from '../../dto/common';
import { walletDTO } from '../../dto/payment.dto';


export interface IGetWalletHistoryUseCase {
   execute(page: number, search: string, userId: string):
      Promise<commonOutput<{ data: walletDTO[], totalPage: number }> | commonOutput>
}