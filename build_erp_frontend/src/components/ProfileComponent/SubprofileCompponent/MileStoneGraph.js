import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import { toast } from "react-toastify";
import { fetchUserProjectAPI } from "../../../api/userprofile";
import { getStageInUser } from "../../../api/auth";
import { Sliders } from "lucide-react";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function MilestoneGraph() {
    const [project, setProject] = useState([]);
    const [stage, setStage] = useState([]);
    const [milestones, setMilestones] = useState([]);
    const fetchUserProject = async () => {
        try {
            const response = await fetchUserProjectAPI();
            if (response.success) {
                setProject(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch projects");
        }
    };
    const fetchStage = async (projectId) => {
        if (!projectId) {
            setMilestones([]);
            setStage([]);
            return;
        }
        try {
            const response = await getStageInUser(projectId);
            if (response.success) {
                setStage(response.data);
                const mileData = response.data.map((stage, index) => {
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
                        estimatedTime: Math.max(estimatedTime, 0),
                        actualTime: Math.max(actualTime, 0),
                    };
                });
                setMilestones(mileData);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch stages");
        }
    };
    useEffect(() => {
        fetchUserProject();
    }, []);
    const data = {
        labels: milestones.map((m) => `${m.stageName} (${m.completionPercentage}%)`),
        datasets: [
            {
                label: "Estimated Schedule Timeline (Days)",
                data: milestones.map((m) => m.estimatedTime),
                borderColor: "#2dd4bf",
                backgroundColor: "rgba(44, 212, 191, 0.05)",
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "#2dd4bf",
                pointBorderColor: "#0f172a",
                pointBorderWidth: 2,
                pointHoverRadius: 6,
            },
            {
                label: "Actual Execution Lifecycle (Days)",
                data: milestones.map((m) => m.actualTime),
                borderColor: "#f97316",
                backgroundColor: "rgba(249, 115, 22, 0.05)",
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "#f97316",
                pointBorderColor: "#0f172a",
                pointBorderWidth: 2,
                pointHoverRadius: 6,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 12,
                    padding: 20,
                    color: "#94a3b8",
                    font: {
                        family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        size: 11,
                        weight: "bold",
                    },
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderWidth: 1,
                titleColor: "#ffffff",
                titleFont: {
                    family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    size: 12,
                    weight: "bold",
                },
                bodyColor: "#94a3b8",
                bodyFont: {
                    family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    size: 11,
                },
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "DEPLOYMENT PHASES (COMPLETION REFERENCE %)",
                    color: "#64748b",
                    font: {
                        family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        size: 10,
                        weight: "bold",
                    },
                },
                ticks: {
                    color: "#94a3b8",
                    font: {
                        family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        size: 10,
                    },
                    maxRotation: 45,
                    minRotation: 45,
                },
                grid: {
                    color: "#334155",
                    alpha: 0.2,
                },
            },
            y: {
                title: {
                    display: true,
                    text: "QUANTIFIED DURATION PERIOD (DAYS)",
                    color: "#64748b",
                    font: {
                        family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        size: 10,
                        weight: "bold",
                    },
                },
                ticks: {
                    color: "#94a3b8",
                    font: {
                        family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        size: 10,
                    },
                },
                grid: {
                    color: "#334155",
                    alpha: 0.2,
                },
            },
        },
    };
    return (_jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-6 selection:bg-orange-500 selection:text-white", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-850", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Sliders, { className: "w-4 h-4 text-orange-500" }), _jsx("h3", { className: "text-xs font-mono font-black text-slate-400 uppercase tracking-widest", children: "Pipeline Analytics Controller" })] }), _jsx("div", { children: _jsxs("select", { onChange: (e) => fetchStage(e.target.value), className: "w-full sm:w-72 px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-300 text-xs font-mono font-bold uppercase tracking-wider focus:outline-none focus:border-orange-500/50 cursor-pointer transition-colors", "aria-label": "Select a project to view milestone progress", children: [_jsx("option", { value: "", children: "[ SELECT ACTIVE DEPLOYMENT ]" }), project.map((element) => (_jsx("option", { value: element._id, className: "bg-slate-950 text-slate-300", children: element.project_name.toUpperCase() }, element._id)))] }) })] }), _jsx("div", { className: "w-full max-w-4xl mx-auto py-2", children: milestones.length > 0 ? (_jsx("div", { className: "relative", children: _jsx(Line, { data: data, options: options }) })) : (_jsx("div", { className: "border border-dashed border-slate-800 rounded-xl p-12 text-center", children: _jsx("p", { className: "font-mono text-xs font-bold text-slate-600 uppercase tracking-widest", children: "No Data Streams Active. Select Project Node To Render System Milestone Graph." }) })) })] }));
}
export default MilestoneGraph;
