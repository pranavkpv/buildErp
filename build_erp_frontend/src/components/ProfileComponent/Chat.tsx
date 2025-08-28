import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChatRoom from "./ChatRoom";
import { fetchSitemanagerApI } from "../../api/userprofile";

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
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchSitemanager = async () => {
    setLoading(true);
    const response = await fetchSitemanagerApI();
    console.log(response)
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
    setSelectedId(sitemanagerId)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white rounded-xl shadow-lg p-6 mr-6">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">Chat List</h2>
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          )}
          {error && (
            <div className="text-center py-4 text-red-500">
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && projectData.length === 0 && (
            <div className="text-center py-4">
              <p className="text-slate-500">No chats available</p>
            </div>
          )}
          {!loading && !error && projectData.length > 0 && (
            <ul className="space-y-4">
              {projectData.map((element) => (
                <li
                  key={element._id}
                  className={`flex items-center p-4 bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors duration-300 ${ selectedName === element.sitemanager_name ? 'bg-slate-200' : '' }`}
                  onClick={() => handleChatClick(element.sitemanager_name, element.sitemanager_id)}
                >
                  <img
                    src={element.sitemanager_image || "https://via.placeholder.com/50"}
                    alt={element.sitemanager_name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-teal-600">
                      {element.sitemanager_name}
                    </h3>
                    <p className="text-sm text-slate-500">{element.project_name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-xl shadow-lg p-6">
          {selectedName ? (
            <ChatRoom sitemanagerName={selectedName} sitemanagerId={selectedId} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-slate-500">Select a chat from the sidebar to start messaging</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ChatList;