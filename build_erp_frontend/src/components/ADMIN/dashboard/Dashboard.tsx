import { useEffect, useState } from "react";
import BudgetVsActual from "./SubComponents/BudgetVsActualReport";
import CostComparisonGraph from "./SubComponents/CostComparisonGraph";
import { toast } from "react-toastify";
import { fetchBudgetAndActual, fetLabourAnalysis, fetMaterialAnalysis } from "../../../api/Admin/dashboard";
import MaterialLabourAnalysis from "./SubComponents/MaterialAnalysisReport";

type reportData = {
  project_name: string;
  budgeted_cost: number;
  actual_expense: number;
};

function Dashboard() {
  const [data, setData] = useState<reportData[]>([]);
  const [total, setTotal] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  //-------material analysis data --------//
  const [materialData, setMaterialData] = useState<reportData[]>([])
  const [materialPage, setMaterialPage] = useState(0)

  //-------Labour analysis data --------//
  const [labourData, setLabourData] = useState<reportData[]>([])
  const [labourPage, setLabourPage] = useState(0)

  const fetchBugetAndActualData = async () => {
    const response = await fetchBudgetAndActual(search);
    if (response.success) {
      setData(response.data);
      let list = []
      for (let i = 0; i < response.totalPage; i++) {
        list.push(0)
      }
      setTotal(list)
    } else {
      toast.error(response.message);
    }
  };

  const fetchMaterialAnalysisData = async () => {
    const response = await fetMaterialAnalysis(search)
    if (response.success) {
      setMaterialData(response.data)
    } else {
      toast.error(response.message);
    }
  }

  const fetchLabourAnalysisData = async () => {
    const response = await fetLabourAnalysis(search)
    console.log(response)
    if (response.success) {
      setLabourData(response.data)
    } else {
      toast.error(response.message);
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchBugetAndActualData();
      fetchMaterialAnalysisData();
      fetchLabourAnalysisData();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="flex">
        <main className="flex-1 p-6 lg:pl-0">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">
              Admin Dashboard
            </h1>
            <div className="space-y-8">
              <BudgetVsActual data={data.slice(page * 5, page * 5 + 5)}
                total={total} setPage={setPage} search={search} setSearch={setSearch}
                page={page} />
              <CostComparisonGraph data={data} heading={"Budgeted Vs Actual Cost Comparison"} />
              <MaterialLabourAnalysis Data={materialData.slice(materialPage * 5, materialPage * 5 + 5)}
                total={total} setMaterialPage={setMaterialPage} materialPage={materialPage} heading={"Material Analysis"}
              />
              <CostComparisonGraph data={materialData} heading={"Material-Cost Analysis"} />

              <MaterialLabourAnalysis Data={labourData.slice(labourPage * 5, labourPage * 5 + 5)}
                total={total} setMaterialPage={setLabourPage} materialPage={labourPage} heading={"Labour Analysis"}
              />
              <CostComparisonGraph data={labourData} heading={"Labour-Cost Analysis"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;