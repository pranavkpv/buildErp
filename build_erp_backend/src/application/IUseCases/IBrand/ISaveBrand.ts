import { commonOutput } from "../../dto/common";


export interface ISaveBrandUseCase {
   execute(brand_name: string):
      Promise<commonOutput>
}