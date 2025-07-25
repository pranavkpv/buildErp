export interface IFetchMaterialByMaterialName{
   execute(material_name:string):Promise<string[]>
}