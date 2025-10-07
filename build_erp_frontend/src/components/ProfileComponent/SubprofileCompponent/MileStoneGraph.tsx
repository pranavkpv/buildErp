import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";
import { fetchUserProjectAPI } from "../../../api/userprofile";
import { getStageInUser } from "../../../api/auth";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Milestone {
  stageName: string;
  completionPercentage: number;
  estimatedTime: number;
  actualTime: number;
}

type ProjectData = {
  _id: string;
  project_name: string;
  address: string;
  area: number;
  description: string;
  expected_image: string;
  budgeted_cost: number;
  status: "pending" | "processing" | "completed";
  estimateBy: string | null;
  estimateStatus: boolean;
  start_date: string;
  end_date: string;
};

type StageData = {
  _id: string;
  stage_name: string;
  start_date: string;
  end_date: string;
  stage_amount: number;
  progress: number;
  paymentStatus: string;
  status_date: string;
  stage_per: number;
};

function MilestoneGraph() {
  const [project, setProject] = useState<ProjectData[]>([]);
  const [stage, setStage] = useState<StageData[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const fetchUserProject = async () => {
    try {
      const response = await fetchUserProjectAPI();
      if (response.success) {
        setProject(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  const fetchStage = async (projectId: string): Promise<void> => {
    try {
      const response = await getStageInUser(projectId);
      if (response.success) {
        setStage(response.data);
        const mileData = response.data.map((stage: StageData, index: number) => {
          const startDate = new Date(response.data[0].start_date);
          const endDate = new Date(stage.end_date);
          const statusDate = new Date(stage.status_date);
          const prevStatusDate = index > 0 ? new Date(response.data[index - 1].status_date) : startDate;

          // Calculate time differences in days
          const estimatedTime = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          const actualTime = Math.round((statusDate.getTime() - prevStatusDate.getTime()) / (1000 * 60 * 60 * 24));

          return {
            stageName: stage.stage_name,
            completionPercentage: stage.stage_per,
            estimatedTime: Math.max(estimatedTime, 0), // Ensure non-negative
            actualTime: Math.max(actualTime, 0), // Ensure non-negative
          };
        });
        setMilestones(mileData);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch stages");
    }
  };

  useEffect(() => {
    fetchUserProject();
  }, []);

  // Chart data
  const data = {
    labels: milestones.map((m) => `${m.stageName} (${m.completionPercentage}%)`),
    datasets: [
      {
        label: "Estimated Time (Days)",
        data: milestones.map((m) => m.estimatedTime),
        borderColor: "rgb(45, 212, 191)", // Teal
        backgroundColor: "rgba(45, 212, 191, 0.2)",
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: "Actual Time (Days)",
        data: milestones.map((m) => m.actualTime),
        borderColor: "rgb(249, 115, 22)", // Orange
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart options aligned with Dashboard's light theme
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const, // Match Dashboard's chart legend
        labels: {
          font: {
            size: 14,
          },
          color: "#374151", // Gray-700 for text
        },
      },
      title: {
        display: true,
        text: "Milestone History: Estimated vs Actual Time",
        font: {
          size: 18,
        },
        color: "#1f2937", // Gray-800 for title
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // White with opacity
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        titleColor: "#1f2937", // Gray-800
        bodyColor: "#1f2937", // Gray-800
        padding: 10,
        borderColor: "#e5e7eb", // Gray-200
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Stage & Completion Percentage",
          color: "#1f2937", // Gray-800
          font: { size: 14 },
        },
        ticks: {
          color: "#4b5563", // Gray-600
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "#e5e7eb", // Gray-200 for grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Time Period (Days)",
          color: "#1f2937", // Gray-800
          font: { size: 14 },
        },
        ticks: {
          color: "#4b5563", // Gray-600
        },
        grid: {
          color: "#e5e7eb", // Gray-200
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Milestone Progress</h2>
      <div className="mb-4">
        <select
          onChange={(e) => fetchStage(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select a project to view milestone progress"
        >
          <option value="">Select Project</option>
          {project.map((element) => (
            <option key={element._id} value={element._id}>
              {element.project_name}
            </option>
          ))}
        </select>
      </div>
      <div className="max-w-3xl mx-auto">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default MilestoneGraph;