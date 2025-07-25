export interface IFetchBrandByMaterialName {
   execute(material_name: string): Promise<string[]>
}