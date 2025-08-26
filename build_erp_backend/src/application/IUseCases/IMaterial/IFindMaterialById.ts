import { commonOutput } from "../../dto/common";
import { editMaterialFullDatafetch } from "../../Entities/material.entity";


export interface IFindMaterialByIdUsecase {
   execute(_id: string): Promise<commonOutput<editMaterialFullDatafetch | null>>
}