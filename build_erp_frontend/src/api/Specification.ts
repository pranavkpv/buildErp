import { toast } from "react-toastify";
import adminAxios from "../axios/adminAxios"
import type { sumOfMaterialInterface } from "ApiInterface/material.interface";
import type { sumofLabourInterface } from "ApiInterface/labour.interface";
import type { editSpecInterface, saveSpecInterface } from "ApiInterface/specApi.interface";
import type { labourData, materialData } from "../components/ADMIN/Specification/SpecList";
import userAxios from "../axios/userAxios";




// ---------------- Get All Specs ---------------- //

export const getSpec = async () => {
   const response = await adminAxios.get("/getSpec");
   return response.data;
};


// ---------------- Material Sum ---------------- //

export const sumOfMaterialFun = async (
   input: sumOfMaterialInterface[]
) => {
   const response = await adminAxios.get("/getMatsum", {
      params: { materials: JSON.stringify(input) }
   });
   return response.data;
};


// ---------------- Labour Sum ---------------- //

export const sumOfLabourFun = async (
   input: sumofLabourInterface[]
) => {
   const response = await adminAxios.get("/getLabSum", {
      params: { labours: JSON.stringify(input) },
   });
   return response.data;
};



// ---------------- Fetch Specs with Pagination & Search ---------------- //

export const fetchSpec = async (page: number, search: string) => {
   const response = await adminAxios.get("/spec", {
      params: { page, search },
   });
   return response.data;
};

// ---------------- Save New Spec ---------------- //

export const SaveSpec = async (
   input: saveSpecInterface
) => {
   const response = await adminAxios.post("/spec", input);
   return response.data;
};

// ---------------- Update Spec ---------------- //

export const UpdateSpec = async (
   input: editSpecInterface
) => {
   const { _id, specId, specname, specUnit, specDescription, materialDetails, labourDetails, additionalExpensePer, profitPer } = input
   const response = await adminAxios.put(`/spec/${ _id }`, {
      specId,
      specname,
      specUnit,
      specDescription,
      materialDetails,
      labourDetails,
      additionalExpensePer,
      profitPer,
   });
   return response.data;
};

// ---------------- Fetch Summary of Material & Labour ---------------- //

export const fetchSum = async (
   materialDetails: materialData[],
   labourDetails: labourData[]
) => {
      const response = await adminAxios.get("/fetchSum", {
         data: { materialDetails, labourDetails },
      });
      return response.data;
};

// ---------------- Delete Spec ---------------- //

export const DeleteSpecFunction = async (id: string) => {
   const response = await adminAxios.patch(`/deleteSpec/${ id }`);
   return response.data;
};


export const getSpecIdandName = async () => {
   const response = await userAxios.get(`/getSpec`)
   return response.data
}


export const getMaterialsBySpecs = async (specIds: string[]) => {
   const response = await userAxios.get('/getmaterialbySpec', { params: { specIds:specIds.join(',') } })
   return response.data
}



