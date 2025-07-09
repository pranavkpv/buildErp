import { Folder, MessageSquare, User,Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SidebarUser(){
   const [profileImage, setProfileImage] = useState<string | null>(null);
     const navigate = useNavigate();

   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const menuItems = [
    { name: "Profile Details", path: "/profile/details", icon: User },
    { name: "Change Password", path: "/profile/change-password", icon: Lock },
    { name: "Chat", path: "/profile/chat", icon: MessageSquare },
    { name: "Your Project Details", path: "/profile/project", icon: Folder },
  ];


   return(
      <>
      <aside className="w-64 bg-gray-50 rounded-lg shadow-lg p-6 mr-5">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
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
                className={`w-full flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  location.pathname === item.path ? "bg-blue-50 text-blue-600" : ""
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