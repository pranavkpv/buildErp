import { commonOutput } from "../../dto/common";

export interface IUpdateBrandUseCase {
   execute(_id: string, brand_name: string):
      Promise<commonOutput>
}