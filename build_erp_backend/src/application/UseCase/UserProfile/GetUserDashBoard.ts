import { IPaymentRepostory } from "../../../domain/Entities/IRepository/IPayment";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IStageRepository } from "../../../domain/Entities/IRepository/IStage";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { dashBoardDTO } from "../../dto/user.dto";
import { IGetUserDashBoardUseCase } from "../../IUseCases/IUserProfile/IGetUserDashBoard";

interface Project {
   id: string;
   name: string;
   completion: number;
   pendingPayment: number;
}

export class GetUserDashBoardUseCase implements IGetUserDashBoardUseCase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _paymentRepository: IPaymentRepostory,
      private _stageRepository: IStageRepository
   ) { }
   async execute(userId: string): Promise<commonOutput<dashBoardDTO> | commonOutput> {
      const projectListByUser = await this._projectRepository.getProjectsByUserId(userId)
      const walletByUser = await this._paymentRepository.getWalletDataBasedMethodAndUser("wallet", userId)
      let DebitByTransfer = walletByUser.filter((element) => element.purpose == "Transfer Payment")
      let creditByPayment = walletByUser.filter((element) => element.purpose == "stage payment")
      let totalWalletBalance = DebitByTransfer.reduce((sum, item) => sum += item.amount, 0) - creditByPayment.reduce((sum, item) => sum += item.amount, 0)
      const projectList = await this._projectRepository.getProjectsByUserId(userId)
      let projectData: Project[] = []
      for (let element of projectList) {
         let completion = 0
         let totalPay = 0
         const stageByProject = await this._stageRepository.getStageByProjectId(element._id)
         const payBasedProject = await this._paymentRepository.getPaymentByProject(element._id)
         completion += stageByProject.reduce((sum, element) => sum += element.progress, 0)
         totalPay += payBasedProject.reduce((sum, element) => sum += element.amount, 0)
         projectData.push(
            {
               id: element._id,
               name: element.project_name,
               completion: completion / stageByProject.length,
               pendingPayment: element.budgeted_cost - totalPay
            }

         )
      }
      const data: dashBoardDTO = {
         projectsCount: projectListByUser.length,
         walletBalance: totalWalletBalance,
         projects: projectData
      }

      return ResponseHelper.success(ProjectSuccessMessage.FETCH, data)
   }
}