import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Calculator, 
  Users, 
  UserCheck, 
  Package, 
  HardHat,  
  FileText,
  Lock,
  type LucideIcon
} from "lucide-react";

// Define the type for sidebar items
interface SidebarItem {
  title: string;
  icon: LucideIcon;
  to: string;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: BarChart3,
    to: "/site/dashboard"
  },
  {
    title: "Change Password",
    icon: Lock,
    to: "/site/changepass"
  },
  {
    title: "Profile Updation",
    icon: Lock,
    to: "/site/changepass"
  },
  {
    title: "Stage Updation",
    icon: Calculator,
    to: "/site/stage-updation"
  },
  {
    title: "Purchase",
    icon: Package,
    to: "/site/purchase"
  },
  {
    title: "Transfer",
    icon: Users,
    to: "/site/transfer"
  },
  {
    title: "Receive",
    icon: UserCheck,
    to: "/site/receive"
  },
  {
    title: "Attendance",
    icon: HardHat,
    to: "/site/attendance"
  },
  {
    title: "Chat",
    icon: FileText,
    to: "/site/chat"
  }
];

const SiteSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    const currentIndex = sidebarItems.findIndex(item => item.to === location.pathname);
    return currentIndex !== -1 ? currentIndex : null;
  });

  useEffect(() => {
    const currentIndex = sidebarItems.findIndex(item => item.to === location.pathname);
    setActiveIndex(currentIndex !== -1 ? currentIndex : null);
  }, [location.pathname]);

  const handleItemClick = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl border-r border-slate-700 flex flex-col">
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;

            return (
              <li key={index}>
                <div
                  onClick={() => handleItemClick(index, item.to)}
                  className={`
                    flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg scale-105' 
                      : 'hover:bg-slate-700/70 text-slate-300 hover:text-white hover:shadow-md'
                    } focus:outline-none focus:ring-2 focus:ring-orange-400/50 relative
                  `}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleItemClick(index, item.to);
                    }
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.title}`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent 
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`} 
                    />
                    <span className="font-medium text-sm tracking-wide">{item.title}</span>
                  </div>
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-md" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SiteSidebar;