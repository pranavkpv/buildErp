import type { Purchase } from "../../components/SITEMANAGER/purchase/ApprovePurchase";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"


type materialData = {
      material_id: string;
      quantity: number;
      unit_rate: number;
};

// ---------------- Fetch all purchase data ---------------- //

export const getPurchaseDataAPI = async (search: string, page: number) => {
      const response = await siteAxios.get("/purchase", { params: { search, page } })
      return response.data
}

export const savePurchaseAPI = async (project_id: string, invoice_number: number, date: string, description: string, materialDetails: materialData[]) => {
      const response = await siteAxios.post("/purchase", { project_id, invoice_number, date, description, materialDetails })
      return response.data
}


export const updatePurchaseAPI = async (_id: string, project_id: string, invoice_number: number, date: string, description: string, materialDetails: materialData[]) => {
      const response = await siteAxios.put(`/purchase/${ _id }`, { project_id, invoice_number, date, description, materialDetails })
      return response.data
}

export const deletePurchaseAPI = async (_id: string) => {
      const response = await siteAxios.delete(`/purchase/${ _id }`)
      return response.data
}

export const ApprovePurchaseAPI = async (_id: string, data: Purchase) => {
      const response = await siteAxios.patch(`/purchase/${ _id }`, { data })
      return response.data
}

export const fetchUniqueMaterialInSiteManager = async () => {
      const response = await siteAxios.get(`/fetchMaterial`);
      return response.data;
};


export const fetchBrandCorrespondingMaterialInSitemanager = async (material: string) => {
      const response = await siteAxios.get(`/fetchMatbyBrand/${ material }`);
      return response.data;
};

export const fetchUnitCorrespondingMaterialInsitemanager = async (material: string) => {
      const response = await siteAxios.get(`/fetMatbyUnit/${ material }`);
      return response.data;
};


export const fetchUnitRateInSitemanager = async (
      selectedMaterial: string,
      selectedUnit: string,
      selectedBrand: string
) => {
      const response = await siteAxios.get('/unitRate', {
            params: {
                  material_name: selectedMaterial,
                  brand_name: selectedBrand,
                  unit_name: selectedUnit,
            },
      });
      return response.data;
};

export const fetchLastInvoiceApi = async () => {
      const response = await siteAxios.get('/lastInvoice')
      return response.data
}
