import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"

type materialData = {
   material_id: string;
   quantity: number;
};

type labourData = {
   labour_id: string;
   numberoflabour: number;
};

type specData = {
   specId: string;
   specname: string;
   specUnit: string;
   specDescription: string;
   materialDetails: materialData[];
   labourDetails: labourData[];
   additionalExpensePer: number;
   profitPer: number;
};

type rowData = {
   spec_id: string;
   spec_name: string;
   unitrate: number;
   quantity: number;
   total: number;
};

// ---------------- Fetch Specs with Pagination & Search ---------------- //

export const fetchSpec = async (page: number, search: string) => {
   try {
      const response = await adminAxios.get("/spec", {
         params: { page, search },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Save New Spec ---------------- //

export const SaveSpec = async (
   specId: string,
   specname: string,
   specUnit: string,
   specDescription: string,
   materialDetails: materialData[],
   labourDetails: labourData[],
   additionalExpensePer: number,
   profitPer: number
) => {
   console.log(additionalExpensePer)
   try {
      const response = await adminAxios.post("/spec", {
         specId,
         specname,
         specUnit,
         specDescription,
         materialDetails,
         labourDetails,
         additionalExpense_per: additionalExpensePer,
         profit_per: profitPer,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Update Spec ---------------- //

export const UpdateSpec = async (
   _id: string,
   specId: string,
   specname: string,
   specUnit: string,
   specDescription: string,
   materialDetails: materialData[],
   labourDetails: labourData[],
   additionalExpense_per: number,
   profit_per: number
) => {
   try {
      const response = await adminAxios.put(`/spec/${_id}`, {
         specId,
         specname,
         specUnit,
         specDescription,
         materialDetails,
         labourDetails,
         additionalExpense_per,
         profit_per,
      });
      return response.data;
   } catch (error: any) {
     toast.error(error.response.data.message)
   }
};

// ---------------- Fetch Summary of Material & Labour ---------------- //

export const fetchSum = async (
   materialDetails: materialData[],
   labourDetails: labourData[]
) => {
   try {
      const response = await adminAxios.get("/fetchSum", {
         data: { materialDetails, labourDetails },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Delete Spec ---------------- //

export const DeleteSpecFunction = async (id: string) => {
   try {
      const response = await adminAxios.delete(`/deleteSpec/${id}`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Get All Specs ---------------- //

export const getSpec = async () => {
   try {
      const response = await adminAxios.get("/getSpec");
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Material Sum ---------------- //

export const sumOfMaterialFun = async (
   materials: { material_id: string; quantity: number }[]
) => {
   try {
      const response = await adminAxios.get("/getMatsum", {
         params: { materials: JSON.stringify(materials) },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Labour Sum ---------------- //

export const sumOfLabourFun = async (
   labours: { labour_id: string; numberoflabour: number }[]
) => {
   try {
      const response = await adminAxios.get("/getLabSum", {
         params: { labours: JSON.stringify(labours) },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Save Estimation ---------------- //

export const EstimationSave = async (projectId: string, row: rowData[]) => {
   try {
      const response = await adminAxios.post("/saveEstimation", {
         projectId,
         row,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
