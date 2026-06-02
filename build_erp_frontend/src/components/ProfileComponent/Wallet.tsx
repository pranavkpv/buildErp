import { getUserWalletHistoryApi } from "../../api/payment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Wallet as WalletIcon, Search, ChevronLeft, ChevronRight, HardHat } from "lucide-react";

interface wallet {
  date: Date;
  purpose: string;
  paymentStatus: string;
  stage_name: string;
  project_name: string;
  payment_amount: number;
}

function Wallet() {
  const [walletData, setWalletData] = useState<wallet[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchUserWallet = async () => {
    try {
      const response = await getUserWalletHistoryApi(page, search);
      if (response.success) {
        setWalletData(response.data.data);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch wallet history");
    }
  };

  useEffect(() => {
    fetchUserWallet();
  }, [page, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-slate-950 text-slate-100 min-h-screen selection:bg-orange-500 selection:text-white">
      <div className="mb-6">
        
        {/* Header and Filter Control Deck */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <WalletIcon className="w-6 h-6 text-orange-500" />
              Financial Wallet Ledger
            </h1>
            <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">
              Real-time audit tracking of project phase resource billing
            </p>
          </div>

          {/* Ledger Search Anchor */}
          <div className="relative w-full md:w-72 shrink-0">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Filter by project code..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Ledger Table Architecture */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative mb-6">
          {/* Structural Top Accent Banner Edge Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" />

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-center w-20">Index</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Project Assignment</th>
                  <th className="px-6 py-4">Structural Stage</th>
                  <th className="px-6 py-4">Transaction Purpose</th>
                  <th className="px-6 py-4 w-32">Amount</th>
                  <th className="px-6 py-4 w-36 text-center">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {walletData.length > 0 ? (
                  walletData.map((element, index) => {
                    const statusStr = element.paymentStatus.toLowerCase();
                    return (
                      <tr key={index} className="hover:bg-slate-950/50 transition-colors duration-150 group">
                        {/* Index Node */}
                        <td className="px-6 py-4 text-slate-500 font-mono font-bold text-center border-r border-slate-800/40 group-hover:text-slate-400">
                          {((page - 1) * itemsPerPage + index + 1).toString().padStart(3, "0")}
                        </td>
                        
                        {/* Date Component */}
                        <td className="px-6 py-4 text-slate-400 font-mono">
                          {new Date(element.date).toLocaleDateString("en-IN")}
                        </td>
                        
                        {/* Project Designation */}
                        <td className="px-6 py-4 font-sans font-bold text-slate-200 uppercase tracking-wide">
                          {element.project_name}
                        </td>
                        
                        {/* Stage Name Block */}
                        <td className="px-6 py-4 text-slate-300 font-medium">
                          {element.stage_name}
                        </td>
                        
                        {/* Allocation Purpose */}
                        <td className="px-6 py-4 text-slate-400 italic">
                          {element.purpose}
                        </td>
                        
                        {/* Currency Matrix */}
                        <td className="px-6 py-4 font-mono font-black text-white text-sm">
                          ₹{element.payment_amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        
                        {/* Execution Verification Badge */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider border ${
                              statusStr === "success"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : statusStr === "pending"
                                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full ${
                              statusStr === "success" ? "bg-emerald-400" : statusStr === "pending" ? "bg-amber-400" : "bg-rose-400"
                            }`} />
                            {element.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <HardHat className="w-8 h-8 text-slate-700 stroke-[1.5]" />
                        <span className="font-mono font-bold text-xs uppercase tracking-widest text-slate-600">
                          No transaction records found in specified index
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Pagination Dashboard Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-3 px-4 shadow-lg">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-400 hover:text-orange-500 hover:border-slate-700 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-lg transition-all flex items-center gap-1 uppercase tracking-wider"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Index Frame <span className="text-orange-500 font-black">{page}</span> / {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-400 hover:text-orange-500 hover:border-slate-700 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-lg transition-all flex items-center gap-1 uppercase tracking-wider"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Wallet;