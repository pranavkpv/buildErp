import { toast } from "react-toastify";
import axioInstance from "../axio";

type addRowData = {
  project: string;
  stock: number;
};

// ---------------- Get Add Material Metadata ---------------- //

export const getaddMaterial = async () => {
  try {
    const response = await axioInstance.get(`/admin/addmaterial`);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
};

// ---------------- Save New Material ---------------- //

export const SaveMaterialApi = async (
  material_name: string,
  category_id: string,
  brand_id: string,
  unit_id: string,
  unit_rate: number,
  stock: number,
  projectWiseStock: addRowData[]
) => {
  try {
    const response = await axioInstance.post("/admin/material", {
      material_name,
      category_id,
      brand_id,
      unit_id,
      unit_rate,
      stock,
      projectWiseStock,
    });
    return response.data;
  } catch (error: any) {
   toast.error(error.response.data.message)
  }
};

// ---------------- Delete Material ---------------- //

export const deleteMaterial = async (_id: string) => {
  try {
    const response = await axioInstance.delete(`/admin/material/${_id}`);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
};

// ---------------- Get Material List (with Pagination + Search) ---------------- //

export const materialList = async (page: number, search: string) => {
  try {
    const response = await axioInstance.get(`/admin/material`, {
      params: { page, search },
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
};

// ---------------- Fetch Data for Editing a Material ---------------- //

export const editMaterialData = async (_id: string) => {
  try {
    const response = await axioInstance.get(`/admin/editmaterial/${_id}`);
    return response.data;
  } catch (error: any) {
   toast.error(error.response.data.message)
  }
};

// ---------------- Fetch Unique Materials ---------------- //

export const fetchUniqueMaterial = async () => {
  try {
    const response = await axioInstance.get(`/admin/fetchMaterial`);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
};

// ---------------- Fetch Units Based on Material ---------------- //

export const fetchUnitCorrespondingMaterial = async (material: string) => {
  try {
    const response = await axioInstance.get(`/admin/fetMatbyUnit/${material}`);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
};

// ---------------- Fetch Brands Based on Material ---------------- //

export const fetchBrandCorrespondingMaterial = async (material: string) => {
  try {
    const response = await axioInstance.get(`/admin/fetchMatbyBrand/${material}`);
    return response.data;
  } catch (error: any) {
   toast.error(error.response.data.message)
  }
};

// ---------------- Fetch Unit Rate ---------------- //

export const fetchUnitRate = async (
  selectedMaterial: string,
  selectedUnit: string,
  selectedBrand: string
) => {
  try {
    const response = await axioInstance.get('/admin/unitRate', {
      params: {
        material_name: selectedMaterial,
        brand_name: selectedBrand,
        unit_name: selectedUnit,
      },
    });
    return response.data;
  } catch (error: any) {
  toast.error(error.response.data.message)
  }
};

// ---------------- Find Material by ID ---------------- //

export const findMaterialById = async (_id: string) => {
  try {
    const response = await axioInstance.get(`/admin/getmaterial/${_id}`);
    return response.data;
  } catch (error: any) {
   toast.error(error.response.data.message)
  }
};

// ---------------- Update the material api  ---------------- //

export const UpdateMaterialAPI = async(_id:string,material_name:string,category_id:string,brand_id:string,unit_id:string,unit_rate:number,stock:number,projectWiseStock:addRowData[])=>{
   try {
    const response = await axioInstance.put(`/admin/material/${_id}`,{material_name,category_id,brand_id,unit_id,unit_rate,stock,projectWiseStock});
    return response.data;
  } catch (error: any) {
   toast.error(error.response.data.message)
  }
}
