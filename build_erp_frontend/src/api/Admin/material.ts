import adminAxios from "../../axios/adminAxios"
import type { editMaterialInterface, saveMaterialInterface } from "../../ApiInterface/material.interface";




// ---------------- Get Add Material Metadata ---------------- //

export const getaddMaterial = async () => {
  const response = await adminAxios.get(`/addmaterial`);
  return response.data;
};

// ---------------- Save New Material ---------------- //

export const SaveMaterialApi = async (
  input: saveMaterialInterface
) => {
  const response = await adminAxios.post("/material",
    input
  );
  return response.data;
};

// ---------------- Delete Material ---------------- //

export const deleteMaterial = async (_id: string) => {
  const response = await adminAxios.patch(`/material/${ _id }`);
  return response.data;
};

// ---------------- Get Material List (with Pagination + Search) ---------------- //

export const materialList = async (page: number, search: string) => {
    const response = await adminAxios.get(`/material`, {
      params: { page, search },
    });
    return response.data;
};

// ---------------- Fetch Data for Editing a Material ---------------- //

export const editMaterialData = async (_id: string) => {
  const response = await adminAxios.get(`/editmaterial/${ _id }`);
  return response.data;
};

// ---------------- Fetch Unique Materials ---------------- //

export const fetchUniqueMaterial = async () => {
    const response = await adminAxios.get(`/fetchMaterial`);
    return response.data;
};

// ---------------- Fetch Units Based on Material ---------------- //

export const fetchUnitCorrespondingMaterial = async (material: string) => {
    const response = await adminAxios.get(`/fetMatbyUnit/${ material }`);
    return response.data;
};

// ---------------- Fetch Brands Based on Material ---------------- //

export const fetchBrandCorrespondingMaterial = async (material: string) => {
    const response = await adminAxios.get(`/fetchMatbyBrand/${ material }`);
    return response.data;
};

// ---------------- Fetch Unit Rate ---------------- //

export const fetchUnitRate = async (
  selectedMaterial: string,
  selectedUnit: string,
  selectedBrand: string
) => {
    const response = await adminAxios.get('/unitRate', {
      params: {
        material_name: selectedMaterial,
        brand_name: selectedBrand,
        unit_name: selectedUnit,
      },
    });
    return response.data;
};

// ---------------- Find Material by ID ---------------- //

export const findMaterialById = async (_id: string) => {
    const response = await adminAxios.get(`/getmaterial/${ _id }`);
    return response.data;
};

// ---------------- Update the material api  ---------------- //

export const UpdateMaterialAPI = async (
  input: editMaterialInterface
) => {
  const { _id, material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
  const response = await adminAxios.put(`/material/${ _id }`, { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock });
  return response.data;
}
