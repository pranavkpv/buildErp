import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Dot,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    to: "/admin/dashboard",
    subs: [],
  },
  {
    title: "Banner",
    icon: BarChart3,
    to: "/admin/banner",
    subs: [],
  },
  {
    title: "Estimation",
    icon: Calculator,
    subs: [
      { head: "Specification Registration", to: "/admin/spec" },
      { head: "Project Estimation", to: "/admin/estimation" },
    ],
  },
  {
    title: "CRM",
    icon: Users,
    subs: [
      { head: "Project Registration", to: "/admin/project" },
      { head: "Stage Setting", to: "/admin/stage" }
    ],
  },
  {
    title: "Sitemanager",
    icon: UserCheck,
    subs: [
      { head: "Sitemanager Registration", to: "/admin/sitemanager" },
      { head: "AddSitemanager to project", to: "/admin/addToSite" }, 
    ],
  },
  {
    title: "Material Management",
    icon: Package,
    subs: [
      { head: "Category Registration", to: "/admin/category" },
      { head: "Unit Registration", to: "/admin/unit" },
      { head: "Brand Registration", to: "/admin/brand" },
      { head: "Material Registration", to: "/admin/material" },
    ],
  },
  {
    title: "Labour Management",
    icon: HardHat,
    subs: [
      { head: "Labour Type Registration", to: "/admin/labour" },
    ],
  },
  {
    title: "Account Head",
    icon: DollarSign,
    subs: [
      { head: "Account Head Registration", to: "/admin/account" },
    ],
  },
  {
    title: "Report",
    icon: FileText,
    subs: [
      { head: "Project Analysis Report", to: "/admin/report" },
    ],
  },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  // Initialize active menu and sub-menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    let foundMainIndex: number | null = null;
    let foundSubItem: string | null = null;

    // Check if the current path matches the Dashboard
    if (currentPath === "/admin/dashboard") {
      foundMainIndex = 0; // Dashboard is at index 0
    } else {
      // Find matching main menu and sub-menu
      sidebarItems.forEach((item, index) => {
        if (item.subs.length > 0) {
          const subMatch = item.subs.find((sub) => sub.to === currentPath);
          if (subMatch) {
            foundMainIndex = index;
            foundSubItem = subMatch.to;
          }
        }
      });
    }

    setActiveIndex(foundMainIndex);
    setActiveSubItem(foundSubItem);
  }, [location.pathname]);

  const toggleSubMenu = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleMainItemClick = (index: number, to?: string) => {
    if (to) {
      navigate(to);
      setActiveIndex(index);
      setActiveSubItem(null);
    } else {
      toggleSubMenu(index);
    }
  };

  return (
    <div className="w-64 min-h-screen  bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl border-r border-slate-700">
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
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg scale-105"
                      : "hover:bg-slate-700/70 text-slate-300 hover:text-white hover:shadow-md"
                    } focus:outline-none focus:ring-2 focus:ring-orange-400/50 relative
                  `}
                  onClick={() => handleMainItemClick(index, item.to)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleMainItemClick(index, item.to);
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${item.title}`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                      }`}
                    />
                    <span className="font-medium text-sm tracking-wide">{item.title}</span>
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
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-md" />
                  )}
                </div>

                {/* Sub Menu Items */}
                {isActive && hasSubItems && (
                  <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.subs.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.to}
                        className={`
                          flex items-center space-x-3 p-2 pl-4 rounded-md text-sm transition-all duration-150 group
                          ${
                            activeSubItem === sub.to
                              ? "text-orange-400 bg-slate-700/50 font-semibold"
                              : "text-slate-300 hover:text-orange-400 hover:bg-slate-700/50"
                          }
                        `}
                        onClick={() => setActiveSubItem(sub.to)}
                        aria-current={activeSubItem === sub.to ? "page" : undefined}
                      >
                        <Dot
                          className={`w-4 h-4 ${
                            activeSubItem === sub.to
                              ? "text-orange-400"
                              : "text-slate-500 group-hover:text-orange-400"
                          }`}
                        />
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