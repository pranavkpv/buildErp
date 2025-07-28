import { toast } from "react-toastify";
import axioInstance from "../../api/axio"

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