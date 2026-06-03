import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
function CostComparisonGraph({ data, heading }) {
    return (_jsxs("div", { className: "w-full max-w-7xl mx-auto p-6 bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-lg border border-slate-700/50", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6 pb-3 tracking-tight", children: heading }), _jsx("div", { className: "w-full h-[300px] md:h-[400px] lg:h-[500px]", children: _jsx(ResponsiveContainer, { children: _jsxs(BarChart, { data: data, margin: { top: 20, right: 30, left: 20, bottom: 10 }, children: [_jsx(CartesianGrid, { stroke: "#334155", strokeDasharray: "3 3", strokeOpacity: 0.3 }), _jsx(XAxis, { dataKey: "project_name", stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: { stroke: "#475569" }, tick: { fill: "#94a3b8" }, interval: "preserveStartEnd", tickFormatter: (value) => value.substring(0, 15) + (value.length > 15 ? "..." : "") }), _jsx(YAxis, { stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: { stroke: "#475569" }, tick: { fill: "#94a3b8" }, tickFormatter: (value) => `₹${(value / 1000).toFixed(0)}k` }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                    borderRadius: "8px",
                                    color: "#f1f5f9",
                                    padding: "10px",
                                }, formatter: (value) => [`₹${value.toLocaleString()}`, undefined], labelStyle: { color: "#f1f5f9", fontWeight: "bold" } }), _jsx(Legend, { wrapperStyle: {
                                    paddingTop: "20px",
                                    color: "#f1f5f9",
                                    fontSize: "14px",
                                } }), _jsx(Bar, { dataKey: "budgeted_cost", fill: "#f97316", name: "Budgeted Cost", radius: [4, 4, 0, 0], barSize: 35 }), _jsx(Bar, { dataKey: "actual_expense", fill: "#22d3ee", name: "Actual Expense", radius: [4, 4, 0, 0], barSize: 35 })] }) }) })] }));
}
export default CostComparisonGraph;
