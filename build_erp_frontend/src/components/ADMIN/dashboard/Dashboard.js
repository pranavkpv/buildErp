import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import BudgetVsActual from "./SubComponents/BudgetVsActualReport";
import CostComparisonGraph from "./SubComponents/CostComparisonGraph";
import { toast } from "react-toastify";
import { fetchBudgetAndActual, fetLabourAnalysis, fetMaterialAnalysis, } from "../../../api/Admin/dashboard";
import MaterialLabourAnalysis from "./SubComponents/MaterialAnalysisReport";
import CountProject from "./SubComponents/CountProject";
import Loading from "../../../components/Loading";
function Dashboard() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    //-------material analysis data --------//
    const [materialData, setMaterialData] = useState([]);
    const [materialPage, setMaterialPage] = useState(0);
    //-------Labour analysis data --------//
    const [labourData, setLabourData] = useState([]);
    const [labourPage, setLabourPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const fetchBugetAndActualData = async () => {
        const response = await fetchBudgetAndActual(search);
        if (response.success) {
            setData(response.data.data);
            let list = [];
            for (let i = 0; i < response.data.totalPage; i++) {
                list.push(0);
            }
            setTotal(list);
        }
        else {
            toast.error(response.message);
        }
    };
    const fetchMaterialAnalysisData = async () => {
        const response = await fetMaterialAnalysis(search);
        if (response.success) {
            setMaterialData(response.data.data);
        }
        else {
            toast.error(response.message);
        }
    };
    const fetchLabourAnalysisData = async () => {
        const response = await fetLabourAnalysis(search);
        if (response.success) {
            setLabourData(response.data.data);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            const fetchAllData = async () => {
                setLoading(true);
                await Promise.all([
                    fetchBugetAndActualData(),
                    fetchMaterialAnalysisData(),
                    fetchLabourAnalysisData(),
                ]);
                setLoading(false);
            };
            fetchAllData();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [search]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800", children: _jsx(Loading, {}) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white", children: _jsx("div", { className: "flex", children: _jsx("main", { className: "flex-1 p-6 lg:pl-0", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-8 tracking-tight", children: "Admin Dashboard" }), _jsxs("div", { className: "space-y-8", children: [_jsx(CountProject, {}), _jsx(BudgetVsActual, { data: data.slice(page * 5, page * 5 + 5), total: total, setPage: setPage, search: search, setSearch: setSearch, page: page }), _jsx(CostComparisonGraph, { data: data, heading: "Budgeted Vs Actual Cost Comparison" }), _jsx(MaterialLabourAnalysis, { Data: materialData.slice(materialPage * 5, materialPage * 5 + 5), total: total, setMaterialPage: setMaterialPage, materialPage: materialPage, heading: "Material Analysis" }), _jsx(CostComparisonGraph, { data: materialData, heading: "Material-Cost Analysis" }), _jsx(MaterialLabourAnalysis, { Data: labourData.slice(labourPage * 5, labourPage * 5 + 5), total: total, setMaterialPage: setLabourPage, materialPage: labourPage, heading: "Labour Analysis" }), _jsx(CostComparisonGraph, { data: labourData, heading: "Labour-Cost Analysis" })] })] }) }) }) }));
}
export default Dashboard;
