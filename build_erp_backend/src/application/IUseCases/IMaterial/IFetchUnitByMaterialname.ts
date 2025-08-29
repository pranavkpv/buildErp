import { commonOutput } from '../../dto/common';


export interface IFetchMaterialByMaterialNameUsecase{
   execute(materialName:string):Promise<commonOutput<string[]>> 
}