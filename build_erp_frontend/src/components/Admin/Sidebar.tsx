import { useState } from "react";
import { 
  BarChart3, 
  Calculator, 
  Users, 
  UserCheck, 
  Package, 
  HardHat, 
  DollarSign, 
  FileText,
  ChevronDown,
  ChevronRight,
  Dot
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    subs: []
  },
  {
    title: "Estimation",
    icon: Calculator,
    subs: [
      {head:"Specification Registration", to:"/admin/spec"}, 
      {head:"Project Estimation", to:"/admin/estimation"}
    ],
  },
  {
    title: "CRM",
    icon: Users,
    subs: [
      {head:"Project Registration", to:"/admin/project"}, 
      {head:"Stage Setting", to:"/admin/stage"}, 
      {head:"Status Updation", to:"/admin/status"}
    ],
  },
  {
    title: "Sitemanager",
    icon: UserCheck,
    subs: [
      {head:"Sitemanager Registration", to:"/admin/sitemanager"},
      {head:"AddSitemanager to project", to:"/admin/addToSite"}
    ],
  },
  {
    title: "Material Management",
    icon: Package,
    subs: [
      {head:"Category Registration", to:"/admin/category"},
      {head:"Unit Registration", to:"/admin/unit"},
      {head:"Brand Registration", to:"/admin/brand"},
      {head:"Material Registration", to:"/admin/material"}
    ],
  },
  {
    title: "Labour Management",
    icon: HardHat,
    subs: [
      {head:"Labour Type Registration", to:"/admin/labour"}
    ],
  },
  {
    title: "Account Head",
    icon: DollarSign,
    subs: [
      {head:"Account Head Registration", to:"/admin/account"}
    ],
  },
  {
    title: "Report",
    icon: FileText,
    subs: [
      {head:"Project Analysis Report", to:"/admin/report"}
    ],
  },
];

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const toggleSubMenu = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const handleDashboardClick = () => {

    console.log("Navigate to dashboard");
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl border-r border-slate-700">
     

      {/* Navigation Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;
            const hasSubItems = item.subs.length > 0;

            return (
              <li key={index}>
                {/* Main Menu Item */}
                <div
                  className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg' 
                      : 'hover:bg-slate-700 text-slate-300 hover:text-white'
                    }
                  `}
                  onClick={() => hasSubItems ? toggleSubMenu(index) : handleDashboardClick()}
                 
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent 
                      className={`w-5 h-5 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`} 
                    />
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  
                  {hasSubItems && (
                    <div className="transition-transform duration-200">
                      {isActive ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </div>
                {isActive && hasSubItems && (
                  <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.subs.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.to}
                        className="flex items-center space-x-3 p-2 pl-4 rounded-md text-sm text-slate-300 hover:text-orange-400 hover:bg-slate-700/50 transition-all duration-150 group"
                      >
                        <Dot className="w-4 h-4 text-slate-500 group-hover:text-orange-400" />
                        <span className="group-hover:translate-x-1 transition-transform duration-150">
                          {sub.head}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>     
    </div>
  );
}

export default Sidebar;