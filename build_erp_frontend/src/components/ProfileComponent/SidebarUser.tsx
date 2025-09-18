import { Folder, MessageSquare, User, Lock, CarFront } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/slice/authslice";
import type { RootState } from "redux/store";
import { UpdateProfileImageAPI } from "../../api/userprofile";

function SidebarUser() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, or WebP)");
        return;
      }
      if (!user) {
        toast.error("User not found");
        return;
      }
      const response = await UpdateProfileImageAPI(file);
      if (response.success) {
        toast.success(response.message);
        dispatch(
          login({
            _id: response.data.userData._id,
            username: response.data.userData.username,
            email: response.data.userData.email,
            phone: response.data.userData.phone,
            profile_image: response.data.userData.profile_image,
            token: localStorage.getItem("accessToken") || "",
          })
        );
      } else {
        toast.error(response.message);
      }
    }
  };

  const menuItems = [
    { name: "Profile Details", path: "/profile", icon: User },
    { name: "Change Password", path: "/profile/change-password", icon: Lock },
    { name: "Chat", path: "/profile/chat", icon: MessageSquare },
    { name: "Your Projects", path: "/profile/project", icon: Folder },
    { name: "Transfer Requests", path: "/profile/transfer", icon: CarFront },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-5 mr-5 border border-gray-200">
      <div className="relative flex flex-col items-center mb-6">
        {/* Decorative Gradient Border for Profile Image */}
        <div className="absolute w-24 h-24 rounded-full -z-10 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-10 blur-md"></div>
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-3 border border-gray-200">
          {user?.profile_image ? (
            <img
              src={user?.profile_image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            aria-label="Upload profile image"
          />
          <span className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-200">
            Upload Image
          </span>
        </label>
        <h3 className="mt-2 text-base font-semibold text-gray-900">
          {user?.username || "User Name"}
        </h3>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 ${
              location.pathname === item.path ? "bg-blue-50 text-blue-600" : ""
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
            aria-label={`Navigate to ${item.name}`}
          >
            <item.icon className="w-4 h-4 mr-2" />
            <span className="text-sm">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default SidebarUser;