import { commonOutput } from '../../dto/common';
import { userSpecMaterial } from '../../entities/spec.entity';

export interface IGetMaterialAndBrandInSpecsUseCase {
   execute(specs:string[]):Promise<commonOutput<userSpecMaterial[]>>
}