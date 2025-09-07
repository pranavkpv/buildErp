import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slice/authslice";
import { userLogout } from "../../../api/userprofile";

type logoutProp = {
  logoutEnable: boolean;
  setLogoutEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

function LogoutModal({ logoutEnable, setLogoutEnable }: logoutProp) {
  if (!logoutEnable) return null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFun = async () => {
    try {
      const data = await userLogout();
      if (data.success) {
        localStorage.removeItem("accessToken");
        toast.success(data.message);
        dispatch(logout());
        setLogoutEnable(false);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
      <div
        className="relative bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-sm mx-4 border border-gray-200 transform transition-transform duration-300 scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
      >
        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-10 rounded-lg blur-md"></div>

        <h2 id="logout-modal-title" className="text-xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Confirm Logout
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setLogoutEnable(false)}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Cancel logout"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={logoutFun}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Confirm logout"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;