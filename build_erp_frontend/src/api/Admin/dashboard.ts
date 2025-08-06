import { toast } from "react-toastify";
import axioInstance from "../axio"

//--------------- Admin login --------------- //

export const adminLoginAPI = async (username: string, password: string) => {
  try {
    const response = await axioInstance.post("/admin/login",
      {
        username,
        password,
      }, {
      withCredentials: true
    }
    );
    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
}

// --------------- admin logout --------------- //
export const adminLogout = async () => {
  try {
    const response = await axioInstance.post(`/admin/logout`, {}, { withCredentials: true })
    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
}

export const fetchBudgetAndActual = async (search:string,page:number) => {
  try {

    const response = await axioInstance.get(`/admin/budgetActual`,{params:{search,page}})
    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
}