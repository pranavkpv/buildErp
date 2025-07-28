import { useDispatch } from "react-redux";
import { userLogout } from "../../../api/User/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slice/authslice";

type logoutProp = {
  logoutEnable: boolean;
  setLogoutEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

function LogoutModal({ logoutEnable, setLogoutEnable }: logoutProp) {
  if (!logoutEnable) return null;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutFun = async () => {
      const data = await userLogout();
      if (data.success) {
        localStorage.removeItem("accessToken");
        toast.success(data.message);
        dispatch(logout())
        setLogoutEnable(false);
        navigate("/")
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-transform duration-300 scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
      >
        <h2 id="logout-modal-title" className="text-lg font-semibold text-gray-900 mb-4">
          Confirm Logout
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setLogoutEnable(false)}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            Cancel
          </button>
          <button
            onClick={logoutFun}
            className="px-4 py-2 text-white bg-[#04a09c] hover:bg-[#04a09c] rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;