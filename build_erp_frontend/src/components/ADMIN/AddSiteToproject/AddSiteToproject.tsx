import { getSitemanageridandname } from "../../../api/sitemanager";
import { postSitemanagerToProject } from "../../../api/Admin/addSiteToproject";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProjectidandname } from "../../../api/project";
import Loading from "../../../components/Loading";

type SiteManagerData = {
  _id: string;
  username: string;
};

type ProjectData = {
  _id: string;
  project_name: string;
};

type AddPropData = {
  addEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onAddSuccess: () => void;
};

function AddSiteToProject({ addEnable, setAddEnable, onAddSuccess }: AddPropData) {
  const [siteManager, setSiteManager] = useState<SiteManagerData[]>([]);
  const [projectList, setProjectList] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [selectedSiteManager, setSelectedSiteManager] = useState("");
  const [siteManagerError, setSiteManagerError] = useState("");
  const [projectError, setProjectError] = useState("");
  const [loadOn, setLoadOn] = useState(false)

  // Fetch site managers on component mount
  useEffect(() => {
    const fetchSiteManager = async () => {
      const data = await getSitemanageridandname()
      setSiteManager(data.data);
    };
    fetchSiteManager();
  }, []);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectidandname()
      setProjectList(data.data);
    };
    fetchProjects();
  }, []);

  // Handle saving site to project
  const saveAddSite = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (!selectedSiteManager) {
      setSiteManagerError("Please select a site manager.");
      return;
    }
    if (selectedProject.length === 0) {
      setProjectError("Please select at least one project.");
      return;
    }
    setSiteManagerError("");
    setProjectError("");
    try {
      setLoadOn(true)
      const siteManager_id = selectedSiteManager
      const selectedproject = selectedProject
      const data = await postSitemanagerToProject(siteManager_id, selectedproject)
      if (data.success) {
        setLoadOn(false)
        toast.success(data.message || "Site assignment added successfully");
        onAddSuccess();
        setAddEnable(false);
        setSelectedSiteManager("");
        setSelectedProject([]);
        setSiteManager([])
        setProjectList([])
      } else {
        setLoadOn(false)
        toast.error(data.message || "Failed to add site assignment");
      }
    } catch (error) {
      setLoadOn(false)
    }
  };

  if (!addEnable) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-site-title"
        aria-describedby="add-site-description"
      >
        <form
          onSubmit={saveAddSite}
          className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6 border border-gray-700/50 transform transition-all duration-300 scale-100"
        >
          <h2
            id="add-site-title"
            className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4"
          >
            Add Site Assignment
          </h2>

          <div>
            <label htmlFor="siteManager" className="block text-sm font-medium text-gray-200 mb-1">
              Site Manager
            </label>
            <select
              id="siteManager"
              value={selectedSiteManager}
              onChange={(e) => setSelectedSiteManager(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 text-sm"
              aria-describedby="site-manager-error"
              autoFocus
            >
              <option value="">Select Site Manager</option>
              {siteManager.map((element) => (
                <option key={element._id} value={element._id}>
                  {element.username}
                </option>
              ))}
            </select>
            {siteManagerError && (
              <p id="site-manager-error" className="text-red-400 text-sm mt-1">
                {siteManagerError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Projects
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {projectList.map((element) => (
                <div key={element._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`project-${ element._id }`}
                    checked={selectedProject.includes(element._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProject([...selectedProject, element._id]);
                      } else {
                        setSelectedProject(selectedProject.filter((id) => id !== element._id));
                      }
                    }}
                    value={element._id}
                    className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-600 rounded"
                  />
                  <label
                    htmlFor={`project-${ element._id }`}
                    className="text-gray-200 text-sm"
                  >
                    {element.project_name}
                  </label>
                </div>
              ))}
            </div>
            {projectError && (
              <p id="project-error" className="text-red-400 text-sm mt-1">
                {projectError}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setAddEnable(false);
                setSelectedSiteManager("");
                setSelectedProject([]);
                setSiteManagerError("");
                setProjectError("");
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold text-sm"
              aria-label="Cancel adding site assignment"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
              aria-label="Add site assignment"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Loading loadOn={loadOn} />
    </>
  );
}

export default AddSiteToProject;