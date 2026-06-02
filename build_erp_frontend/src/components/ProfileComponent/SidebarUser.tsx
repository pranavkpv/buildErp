import { MessageSquare, User, Lock, Wallet, LayoutDashboard, FolderKanban, Repeat, Camera, Hammer } from "lucide-react";
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
    { name: "Dashboard", path: "/profile/dashboard", icon: LayoutDashboard },
    { name: "Profile Details", path: "/profile", icon: User },
    { name: "Change Password", path: "/profile/change-password", icon: Lock },
    { name: "Chat", path: "/profile/chat", icon: MessageSquare },
    { name: "Your Projects", path: "/profile/project", icon: FolderKanban },
    { name: "Transfer Requests", path: "/profile/transfer", icon: Repeat },
    { name: "Wallet History", path: "/profile/wallet", icon: Wallet },
  ];

  // Safeguard path resolution matching for custom element focus styling
  const currentPath = window.location.pathname;

  return (
    <aside className="w-64 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden select-none shrink-0 h-fit">
      
      {/* Visual Identity Structural Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" />

      {/* Profile Media Segment Node */}
      <div className="relative flex flex-col items-center mb-6 pt-2 pb-4 border-b border-slate-800/80">
        
        {/* Profile Avatar Frame Container */}
        <div className="relative w-24 h-24 rounded-xl bg-slate-950 border border-slate-800 p-1 mb-3 group shadow-inner">
          {user?.profile_image ? (
            <img
              src={user?.profile_image}
              alt="System operator identification node"
              className="w-full h-full object-cover rounded-lg filter brightness-90 group-hover:brightness-75 transition-all duration-200"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-slate-900 border border-slate-800/60 flex items-center justify-center text-slate-600 text-[10px] font-mono font-bold uppercase tracking-wider text-center p-1">
              No Media
            </div>
          )}

          {/* Industrial Overlay Media Trigger Label Pin */}
          <label className="absolute inset-1 rounded-lg bg-slate-950/80 border border-orange-500/30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer backdrop-blur-[1px]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              aria-label="Upload profile image node payload"
            />
            <Camera className="w-4 h-4 text-orange-500 mb-0.5" />
            <span className="text-[9px] font-mono font-black text-slate-200 uppercase tracking-wider">
              Update
            </span>
          </label>
        </div>

        {/* Identity Nomenclature Meta Field */}
        <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider text-center max-w-full truncate px-2">
          {user?.username || "Identity Operator"}
        </h3>
        
        <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800/60">
          <Hammer className="w-3 h-3 text-orange-500/60" />
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            NODE_OPERATOR
          </span>
        </div>
      </div>

      {/* Navigation Parameter Menu Index */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-3 py-2.5 rounded-xl border font-mono transition-all duration-150 group focus:outline-none ${
                isActive
                  ? "bg-slate-950 border-slate-800 text-orange-500 shadow-md font-bold"
                  : "bg-transparent border-transparent text-slate-400 hover:bg-slate-950/40 hover:border-slate-850 hover:text-slate-200"
              }`}
              aria-label={`Navigate to ${item.name}`}
            >
              {/* Structural Indicator Bar on Active State */}
              <div 
                className={`absolute left-0 w-1 rounded-r-md transition-all duration-200 ${
                  isActive ? "h-5 bg-orange-500" : "h-0 bg-transparent"
                }`} 
              />

              <item.icon className={`w-4 h-4 mr-3 shrink-0 transition-colors ${
                isActive ? "text-orange-500" : "text-slate-500 group-hover:text-slate-400"
              }`} />
              
              <span className="text-xs uppercase tracking-wider text-left flex-1">
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default SidebarUser;