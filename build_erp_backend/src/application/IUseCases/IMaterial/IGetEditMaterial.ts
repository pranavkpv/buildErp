import { commonOutput } from "../../dto/common";
import { EditmaterialDetailsDTO, EditprojectDetailsDTO } from "../../dto/material.dto";

export interface IGetEditMaterialUseCase {
   execute(_id:string): 
   Promise<commonOutput<{materialData:EditmaterialDetailsDTO,projectStockData:EditprojectDetailsDTO[]}> | commonOutput>
}