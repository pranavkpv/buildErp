import { commonOutput } from '../../dto/common';
import { editMaterialFullDatafetch } from '../../entities/material.entity';


export interface IFindMaterialByIdUsecase {
   execute(id: string): Promise<commonOutput<editMaterialFullDatafetch | null>>
}