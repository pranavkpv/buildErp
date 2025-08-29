import { commonOutput } from '../../dto/common';
import { editMaterialFullDatafetch } from '../../Entities/material.entity';


export interface IFindMaterialByIdUsecase {
   execute(id: string): Promise<commonOutput<editMaterialFullDatafetch | null>>
}