import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Calculator, Users, UserCheck, Package, HardHat, DollarSign, FileText, ChevronDown, ChevronRight, Dot, } from "lucide-react";
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
            { head: "Stage Setting", to: "/admin/stage" },
            { head: "Verify Payment", to: '/admin/verify' }
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
    }
];
function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeSubItem, setActiveSubItem] = useState(null);
    useEffect(() => {
        const currentPath = location.pathname;
        let foundMainIndex = null;
        let foundSubItem = null;
        if (currentPath === "/admin/dashboard") {
            foundMainIndex = 0;
        }
        else {
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
    const toggleSubMenu = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };
    const handleMainItemClick = (index, to) => {
        if (to) {
            navigate(to);
            setActiveIndex(index);
            setActiveSubItem(null);
        }
        else {
            toggleSubMenu(index);
        }
    };
    return (_jsx("div", { className: "w-64 min-h-screen  bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl border-r border-slate-700", children: _jsx("nav", { className: "p-4", children: _jsx("ul", { className: "space-y-2", children: sidebarItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeIndex === index;
                    const hasSubItems = item.subs.length > 0;
                    return (_jsxs("li", { children: [_jsxs("div", { className: `
                    flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${isActive
                                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg scale-105"
                                    : "hover:bg-slate-700/70 text-slate-300 hover:text-white hover:shadow-md"} focus:outline-none focus:ring-2 focus:ring-orange-400/50 relative
                  `, onClick: () => handleMainItemClick(index, item.to), role: "button", tabIndex: 0, onKeyDown: (e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleMainItemClick(index, item.to);
                                    }
                                }, "aria-current": isActive ? "page" : undefined, "aria-label": `Navigate to ${item.title}`, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(IconComponent, { className: `w-5 h-5 transition-colors duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}` }), _jsx("span", { className: "font-medium text-sm tracking-wide", children: item.title })] }), hasSubItems && (_jsx("div", { className: "transition-transform duration-200", children: isActive ? (_jsx(ChevronDown, { className: "w-4 h-4" })) : (_jsx(ChevronRight, { className: "w-4 h-4" })) })), isActive && (_jsx("span", { className: "absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-md" }))] }), isActive && hasSubItems && (_jsx("div", { className: "mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200", children: item.subs.map((sub, subIndex) => (_jsxs(Link, { to: sub.to, className: `
                          flex items-center space-x-3 p-2 pl-4 rounded-md text-sm transition-all duration-150 group
                          ${activeSubItem === sub.to
                                        ? "text-orange-400 bg-slate-700/50 font-semibold"
                                        : "text-slate-300 hover:text-orange-400 hover:bg-slate-700/50"}
                        `, onClick: () => setActiveSubItem(sub.to), "aria-current": activeSubItem === sub.to ? "page" : undefined, children: [_jsx(Dot, { className: `w-4 h-4 ${activeSubItem === sub.to
                                                ? "text-orange-400"
                                                : "text-slate-500 group-hover:text-orange-400"}` }), _jsx("span", { className: "group-hover:translate-x-1 transition-transform duration-150", children: sub.head })] }, subIndex))) }))] }, index));
                }) }) }) }));
}
export default Sidebar;
