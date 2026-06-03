import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userDashBoardApi } from '../../../api/User/Dashboard';
import MilestoneGraph from './MileStoneGraph';
import { LayoutDashboard, Wallet, HardHat, Link2, PieChart, Activity } from 'lucide-react';
// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
    const [userData, setUserData] = useState({ projectsCount: 0, walletBalance: 0, projects: [] });
    const fetchUserDashBoard = async () => {
        const response = await userDashBoardApi();
        if (response.success) {
            setUserData(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        fetchUserDashBoard();
    }, []);
    // Industrial color array mapping
    const industrialColors = ['#f97316', '#38bdf8', '#fbbf24', '#a855f7', '#64748b'];
    const completionChartData = {
        labels: userData.projects.map((project) => project.name),
        datasets: [
            {
                data: userData.projects.map((project) => project.completion),
                backgroundColor: industrialColors,
                borderColor: '#0f172a',
                borderWidth: 2,
                hoverBackgroundColor: industrialColors,
            },
        ],
    };
    const paymentChartData = {
        labels: userData.projects.map((project) => project.name),
        datasets: [
            {
                data: userData.projects.map((project) => project.pendingPayment),
                backgroundColor: industrialColors,
                borderColor: '#0f172a',
                borderWidth: 2,
                hoverBackgroundColor: industrialColors,
            },
        ],
    };
    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    font: {
                        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        size: 11,
                        weight: 'bold'
                    },
                    boxWidth: 12,
                    padding: 15,
                },
            },
        },
        maintainAspectRatio: true,
    };
    const quickLinks = [
        { name: 'Submit Transfer Request', path: '/profile/transfer' },
        { name: 'View Wallet History', path: '/profile/wallet' },
        { name: 'Change Password', path: '/profile/change-password' },
        { name: 'Profile Update', path: '/profile' },
        { name: 'Project Details', path: '/profile/project' },
        { name: 'Chat', path: '/profile/chat' },
    ];
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-4 sm:p-6 bg-slate-950 min-h-screen text-slate-300 selection:bg-orange-500 selection:text-white", children: [_jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between border border-slate-800 bg-slate-900 rounded-2xl p-6 mb-6 gap-4 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 bottom-0 w-1 bg-orange-500" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 hidden sm:block", children: _jsx(LayoutDashboard, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-black text-white uppercase tracking-wider", children: "buildExe Systems Operations" }), _jsx("p", { className: "text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "Control Tower Matrix Dashboard" })] })] }), _jsxs("div", { className: "bg-slate-950 px-4 py-2 border border-slate-850 rounded-xl font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center md:text-right", children: ["Status: ", _jsx("span", { className: "text-emerald-500 animate-pulse", children: "\u25CF System Core Online" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-6 relative group overflow-hidden", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h2", { className: "text-xs font-mono font-black text-slate-500 uppercase tracking-widest", children: "Active Operations" }), _jsx(HardHat, { className: "w-4 h-4 text-orange-500" })] }), _jsx("p", { className: "text-3xl font-black font-mono text-white tracking-tight", children: userData.projectsCount }), _jsx("div", { className: "text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-2 pt-2 border-t border-slate-850", children: "Registered Project Deployments" })] }), _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-6 relative group overflow-hidden", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h2", { className: "text-xs font-mono font-black text-slate-500 uppercase tracking-widest", children: "Available Ledger Balance" }), _jsx(Wallet, { className: "w-4 h-4 text-emerald-500" })] }), _jsxs("p", { className: "text-3xl font-black font-mono text-emerald-400 tracking-tight", children: ["$", userData.walletBalance.toFixed(2)] }), _jsx("div", { className: "text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-2 pt-2 border-t border-slate-850", children: "Secured Vault Token Reserve" })] })] }), _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4 pb-3 border-b border-slate-850", children: [_jsx(Link2, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "text-xs font-mono font-black text-slate-400 uppercase tracking-widest", children: "Interface Macro Dispatches" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2", children: quickLinks.map((link) => (_jsxs(Link, { to: link.path, className: "bg-slate-950 border border-slate-850 text-slate-300 hover:text-white hover:border-orange-500 text-left py-2.5 px-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all", children: ["\u00BB ", link.name] }, link.name))) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6 pb-3 border-b border-slate-850", children: [_jsx(PieChart, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "text-xs font-mono font-black text-slate-400 uppercase tracking-widest", children: "Project Completion Profiles" })] }), _jsx("div", { className: "max-w-[240px] sm:max-w-[260px] mx-auto py-2", children: _jsx(Doughnut, { data: completionChartData, options: chartOptions }) })] }), _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6 pb-3 border-b border-slate-850", children: [_jsx(PieChart, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "text-xs font-mono font-black text-slate-400 uppercase tracking-widest", children: "Pending Liability Matrices" })] }), _jsx("div", { className: "max-w-[240px] sm:max-w-[260px] mx-auto py-2", children: _jsx(Doughnut, { data: paymentChartData, options: chartOptions }) })] })] }), _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4 pb-3 border-b border-slate-850", children: [_jsx(Activity, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "text-xs font-mono font-black text-slate-400 uppercase tracking-widest", children: "Chronological Infrastructure Milestones" })] }), _jsx("div", { className: "w-full", children: _jsx(MilestoneGraph, {}) })] })] }));
};
export default Dashboard;
