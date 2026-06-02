import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChatRoom from "./ChatRoom";
import { fetchSitemanagerApI } from "../../api/userprofile";
import { MessageSquareCode, Radio, User } from "lucide-react";

interface Data {
  _id: string;
  project_name: string;
  sitemanager_id: string;
  sitemanager_name: string;
  sitemanager_image?: string;
}

function ChatList() {
  const [projectData, setProjectData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchSitemanager = async () => {
    setLoading(true);
    const response = await fetchSitemanagerApI();
    if (response.success) {
      setProjectData(response.data ?? []);
    } else {
      setError(response.message);
      toast.error(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSitemanager();
  }, []);

  const handleChatClick = (sitemanagername: string, sitemanagerId: string) => {
    setSelectedName(sitemanagername);
    setSelectedId(sitemanagerId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 selection:bg-orange-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
        
        {/* Comms Sidebar Console */}
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col h-[calc(100vh-6rem)] shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4 mb-4">
            <Radio className="w-4 h-4 text-orange-500 animate-pulse" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Active Comms Channels
            </h2>
          </div>

          {/* Loading Console Frame */}
          {loading && (
            <div className="flex-1 flex flex-col justify-center items-center gap-3 py-4">
              <div className="animate-spin rounded-full h-7 w-7 border-2 border-slate-800 border-t-orange-500"></div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Synchronizing...</span>
            </div>
          )}

          {/* Error Feed */}
          {error && (
            <div className="flex-1 flex items-center justify-center text-center p-4 border border-rose-950 bg-rose-950/10 rounded-xl">
              <p className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-tight">{error}</p>
            </div>
          )}

          {/* Empty Hub Feed */}
          {!loading && !error && projectData.length === 0 && (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
              <MessageSquareCode className="w-8 h-8 text-slate-700 mb-2" />
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">No links configured</p>
            </div>
          )}

          {/* Interactive Channel Index */}
          {!loading && !error && projectData.length > 0 && (
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              <ul className="space-y-2">
                {projectData.map((element) => {
                  const isSelected = selectedId === element.sitemanager_id;
                  return (
                    <li
                      key={element._id}
                      className={`flex items-center p-3.5 border rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                        isSelected
                          ? 'bg-slate-950 border-orange-500/50 shadow-inner'
                          : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-950 hover:border-slate-700'
                      }`}
                      onClick={() => handleChatClick(element.sitemanager_name, element.sitemanager_id)}
                    >
                      {/* Left Border Indicator Line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 ${
                        isSelected ? 'bg-orange-500' : 'bg-transparent group-hover:bg-slate-700'
                      }`} />

                      {/* Profile Node Media */}
                      <div className="relative shrink-0 mr-3.5">
                        {element.sitemanager_image ? (
                          <img
                            src={element.sitemanager_image}
                            alt={element.sitemanager_name}
                            className="w-11 h-11 rounded-lg object-cover filter brightness-90 border border-slate-800"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                          isSelected ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'
                        }`} />
                      </div>

                      {/* Identity Layout */}
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-sm font-bold tracking-tight uppercase truncate transition-colors ${
                          isSelected ? 'text-orange-400' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {element.sitemanager_name}
                        </h3>
                        <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider truncate mt-0.5">
                          {element.project_name}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* Central Communications Feed Terminal Layout */}
        <main className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[calc(100vh-6rem)] shadow-xl relative overflow-hidden">
          {selectedName && selectedId ? (
            <ChatRoom sitemanagerName={selectedName} sitemanagerId={selectedId} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 z-10">
              <div className="p-4 bg-slate-950 border border-slate-800 text-slate-600 rounded-2xl mb-4">
                <MessageSquareCode className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                Awaiting Channel Selection
              </h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-medium">
                Select a terminal module from the communication manifest index matrix to deploy full link channels.
              </p>
            </div>
          )}
          
          {/* Subtle Structural Console Grid Pattern Effect Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-10 pointer-events-none" />
        </main>
      </div>
    </div>
  );
}

export default ChatList;