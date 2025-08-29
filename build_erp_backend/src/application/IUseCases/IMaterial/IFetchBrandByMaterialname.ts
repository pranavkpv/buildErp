import { commonOutput } from '../../dto/common';


export interface IFetchBrandByMaterialNameUsecase {
   execute(materialName: string): Promise<commonOutput<string[]>>
}