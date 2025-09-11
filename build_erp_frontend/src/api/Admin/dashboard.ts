import { toast } from "react-toastify";
import adminAxios from "../../axios/adminAxios"

//--------------- Admin login --------------- //

export const adminLoginAPI = async (username: string, password: string) => {
  const response = await adminAxios.post("/login",
    {
      username,
      password,
    }, {
    withCredentials: true
  }
  );
  return response.data
}

// --------------- admin logout --------------- //
export const adminLogout = async () => {
  const response = await adminAxios.post(`/logout`, {}, { withCredentials: true })
  return response.data
}
//budget and actual report
export const fetchBudgetAndActual = async (search: string) => {
  const response = await adminAxios.get(`/budgetActual`, { params: { search } })
  return response.data
}
//budget and actual of material
export const fetMaterialAnalysis = async (search: string) => {
  const response = await adminAxios.get(`/budgetActualMaterial`, { params: { search } })
  return response.data
}

export const fetLabourAnalysis = async (search: string) => {
  const response = await adminAxios.get(`/budgetActualLabour`, { params: { search } })
  return response.data
}

