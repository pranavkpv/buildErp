import { useEffect, useState } from "react";
import AddSiteToProject from "./AddSiteToproject";
import DeleteSiteToProject from "./DeleteSiteToproject";
import { listOfsitemanager } from "../../../api/Admin/addSiteToproject";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";




type SiteToProject = {
  _id: string;
  project_name: string;
  sitemanagerDetails: {
    _id: string;
    username: string;
    email: string;
  }[];
};

function ListSiteToProject() {
  const [data, setData] = useState<SiteToProject[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  // Delete data
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [deleteSiteManagerId, setDeleteSiteManagerId] = useState("");
  // Add data
  const [addEnable, setAddEnable] = useState(false);

  const fetchData = async () => {
    const response = await listOfsitemanager(page, search)
    setTotalPage(Math.ceil(response.data.totalPage))
    setData(response.data.data);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [page, search]);



  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search project or site manager
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by project or site manager name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
          </div>
          <ReUsableAddButton
            addFuntion={() => setAddEnable(true)}
            item="Site Assignment"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Site Manager</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No site assignments found.
                  </td>
                </tr>
              ) : (
                data.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-200">{element.project_name}</td>
                    <td className="px-6 py-4 text-gray-200">
                      {element?.sitemanagerDetails[0]?.username || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setDeleteEnable(true);
                          setDeleteProjectId(element._id);
                          setDeleteSiteManagerId(element?.sitemanagerDetails[0]?._id || "");
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete assignment for ${ element.project_name }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>

        <AddSiteToProject addEnable={addEnable} setAddEnable={setAddEnable} onAddSuccess={fetchData} />

        <DeleteSiteToProject deleteEnable={deleteEnable} setDeleteEnable={setDeleteEnable} deleteProjectId={deleteProjectId} deleteSiteManagerId={deleteSiteManagerId}
          onDeleteSuccess={fetchData} />

      </div>
    </div>
  );
}

export default ListSiteToProject;