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

// Define TypeScript interface for user and project data
interface Project {
  id: string;
  name: string;
  completion: number;
  pendingPayment: number;
}

interface UserData {
  projectsCount: number;
  walletBalance: number;
  projects: Project[];
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ projectsCount: 0, walletBalance: 0, projects: [] });

  const fetchUserDashBoard = async () => {
    const response = await userDashBoardApi();
    if (response.success) {
      setUserData(response.data);
    } else {
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
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8',
          font: {
            family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            size: 11,
            weight: 'bold' as const
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

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-slate-950 min-h-screen text-slate-300 selection:bg-orange-500 selection:text-white">
      
      {/* Top Banner App Header */}
      <div className="flex flex-col md:flex-row items-center justify-between border border-slate-800 bg-slate-900 rounded-2xl p-6 mb-6 gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-orange-500" />
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 hidden sm:block">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-wider">buildExe Systems Operations</h1>
            <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">Control Tower Matrix Dashboard</p>
          </div>
        </div>
        <div className="bg-slate-950 px-4 py-2 border border-slate-850 rounded-xl font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center md:text-right">
          Status: <span className="text-emerald-500 animate-pulse">● System Core Online</span>
        </div>
      </div>

      {/* Overview Cards Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative group overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xs font-mono font-black text-slate-500 uppercase tracking-widest">Active Operations</h2>
            <HardHat className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-3xl font-black font-mono text-white tracking-tight">{userData.projectsCount}</p>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-2 pt-2 border-t border-slate-850">Registered Project Deployments</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative group overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xs font-mono font-black text-slate-500 uppercase tracking-widest">Available Ledger Balance</h2>
            <Wallet className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black font-mono text-emerald-400 tracking-tight">${userData.walletBalance.toFixed(2)}</p>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-2 pt-2 border-t border-slate-850">Secured Vault Token Reserve</div>
        </div>
      </div>

      {/* Quick Access Bus Links */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-850">
          <Link2 className="w-4 h-4 text-orange-500" />
          <h2 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">Interface Macro Dispatches</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="bg-slate-950 border border-slate-850 text-slate-300 hover:text-white hover:border-orange-500 text-left py-2.5 px-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              » {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Analytics Visualization Matrices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Completion Gauge Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-850">
            <PieChart className="w-4 h-4 text-orange-500" />
            <h2 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">Project Completion Profiles</h2>
          </div>
          <div className="max-w-[240px] sm:max-w-[260px] mx-auto py-2">
            <Doughnut data={completionChartData} options={chartOptions} />
          </div>
        </div>

        {/* Pending Ledger Remittance Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-850">
            <PieChart className="w-4 h-4 text-orange-500" />
            <h2 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">Pending Liability Matrices</h2>
          </div>
          <div className="max-w-[240px] sm:max-w-[260px] mx-auto py-2">
            <Doughnut data={paymentChartData} options={chartOptions} />
          </div>
        </div>

      </div>

      {/* Milestone Sub-Graph Container Grid Node */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-850">
          <Activity className="w-4 h-4 text-orange-500" />
          <h2 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">Chronological Infrastructure Milestones</h2>
        </div>
        <div className="w-full">
          <MilestoneGraph />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;