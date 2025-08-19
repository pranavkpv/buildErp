import { Folder, MessageSquare, User, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/slice/authslice";
import type { RootState } from "redux/store";
import { UpdateProfileImageAPI } from "../../api/userprofile";


function SidebarUser() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("On choose image file please check the file")
        return
      }
        if(!user){
          toast.error("User Not Exist")
          return 
        }
        const response = await UpdateProfileImageAPI(file)
        if (response.success) {
          toast.success(response.message)
          dispatch(login({
            _id: response.data._id,
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            profile_image: response.data?.profile_image,
            token: localStorage.getItem("accessToken") || "",
          }));
        }else{
           toast.error(response.message)
        }

    }
  };


  const menuItems = [
    { name: "Profile Details", path: "/profile", icon: User },
    { name: "Change Password", path: "/profile/change-password", icon: Lock },
    { name: "Chat", path: "/profile/chat", icon: MessageSquare },
    { name: "Your Project Details", path: "/profile/project", icon: Folder },
  ];


  return (
    <>
      <aside className="w-64 bg-gray-50 rounded-lg shadow-lg p-6 mr-5">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
            {user?.profile_image ? (
              <img src={user?.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
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
            />
            <span className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
              Upload Image
            </span>
          </label>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">User Name</h3>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors ${ location.pathname === item.path ? "bg-blue-50 text-blue-600" : ""
                }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default SidebarUser