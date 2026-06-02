import { getStageInUser } from "../../../api/auth";
import { X, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type imageProp = {
  imageEnable: boolean;
  setImageEnable: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
};

type stageData = {
  date: string;
  image: string;
};

function ProjectImage({ imageEnable, setImageEnable, projectId }: imageProp) {
  const [stage, setStage] = useState<stageData[]>([]);
  const [count, setCount] = useState(0);

  const fetchStage = async (): Promise<void> => {
    try {
      const response = await getStageInUser(projectId);
      if (response.success) {
        let x: stageData[] = [];
        for (let element of response.data) {
          if (!element.stage_image) continue;
          for (let item of element.stage_image) {
            if (!item.image) continue;
            for (let char of item.image) {
              x.push({ date: item.date, image: char });
            }
          }
        }
        setStage(x);
        setCount(0); // Reset index on project switch
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch project image feeds");
      console.error(error);
    }
  };

  useEffect(() => {
    if (imageEnable) {
      fetchStage();
    }
  }, [projectId, imageEnable]);

  if (!imageEnable) return null;

  const currentLog = stage[count];
  const totalLogs = stage.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300">
        
        {/* Structural Orange Ribbon Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-10" />

        {/* Exit Window Button Anchor */}
        <button
          title="Close Feed"
          onClick={() => setImageEnable(false)}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors z-10 p-1.5 hover:bg-slate-950/60 rounded-xl border border-transparent hover:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Panel Header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-850">
            <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Telemetry Media Viewer
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                On-Site Blueprint Progress Capture
              </p>
            </div>
          </div>

          {/* Conditional Media Canvas Frame */}
          {totalLogs > 0 ? (
            <div className="flex flex-col gap-4">
              
              {/* Active Timestamp Readout */}
              <div className="bg-slate-950/60 border border-slate-850 rounded-xl py-2 px-4 text-center">
                <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">
                  LOG_TIMESTAMP: <span className="text-orange-400">{currentLog?.date?.split('T')[0] || "RAW_DATA"}</span>
                </span>
              </div>

              {/* Core Image Terminal Window */}
              <div className="relative w-full h-[26rem] sm:h-[32rem] bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex items-center justify-center group/canvas">
                {/* Structural Crosshair Background Lines to simulate technical viewfinders */}
                <div className="absolute inset-0 border border-slate-900/40 pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
                
                <img
                  src={currentLog?.image}
                  alt="Site progression data frame"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover/canvas:scale-[1.02]"
                  loading="eager"
                />
              </div>

              {/* Controls and Index Telemetry Block */}
              <div className="flex items-center justify-between gap-4 mt-2 bg-slate-950 p-2.5 border border-slate-850 rounded-xl">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  disabled={count === 0}
                  className="flex-1 max-w-[140px] flex items-center justify-center gap-1 px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-slate-900/50 disabled:bg-slate-900/20 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev Node
                </button>

                <div className="font-mono text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-900 px-4 py-2 rounded-lg border border-slate-850">
                  FRAME: <span className="text-orange-500">{(count + 1).toString().padStart(2, '0')}</span> / {totalLogs.toString().padStart(2, '0')}
                </div>

                <button
                  onClick={() => setCount((prev) => Math.min(prev + 1, totalLogs - 1))}
                  disabled={count === totalLogs - 1}
                  className="flex-1 max-w-[140px] flex items-center justify-center gap-1 px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-slate-900/50 disabled:bg-slate-900/20 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed"
                >
                  Next Node <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* System Empty Fallback Canvas */
            <div className="border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/40">
              <p className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                CRITICAL: No image feeds attached to this construction node.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProjectImage;