import { commonOutput } from "../../dto/common";


export interface IDeleteCategoryUseCase {
   execute(_id: string):
      Promise<commonOutput>
}