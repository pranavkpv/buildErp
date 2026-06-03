import siteAxios from "../../axios/SitemanagerAxioInterceptor";
// ---------------- Fetch all purchase data ---------------- //
export const getPurchaseDataAPI = async (search, page) => {
    const response = await siteAxios.get("/purchase", { params: { search, page } });
    return response.data;
};
export const savePurchaseAPI = async (project_id, invoice_number, date, description, materialDetails) => {
    const response = await siteAxios.post("/purchase", { project_id, invoice_number, date, description, materialDetails });
    return response.data;
};
export const updatePurchaseAPI = async (_id, project_id, invoice_number, date, description, materialDetails) => {
    const response = await siteAxios.put(`/purchase/${_id}`, { project_id, invoice_number, date, description, materialDetails });
    return response.data;
};
export const deletePurchaseAPI = async (_id) => {
    const response = await siteAxios.delete(`/purchase/${_id}`);
    return response.data;
};
export const ApprovePurchaseAPI = async (_id, data) => {
    const response = await siteAxios.patch(`/purchase/${_id}`, { data });
    return response.data;
};
export const fetchUniqueMaterialInSiteManager = async () => {
    const response = await siteAxios.get(`/fetchMaterial`);
    return response.data;
};
export const fetchBrandCorrespondingMaterialInSitemanager = async (material) => {
    const response = await siteAxios.get(`/fetchMatbyBrand/${material}`);
    return response.data;
};
export const fetchUnitCorrespondingMaterialInsitemanager = async (material) => {
    const response = await siteAxios.get(`/fetMatbyUnit/${material}`);
    return response.data;
};
export const fetchUnitRateInSitemanager = async (selectedMaterial, selectedUnit, selectedBrand) => {
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
    const response = await siteAxios.get('/lastInvoice');
    return response.data;
};
