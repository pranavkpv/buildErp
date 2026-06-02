import { getUserTransferDataAPI } from "../../api/Sitemanager/transfer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TransferAction from "./SubprofileCompponent/TransferAction";
import { ArrowRight, FileSpreadsheet, Box, RefreshCw } from "lucide-react";

type MaterialData = {
  sl: number;
  material_id: string;
  material_name: string;
  brand_name: string;
  unit_name: string;
  quantity: number;
  unit_rate: number;
};

export type Transfer = {
  _id: string;
  from_project_id: string;
  fromproject_name: string;
  to_project_id: string;
  toproject_name: string;
  transfer_id: string;
  description: string;
  date: string;
  materialDetails: MaterialData[];
  finalAmount: number;
};

function Transfer() {
  const [transferData, setTransferData] = useState<Transfer[]>([]);
  const [actionEnable, setActionEnable] = useState(false);
  const [actionData, setActionData] = useState<Transfer | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransferData = async () => {
    setIsLoading(true);
    try {
      const response = await getUserTransferDataAPI();
      if (response.success) {
        setTransferData(response.data);
      } else {
        toast.error(response.message || "Error occurred while fetching transfer data");
      }
    } catch (error) {
      toast.error("Failed to fetch transfer data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransferData();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    const [date] = dateString.split("T");
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Component Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-orange-500" />
              Transfer Request Manifest
            </h1>
            <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">
              Active Material Transit Configuration Registry Logs
            </p>
          </div>

          <button
            onClick={fetchTransferData}
            disabled={isLoading}
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-500 disabled:text-slate-650 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 hover:bg-slate-950"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-orange-500" : ""}`} />
            Refresh Registry
          </button>
        </div>

        {/* Data Manifest Table Frame */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative">
          
          {/* Structural Top Accent Banner Edge Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" />

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left font-sans border-collapse">
              
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 text-center w-20">Index Node</th>
                  <th className="px-5 py-4">Timestamp</th>
                  <th className="px-5 py-4">Logistics Route Allocation (From / To)</th>
                  <th className="px-5 py-4">Transfer Manifest ID</th>
                  <th className="px-5 py-4 w-36">Net Valuation</th>
                  <th className="px-5 py-4 w-40 text-center">Operational Audit</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {transferData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Box className="w-8 h-8 text-slate-700 stroke-[1.5]" />
                        <span className="font-mono font-bold text-xs uppercase tracking-widest text-slate-600">
                          No Active Transfer Assets Found in Node Registry
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transferData.map((element, index) => (
                    <tr
                      key={element._id}
                      className="hover:bg-slate-950/50 transition-colors duration-150 group"
                    >
                      {/* Index Column */}
                      <td className="px-5 py-4 text-slate-500 font-mono font-bold text-center border-r border-slate-800/40 group-hover:text-slate-400">
                        {(index + 1).toString().padStart(3, "0")}
                      </td>

                      {/* Date Column */}
                      <td className="px-5 py-4 text-slate-300 font-mono font-medium">
                        {formatDate(element.date)}
                      </td>

                      {/* Origin and Target Destinations Column */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3 max-w-md">
                          <span className="font-sans font-bold text-slate-200 uppercase tracking-wide truncate bg-slate-950 px-2.5 py-1 rounded-md border border-slate-850">
                            {element.fromproject_name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="font-sans font-bold text-slate-200 uppercase tracking-wide truncate bg-slate-950/40 px-2.5 py-1 rounded-md border border-slate-800/60">
                            {element.toproject_name}
                          </span>
                        </div>
                      </td>

                      {/* Transfer Identity String Column */}
                      <td className="px-5 py-4">
                        <span className="font-mono font-bold text-orange-400/90 tracking-wider uppercase bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10">
                          {element.transfer_id}
                        </span>
                      </td>

                      {/* Net Amount Currency Format Column */}
                      <td className="px-5 py-4 font-mono font-black text-white text-sm">
                        ₹{element.finalAmount.toLocaleString("en-IN")}
                      </td>

                      {/* Action Interface Triggers Column */}
                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-orange-500 hover:text-white hover:bg-orange-500 hover:border-orange-600 rounded-lg text-xs font-mono font-bold uppercase tracking-wider focus:outline-none transition-all duration-150 shadow-md"
                          aria-label={`View configurations for asset manifest record ${element.transfer_id}`}
                          onClick={() => {
                            setActionData(element);
                            setActionEnable(true);
                          }}
                        >
                          Verify Action
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Action Overlay Trigger Overlay Wrapper */}
        <TransferAction
          actionData={actionData}
          actionEnable={actionEnable}
          onActionSuccess={fetchTransferData}
          setActionEnable={setActionEnable}
        />
      </div>
    </div>
  );
}

export default Transfer;