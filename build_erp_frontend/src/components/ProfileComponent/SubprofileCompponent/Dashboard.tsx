import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userDashBoardApi } from '../../../api/User/Dashboard';

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

  const [userData, setUserData] = useState<UserData>({projectsCount:0,walletBalance:0,projects:[]})

  const fetchUserDashBoard = async () => {
    const response = await userDashBoardApi()
    console.log(response)
    if (response.success) {
      setUserData(response.data)
    } else {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    fetchUserDashBoard()
  }, [])



  const completionChartData = {
    labels: userData.projects.map((project) => project.name),
    datasets: [
      {
        data: userData.projects.map((project) => project.completion),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };


  const paymentChartData = {
    labels: userData.projects.map((project) => project.name),
    datasets: [
      {
        data: userData.projects.map((project) => project.pendingPayment),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };


  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
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
    <div className="max-w-7xl mx-auto p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome to buildExe Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Projects</h2>
          <p className="text-2xl font-bold text-blue-600">{userData.projectsCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Wallet Balance</h2>
          <p className="text-2xl font-bold text-blue-600">${userData.walletBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Completion Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Completion Status</h2>
          <div className="max-w-xs mx-auto">
            <Doughnut data={completionChartData} options={chartOptions} />
          </div>
        </div>

        {/* Pending Payment Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Payments (Project-Wise)</h2>
          <div className="max-w-xs mx-auto">
            <Doughnut data={paymentChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;