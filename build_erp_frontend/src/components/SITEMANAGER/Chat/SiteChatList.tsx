import { fetchProjectBySitemanager } from "../../../api/Sitemanager/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SiteChatRoom from "./SiteChatRoom";

interface Data {
  _id: string;
  project_name: string;
  user_id: string;
  username: string;
  user_image?: string;
}

function SiteChatList() {
  const [projectData, setProjectData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchSitemanager = async () => {
    setLoading(true);
    const response = await fetchProjectBySitemanager();
    if (response.success) {
      setProjectData(response.data ?? []);
      setError(null);
    } else {
      setError(response.message);
      toast.error(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSitemanager();
  }, []);

  const handleChatClick = (username: string, userId: string) => {
    setSelectedName(username);
    setSelectedId(userId);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6">
        <aside className="w-full sm:w-1/4 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-semibold text-gray-100 mb-6">Chat List</h2>
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400"></div>
            </div>
          )}
          {error && (
            <div className="text-center py-4 text-red-400 text-sm">
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && projectData.length === 0 && (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm">No chats available</p>
            </div>
          )}
          {!loading && !error && projectData.length > 0 && (
            <ul className="space-y-3">
              {projectData.map((element) => (
                <li
                  key={element._id}
                  className={`flex items-center bg-gray-800/50 rounded-lg border border-gray-700/50 ${ selectedName === element.username ? "bg-gray-700/50 border-teal-500" : ""
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => handleChatClick(element.username, element.user_id)}
                    aria-label={`Open chat with ${ element.username }`}
                    className="flex items-center w-full p-4 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200 rounded-lg"
                  >
                    <img
                      src={element.user_image}
                      alt={`User avatar for ${ element.username }`}
                      className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-600"
                    />
                    <div className="text-left">
                      <h3 className="text-base font-semibold text-gray-100">
                        {element.username}
                      </h3>
                      <p className="text-sm text-gray-400">{element.project_name}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

          )}
        </aside>
        <main className="flex-1 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700/50">
          {selectedName && selectedId ? (
            <SiteChatRoom username={selectedName} userId={selectedId} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-base text-gray-400">Select a chat from the sidebar to start messaging</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SiteChatList;