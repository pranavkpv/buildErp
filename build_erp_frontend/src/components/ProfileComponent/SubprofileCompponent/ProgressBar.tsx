import { useEffect, useState } from "react";
import { Calendar, Activity } from "lucide-react";
import { getStageInUser } from "../../../api/auth";

type progressProp = {
  progressEnable: boolean;
  projectId: string;
};

type StageData = {
  _id: string;
  stage_name: string;
  start_date: string;
  end_date: string;
  stage_amount: number;
  progress: number;
  status_date: string;
};

function ProgressBar({ progressEnable, projectId }: progressProp) {
  if (!progressEnable) return null;

  const [stage, setStage] = useState<StageData[]>([]);

  const fetchStage = async (): Promise<void> => {
    const response = await getStageInUser(projectId);
    if (response.success) {
      setStage(response.data);
    }
  };

  const calculateProjectProgress = () => {
    if (stage.length > 0) {
      const totalProgress = stage.reduce((sum, num) => (sum += num.progress), 0) || 0;
      return Math.round((totalProgress / (stage.length * 100)) * 100);
    }
    return 0;
  };

  useEffect(() => {
    fetchStage();
  }, [progressEnable, projectId]);

  const totalOverallProgress = calculateProjectProgress();

  return (
    <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 selection:bg-orange-500 selection:text-white">
      
      {/* Instrumentation Header Node */}
      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-850">
        <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">
            Pipeline Analytics Monitor
          </h4>
          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
            System Operational Lifecycle Tracking
          </p>
        </div>
      </div>

      {/* Primary Metrics Aggregator Track */}
      <div className="bg-slate-950 border border-slate-850/60 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between gap-4 mb-2 font-mono text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider">AGGREGATED INTEGRATION LEVEL</span>
          <span className="text-orange-400 font-black text-sm">{totalOverallProgress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${totalOverallProgress}%` }}
          />
        </div>
      </div>

      {/* Execution Stage Array Deck */}
      <div className="space-y-4">
        {stage.map((element) => {
          // Robust date parsing format mapping sanitization
          const cleanStartDate = element.start_date.split("T")[0].split("-").reverse().join("-");
          const cleanEndDate = element.end_date.split("T")[0].split("-").reverse().join("-");

          return (
            <div 
              key={element._id} 
              className="group bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 rounded-xl p-4 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                
                <div>
                  <p className="text-slate-200 font-mono text-xs font-black uppercase tracking-wide group-hover:text-orange-400 transition-colors">
                    {element.stage_name}
                  </p>
                  <div className="flex items-center text-[10px] font-mono text-slate-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1.5 text-slate-600" />
                    <span className="tracking-wider">SYS_PERIOD: [{cleanStartDate} ➔ {cleanEndDate}]</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[11px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    STAGE_CAP: {element.progress}%
                  </span>
                </div>

              </div>

              {/* Individual Stage Bar Layout Elements */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${element.progress}%` }}
                />
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ProgressBar;