import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

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
      const response = await axioInstance.get("/admin/spec", {
         params: { page, search },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
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
   try {
      const response = await axioInstance.post("/admin/spec", {
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
      toast.error(error.message);
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
      const response = await axioInstance.put(`/admin/spec/${_id}`, {
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
      toast.error(error.message);
   }
};

// ---------------- Fetch Summary of Material & Labour ---------------- //

export const fetchSum = async (
   materialDetails: materialData[],
   labourDetails: labourData[]
) => {
   try {
      const response = await axioInstance.get("/admin/fetchSum", {
         data: { materialDetails, labourDetails },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Delete Spec ---------------- //

export const DeleteSpecFunction = async (id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/deleteSpec/${id}`);
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Get All Specs ---------------- //

export const getSpec = async () => {
   try {
      const response = await axioInstance.get("/admin/getSpec");
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Material Sum ---------------- //

export const sumOfMaterialFun = async (
   materials: { material_id: string; quantity: number }[]
) => {
   try {
      const response = await axioInstance.get("/admin/getMatsum", {
         params: { materials: JSON.stringify(materials) },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Labour Sum ---------------- //

export const sumOfLabourFun = async (
   labours: { labour_id: string; numberoflabour: number }[]
) => {
   try {
      const response = await axioInstance.get("/admin/getLabSum", {
         params: { labours: JSON.stringify(labours) },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Save Estimation ---------------- //

export const EstimationSave = async (projectId: string, row: rowData[]) => {
   try {
      const response = await axioInstance.post("/admin/saveEstimation", {
         projectId,
         row,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};
