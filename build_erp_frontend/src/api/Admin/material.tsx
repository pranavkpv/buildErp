import axioInstance from "../../api/axio";


//get add material data here datas are categorydata,brandData,unitData,projectData
export const getaddMaterial = async () => {
   const response = await axioInstance.get(`/admin/addmaterial`);
   return response.data
}

//delete material data
type deleteData = {
   _id: string
}
export const deleteMaterial = async (data: deleteData) => {
   const response = await axioInstance.delete(`/admin/material`, {data})
   return response.data
}

//list the material data
export const materialList = async(page:number,search:string) =>{
   const response = await axioInstance.get(`/admin/material`,{ params: { page, search } }); 
   return response.data
}


//edit data fetch using api

export const editMaterialData = async(_id:string)=>{
   const response = await axioInstance.get(`/admin/editmaterial`,{params:{_id}})
   return response.data
}


//the unique material is fetch
export const fetchUniqueMaterial = async()=>{
   const response = await axioInstance.get(`/admin/fetchMaterial`)
   return response.data
}


//the list of unit if select material

export const fetchUnitCorrespondingMaterial = async(material:string)=>{

   const response = await axioInstance.get('/admin/fetMatbyUnit',{params:{material_name:material}})
   return response.data
}

export const fetchBrandCorrespondingMaterial = async(material:string)=>{
   const response = await axioInstance.get('/admin/fetchMatbyBrand',{params:{material_name:material}})
   return response.data
}

export const fetchUnitRate = async(selectedMaterail:string,selectedUnit:string,selectedBrand:string)=>{
   const response = await axioInstance.get('/admin/unitRate',{params:{material_name:selectedMaterail,unit_name:selectedUnit,brand_name:selectedBrand}})
   return response.data
}