import axioInstance from "../../api/axio"


type materialData = {
   material_id: string
   quantity: number
}
type labourData = {
   labour_id: string,
   numberoflabour: number
}
type specData = {
   specId: string,
   specname: string,
   specUnit: string,
   specDescription: string,
   materialDetails: materialData[],
   labourDetails: labourData[],
   additionalExpensePer: number,
   profitPer: number
}

type rowData = {
   spec_id: string
   spec_name: string,
   unitrate: number,
   quantity: number,
   total: number
}


export const fetchSpec = async (page: number, search: string) => {
   const response = await axioInstance.get("/admin/spec", { params: { page, search } })
   return response.data
}


export const SaveSpec = async (specId: String, specname: String, specUnit: String, specDescription: String, materialDetails: materialData[],
   labourDetails: labourData[], additionalExpensePer: number, profitPer: number) => {

   const additionalExpense_per = additionalExpensePer
   const profit_per = profitPer
   const response = await axioInstance.post("/admin/spec", {
      specId, specname, specUnit, specDescription, materialDetails,
      labourDetails, additionalExpense_per, profit_per
   })
   return response.data
}

export const UpdateSpec = async (_id:String,spec_id: String, spec_name: String, spec_unit: String, description: String, materialDetails: materialData[],
   labourDetails: labourData[], additionalExpense_per: number, profit_per: number) =>{
      const response = await axioInstance.put(`/admin/spec/${_id}`,{
         spec_id,spec_name,spec_unit,description,materialDetails,labourDetails,additionalExpense_per,profit_per
      })
      return response.data
   }

export const fetchSum = async (materialDetails: materialData[], labourDetails: labourData[]) => {
   const response = await axioInstance.get("/admin/fetchSum", { data: { materialDetails, labourDetails } })
   return response.data
}

export const DeleteSpecFunction = async (id: string) => {
   const response = await axioInstance.delete(`/admin/deleteSpec/${id}`);
   return response.data;
};

export const getSpec = async () => {
   const response = await axioInstance.get("/admin/getSpec")
   return response.data
}

export const sumOfMaterialFun = async (materials: { material_id: string, quantity: number }[]) => {
   const response = await axioInstance.get("/admin/getMatsum", { params: { materials: JSON.stringify(materials) } })
   return response.data
}

export const sumOfLabourFun = async (labours: { labour_id: string, numberoflabour: number }[]) => {
   const response = await axioInstance.get("/admin/getLabSum", { params: { labours: JSON.stringify(labours) } })
   return response.data
}

export const EstimationSave = async (projectId: string, row: rowData[]) => {
   const response = await axioInstance.post("/admin/saveEstimation", { projectId, row })
   return response.data
}


